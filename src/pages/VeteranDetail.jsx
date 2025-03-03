import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../DataContext';

export default function VeteranDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Get the array of veterans from context
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

  // The rest remains mostly the same: handleAddIssue, handleViewHistory, etc.
  const handleAddIssue = () => {
    navigate(`/veteran/${veteran.id}/issue/new`);
  };

  const handleAddTimelineEntry = () => {
    navigate(`/veteran/${veteran.id}/timeline/new`);
  };

  const handleViewHistory = (issueId) => {
    navigate(`/veteran/${veteran.id}/issue/${issueId}/history`);
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
        {veteran.issues.map(issue => {
          const latest = issue.rating_history[issue.rating_history.length - 1];
          return (
            <li key={issue.id} style={{ marginTop: '1rem' }}>
              <strong>{issue.issue_name}</strong> - {latest.percent}%
              {` (DC ${latest.diagnostic_code}, eff. ${latest.effective_date})`}
              <button style={{ marginLeft: '1rem' }} onClick={() => handleViewHistory(issue.id)}>
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
          style={{ marginTop: '1rem', paddingLeft: '1rem', borderLeft: '3px solid #ccc' }}
        >
          <strong>{entry.entry_date} - {entry.type}</strong>
          <ul>
            {entry.issues.map((iss, i) => {
              const foundIssue = veteran.issues.find(obj => obj.id === iss.issue_id);
              const name = foundIssue ? foundIssue.issue_name : 'Unknown';
              return <li key={i}>{name} ({iss.what_happened})</li>;
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
