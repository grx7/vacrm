import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function VeteranDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for a single veteran record
  const [veteran] = useState({
    id: parseInt(id),
    full_name: 'John Smith',
    dob: '1980-01-01',
    issues: [
      {
        id: 1,
        issue_name: 'PTSD',
        rating_history: [
          { percent: 70, effective_date: '2023-01-21', diagnostic_code: '8000' }
        ]
      },
      {
        id: 2,
        issue_name: 'Back Condition',
        rating_history: [
          { percent: 20, effective_date: '2023-03-24', diagnostic_code: '8002' }
        ]
      }
    ],
    timeline: [
      {
        entry_date: '2023-01-01',
        type: '21-526EZ (application for compensation)',
        issues: [
          { issue_id: 2, what_happened: 'Applies for service connection' },
          { issue_id: 1, what_happened: 'Files for increase' }
        ]
      },
      {
        entry_date: '2023-04-05',
        type: 'Rating Decision',
        issues: [
          { issue_id: 2, what_happened: 'Grants SC eff. 03/24/2023' },
          { issue_id: 1, what_happened: 'Continues rating at 70% eff. 01/21/2023' }
        ]
      }
    ]
  });

  // Navigate to Add Issue page
  const handleAddIssue = () => {
    navigate(`/veteran/${veteran.id}/issue/new`);
  };

  // Navigate to Issue History page
  const handleViewHistory = (issueId) => {
    navigate(`/veteran/${veteran.id}/issue/${issueId}/history`);
  };

  // Navigate to Add Timeline Entry page
  const handleAddTimelineEntry = () => {
    navigate(`/veteran/${veteran.id}/timeline/new`);
  };

  return (
    <div>
      <h2>Veteran Detail</h2>
      <p><strong>Name:</strong> {veteran.full_name}</p>
      <p><strong>DOB:</strong> {veteran.dob}</p>
      <Link to="/">Back to Dashboard</Link>

      {/* Issues Section */}
      <h3 style={{ marginTop: '2rem' }}>Issues</h3>
      <button onClick={handleAddIssue}>Add New Issue</button>
      <ul>
        {veteran.issues.map((issue) => {
          const latest = issue.rating_history[issue.rating_history.length - 1];
          return (
            <li key={issue.id} style={{ marginTop: '1rem' }}>
              <strong>{issue.issue_name}</strong> - {latest.percent}%
              {` (DC ${latest.diagnostic_code}, eff. ${latest.effective_date})`}
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
            {entry.issues.map((iss, i) => {
              const foundIssue = veteran.issues.find(
                (obj) => obj.id === iss.issue_id
              );
              const name = foundIssue ? foundIssue.issue_name : 'Unknown';
              return (
                <li key={i}>
                  {name} ({iss.what_happened})
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
