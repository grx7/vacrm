import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddIssue() {
  const { id } = useParams();  // The Veteran's ID
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    issue_name: '',
    rating_percent: '',
    effective_date: '',
    diagnostic_code: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Issue Data for Veteran', id, formData);
    alert('New Issue Added (mock). Check console for data.');
    navigate(`/veteran/${id}`);
  };

  return (
    <div>
      <h2>Add New Issue</h2>
      <p>Veteran ID: {id}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Issue Name:</label><br />
          <input
            type="text"
            value={formData.issue_name}
            onChange={(e) => setFormData({ ...formData, issue_name: e.target.value })}
            required
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Initial Rating (%):</label><br />
          <input
            type="number"
            value={formData.rating_percent}
            onChange={(e) => setFormData({ ...formData, rating_percent: e.target.value })}
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
          <input type="submit" value="Save" />
          <button type="button" onClick={() => navigate(`/veteran/${id}`)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
