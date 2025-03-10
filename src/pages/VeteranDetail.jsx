import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../DataContext';

export default function VeteranDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { veterans } = useContext(DataContext);

  // Find the matching veteran
  const veteran = veterans.find(v => v.id === parseInt(id));
  if (!veteran) {
    return (
      <div>
        <h2>Veteran Not Found</h2>
        <Link to="/">Back to Dashboard</Link>
      </div>
    );
  }

  // Navigation helpers
  const handleAddIssue = () => {
    navigate(`/veteran/${veteran.id}/issue/new`);
  };
  const handleAddTimelineEntry = () => {
    navigate(`/veteran/${veteran.id}/timeline/new`);
  };
  const handleViewHistory = (issueId) => {
    navigate(`/veteran/${veteran.id}/issue/${issueId}/history`);
  };

  /**
   * Scans the timeline to find the newest percent_change for a given issueId
   */
  function getLatestPercentChange(issueId) {
    let latest = null;

    for (const entry of veteran.timeline) {
      for (const iss of entry.issues) {
        // Must have percent_change AND match this issueId
        if (iss.issue_id === issueId && iss.percent_change) {
          const found = {
            entry_date: entry.entry_date,
            percent_change: iss.percent_change
          };
          if (!latest) {
            latest = found;
          } else {
            // Compare by date, keep the newest
            if (new Date(found.entry_date) > new Date(latest.entry_date)) {
              latest = found;
            }
          }
        }
      }
    }

    return latest ? latest.percent_change : null;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Veteran Detail</h2>
      <p><strong>Name:</strong> {veteran.full_name}</p>
      <p><strong>DOB:</strong> {veteran.dob}</p>
      <Link to="/">Back to Dashboard</Link>

      {/* Issues Section */}
      <h3 style={{ marginTop: '2rem' }}>Issues</h3>
      <button onClick={handleAddIssue}>Add New Issue</button>
      <ul>
        {veteran.issues.map(issue => {
          // Grab the newest percent_change from timeline
          const rating = getLatestPercentChange(issue.id);

          return (
            <li key={issue.id} style={{ marginTop: '1rem' }}>
              <strong>{issue.issue_name}</strong>
              {rating
                ? ` - Current Rating: ${rating}%`
                : ' - No rating assigned'}
              <button
                style={{ marginLeft: '1rem' }}
                onClick={() => handleViewHistory(issue.id)}
              >
                View History
              </button>
            </li>
          );
        })}
      </ul>

      {/* Timeline Section */}
      <h3 style={{ marginTop: '2rem' }}>Procedural Timeline</h3>
      <button onClick={handleAddTimelineEntry}>Add New Timeline Entry</button>
      {veteran.timeline.map((entry, idx) => (
        <div
          key={idx}
          style={{ marginTop: '1rem', paddingLeft: '1rem', borderLeft: '3px solid #ccc' }}
        >
          <strong>{entry.entry_date} - {entry.type}</strong>
          <ul>
            {entry.issues.map((iss, i) => {
              const foundIssue = veteran.issues.find(obj => obj.id === iss.issue_id);
              const name = foundIssue ? foundIssue.issue_name : 'Unknown';

              return (
                <li key={i} style={{ marginBottom: '0.5rem' }}>
                  <strong>{name}</strong> ({iss.what_happened})
                  {iss.date_of_event && (
                    <div>Effective date: {iss.date_of_event}</div>
                  )}
                  {iss.percent_change && (
                    <div>Rating: {iss.percent_change}%</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
