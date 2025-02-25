import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function IssueHistory() {
  const { id, issueId } = useParams();
  const navigate = useNavigate();

  // Mock data from VeteranDetail.
  const [veteran] = useState({
    id: parseInt(id),
    full_name: 'John Smith',
    issues: [
      {
        id: 1,
        issue_name: 'PTSD',
        rating_history: [
          { percent: 70, effective_date: '2023-01-21', diagnostic_code: '8000' },
          { percent: 50, effective_date: '2022-06-10', diagnostic_code: '8000' }
        ]
      },
      {
        id: 2,
        issue_name: 'Back Condition',
        rating_history: [
          { percent: 20, effective_date: '2023-03-24', diagnostic_code: '8002' }
        ]
      }
    ]
  });

  // Find the specific issue
  const currentIssue = veteran.issues.find(i => i.id === parseInt(issueId));

  if (!currentIssue) {
    return (
      <div>
        <h2>Issue Not Found</h2>
        <button onClick={() => navigate(`/veteran/${id}`)}>Go Back</button>
      </div>
    );
  }

  // 1) Instead of alert, we do a route change to /rating/new
  const handleAddRatingUpdate = () => {
    navigate(`/veteran/${id}/issue/${issueId}/rating/new`);
  };

  return (
    <div>
      <h2>Issue History</h2>
      <p><strong>Veteran ID:</strong> {id}</p>
      <p><strong>Issue:</strong> {currentIssue.issue_name}</p>

      {/* 2) Button to add rating update */}
      <button onClick={handleAddRatingUpdate}>Add Rating Update</button>

      <h3 style={{ marginTop: '2rem' }}>Rating History</h3>
      {currentIssue.rating_history.map((rh, idx) => (
        <div
          key={idx}
          style={{
            marginBottom: '1rem',
            paddingLeft: '1rem',
            borderLeft: '3px solid #ccc'
          }}
        >
          <strong>{rh.percent}%</strong>
          {` (DC ${rh.diagnostic_code}, eff. ${rh.effective_date})`}
        </div>
      ))}

      <button onClick={() => navigate(`/veteran/${id}`)}>Back to Veteran Detail</button>
    </div>
  );
}
