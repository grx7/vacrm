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

  const handleAddIssue = () => {
    navigate(`/veteran/${veteran.id}/issue/new`);
  };

  const handleViewHistory = (issueId) => {
    navigate(`/veteran/${veteran.id}/issue/${issueId}/history`);
  };

  const handleAddTimelineEntry = () => {
    navigate(`/veteran/${veteran.id}/timeline/new`);
  };

  return (
    <div>
      <h2>Veteran Detail</h2>
      <p><strong>Name:</strong> {veteran.full_name}</p>
      <p><strong>DOB:</strong> {veteran.dob}</p>
      <Link to="/">Back to Dashboard</Link>

      <h3 style={{ marginTop: '2rem' }}>Issues</h3>
      <button onClick={handleAddIssue}>Add New Issue</button>
      <ul>
        {veteran.issues.map((issue) => {
          // -- CHANGE #1: Safely get the "latest" rating if any exist --
          const hasRatings = issue.rating_history && issue.rating_history.length > 0;
          const latest = hasRatings
            ? issue.rating_history[issue.rating_history.length - 1]
            : null;

          // -- Render the issue --
          return (
            <li key={issue.id} style={{ marginTop: '1rem' }}>
              <strong>{issue.issue_name}</strong>
              {latest ? (
                <>
                  {' - '}
                  {latest.percent}% (DC {latest.diagnostic_code}, eff. {latest.effective_date})
                </>
              ) : (
                // Fallback if no rating
                <> - No rating assigned</>
              )}
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

      <h3 style={{ marginTop: '2rem' }}>Procedural Timeline</h3>
      <button onClick={handleAddTimelineEntry}>Add New Timeline Entry</button>
      {veteran.timeline.map((entry, idx) => (
        <div
          key={idx}
          style={{
            marginTop: '1rem',
            paddingLeft: '1rem',
            borderLeft: '3px solid #ccc',
          }}
        >
          <strong>
            {entry.entry_date} - {entry.type}
          </strong>
          <ul>
            {entry.issues.map((iss, i) => {
              const foundIssue = veteran.issues.find((obj) => obj.id === iss.issue_id);
              const name = foundIssue ? foundIssue.issue_name : 'Unknown';
              return <li key={i}>{name} ({iss.what_happened})</li>;
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
