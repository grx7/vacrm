import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../DataContext';

export default function VeteranDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { veterans } = useContext(DataContext);

  // Find the matching veteran
  const veteran = veterans.find((v) => v.id === parseInt(id));
  if (!veteran) {
    return (
      <div>
        <h2>Veteran Not Found</h2>
        <Link to="/">Back to Dashboard</Link>
      </div>
    );
  }

  // 1) Buttons for adding new issue / new timeline entry
  const handleAddIssue = () => {
    navigate(`/veteran/${veteran.id}/issue/new`);
  };
  const handleAddTimelineEntry = () => {
    navigate(`/veteran/${veteran.id}/timeline/new`);
  };

  // 2) Edit button for a timeline issue
  function handleEditTimelineIssue(entryIndex, issueIndex) {
    navigate(`/veteran/${veteran.id}/timeline/${entryIndex}/issue/${issueIndex}/edit`);
  }

  /**
   * getLatestPercentChange(issueId):
   * Scans the timeline for the newest 'percent_change' for the given issue.
   */
  function getLatestPercentChange(issueId) {
    let latest = null;

    for (const entry of veteran.timeline) {
      for (const iss of entry.issues) {
        if (iss.issue_id === issueId && iss.percent_change) {
          const found = {
            entry_date: entry.entry_date,
            rating: iss.percent_change
          };
          if (!latest || new Date(found.entry_date) > new Date(latest.entry_date)) {
            latest = found;
          }
        }
      }
    }

    return latest ? latest.rating : null;
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
        {veteran.issues.map((issue) => {
          // Show newest rating from the timeline
          const rating = getLatestPercentChange(issue.id);
          return (
            <li key={issue.id} style={{ marginTop: '1rem' }}>
              <strong>{issue.issue_name}</strong>
              {rating
                ? ` - Current Rating: ${rating}%`
                : ' - No rating assigned'}
            </li>
          );
        })}
      </ul>

      {/* Procedural Timeline */}
      <h3 style={{ marginTop: '2rem' }}>Procedural Timeline</h3>
      <button onClick={handleAddTimelineEntry}>Add New Timeline Entry</button>
      {veteran.timeline.map((entry, entryIndex) => (
        <div
          key={entryIndex}
          style={{
            marginTop: '1rem',
            paddingLeft: '1rem',
            borderLeft: '3px solid #ccc'
          }}
        >
          <strong>{entry.entry_date} - {entry.type}</strong>
          <ul>
            {entry.issues.map((iss, issueIndex) => {
              const foundIssue = veteran.issues.find((obj) => obj.id === iss.issue_id);
              const name = foundIssue ? foundIssue.issue_name : 'Unknown';

              return (
                <li key={issueIndex} style={{ marginBottom: '0.5rem' }}>
                  <strong>{name}</strong> ({iss.what_happened})
                  {iss.date_of_event && <div>Effective date: {iss.date_of_event}</div>}
                  {iss.percent_change && <div>Rating: {iss.percent_change}%</div>}

                  {/* Edit Button */}
                  <button
                    style={{ marginLeft: '1rem' }}
                    onClick={() => handleEditTimelineIssue(entryIndex, issueIndex)}
                  >
                    Edit
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
