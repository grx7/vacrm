import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddRatingUpdate() {
  const { id, issueId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    percent: '',
    effective_date: '',
    diagnostic_code: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd POST to your backend or update global state
    console.log('New rating update for Veteran', id, 'Issue', issueId, formData);
    alert('New rating update added (mock). Check console for data.');
    // After saving, go back to the IssueHistory page
    navigate(`/veteran/${id}/issue/${issueId}/history`);
  };

  return (
    <div>
      <h2>Add Rating Update</h2>
      <p><strong>Veteran ID:</strong> {id} &nbsp; <strong>Issue ID:</strong> {issueId}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating (%):</label><br />
          <input
            type="number"
            value={formData.percent}
            onChange={(e) => setFormData({ ...formData, percent: e.target.value })}
            required
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Effective Date:</label><br />
          <input
            type="date"
            value={formData.effective_date}
            onChange={(e) => setFormData({ ...formData, effective_date: e.target.value })}
            required
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Diagnostic Code:</label><br />
          <input
            type="text"
            value={formData.diagnostic_code}
            onChange={(e) => setFormData({ ...formData, diagnostic_code: e.target.value })}
            required
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate(`/veteran/${id}/issue/${issueId}/history`)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
