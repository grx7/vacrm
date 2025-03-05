import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../DataContext';

export default function AddIssue() {
  const { id } = useParams();  // The Veteran's ID from URL
  const navigate = useNavigate();

  // Pull in the local DB from context
  const { veterans, setVeterans } = useContext(DataContext);

  // Local form state
  const [formData, setFormData] = useState({
    issue_name: '',
    rating_percent: '',
    effective_date: '',
    diagnostic_code: ''
  });

  // On form submit, add the new issue to the chosen veteran
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1) Make a copy of the existing array
    const updatedVeterans = [...veterans];

    // 2) Find the correct veteran by matching the ID
    const index = updatedVeterans.findIndex((v) => v.id === parseInt(id));
    if (index < 0) {
      alert('Veteran not found');
      navigate('/');
      return;
    }

    // 3) Generate a new ID for this issue
    const { issues } = updatedVeterans[index];
    const nextIssueId = issues.length
      ? Math.max(...issues.map((i) => i.id)) + 1
      : 1;

    // 4) Build the base new issue object
    const newIssue = {
      id: nextIssueId,
      issue_name: formData.issue_name,
      rating_history: [] // initially empty
    };

    // 5) If the user provided ANY rating fields, add them to rating_history
    if (formData.rating_percent || formData.effective_date || formData.diagnostic_code) {
      newIssue.rating_history.push({
        percent: formData.rating_percent
          ? parseInt(formData.rating_percent, 10)
          : undefined,
        effective_date: formData.effective_date || undefined,
        diagnostic_code: formData.diagnostic_code || undefined
      });
    }

    // 6) Push the new issue onto the veteran’s issues array
    updatedVeterans[index].issues.push(newIssue);

    // 7) Call setVeterans to update the context (writes to localStorage)
    setVeterans(updatedVeterans);

    // 8) Navigate back to the VeteranDetail page
    alert('New Issue Added!');
    navigate(`/veteran/${id}`);
  };

  return (
    <div>
      <h2>Add New Issue</h2>
      <p>Veteran ID: {id}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Issue Name (Required):</label><br />
          <input
            type="text"
            value={formData.issue_name}
            onChange={(e) => setFormData({ ...formData, issue_name: e.target.value })}
            required
          />
        </div>

        {/* The following fields are optional */}
        <div style={{ marginTop: '1rem' }}>
          <label>Initial Rating (%):</label><br />
          <input
            type="number"
            value={formData.rating_percent}
            onChange={(e) => setFormData({ ...formData, rating_percent: e.target.value })}
            placeholder="Optional"
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Effective Date:</label><br />
          <input
            type="date"
            value={formData.effective_date}
            onChange={(e) => setFormData({ ...formData, effective_date: e.target.value })}
            placeholder="Optional"
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Diagnostic Code:</label><br />
          <input
            type="text"
            value={formData.diagnostic_code}
            onChange={(e) => setFormData({ ...formData, diagnostic_code: e.target.value })}
            placeholder="Optional"
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate(`/veteran/${id}`)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
