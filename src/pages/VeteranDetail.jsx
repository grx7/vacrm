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

  // Go to Add Issue
  const handleAddIssue = () => {
    navigate(`/veteran/${veteran.id}/issue/new`);
  };

  // Go to Issue History
  const handleViewHistory = (issueId) => {
    navigate(`/veteran/${veteran.id}/issue/${issueId}/history`);
  };

  // Go to Add Timeline Entry
  const handleAddTimelineEntry = () => {
    navigate(`/veteran/${veteran.id}/timeline/new`);
  };

  // NEW: Edit a specific issue in the timeline
  function handleEditTimelineIssue(entryIndex, issueIndex) {
    navigate(`/veteran/${veteran.id}/timeline/${entryIndex}/issue/${issueIndex}/edit`);
  }

  return (
    <div>
      <h2>Veteran Detail</h2>
      <p><strong>Name:</strong> {veteran.full_name}</p>
      <p><strong>DOB:</strong> {veteran.dob}</p>
      <Link to="/">Back to Dashboard</Link>

      {/* Example: Issues list (if you have rating_history or timeline logic) */}
      <h3 style={{ marginTop: '2rem' }}>Issues</h3>
      <button onClick={handleAddIssue}>Add New Issue</button>
      <ul>
        {veteran.issues.map((issue) => {
          // If you have code for rating_history or timeline scanning, place it here
          return (
            <li key={issue.id} style={{ marginTop: '1rem' }}>
              <strong>{issue.issue_name}</strong>
              {/* e.g., " - No rating assigned" or show the newest rating */}
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
          <strong>
            {entry.entry_date} - {entry.type}
          </strong>
          <ul>
            {entry.issues.map((iss, issueIndex) => {
              const foundIssue = veteran.issues.find((obj) => obj.id === iss.issue_id);
              const name = foundIssue ? foundIssue.issue_name : 'Unknown';

              return (
                <li key={issueIndex} style={{ marginBottom: '0.5rem' }}>
                  <strong>{name}</strong> ({iss.what_happened})
                  {iss.date_of_event && <div>Effective date: {iss.date_of_event}</div>}
                  {iss.percent_change && <div>Rating: {iss.percent_change}%</div>}

                  {/* EDIT BUTTON */}
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
