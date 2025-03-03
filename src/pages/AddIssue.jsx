import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../DataContext';

export default function AddIssue() {
  const { id } = useParams();  // The Veteran's ID from URL
  const navigate = useNavigate();

  // Pull in the local DB from context
  const { veterans, setVeterans } = useContext(DataContext);

  // This is the local form state for collecting the new issue’s info
  const [formData, setFormData] = useState({
    issue_name: '',
    rating_percent: '',
    effective_date: '',
    diagnostic_code: ''
  });

  // Called when the user submits the form
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1) Make a copy of the existing array
    const updatedVeterans = [...veterans];

    // 2) Find the correct veteran by matching the ID
    const index = updatedVeterans.findIndex(v => v.id === parseInt(id));
    if (index < 0) {
      alert('Veteran not found');
      navigate('/');
      return;
    }

    // 3) Generate a new ID for this issue (if you don’t have unique IDs, do something else)
    const nextIssueId = updatedVeterans[index].issues.length
      ? Math.max(...updatedVeterans[index].issues.map(i => i.id)) + 1
      : 1;

    // 4) Build the new issue object
    const newIssue = {
      id: nextIssueId,
      issue_name: formData.issue_name,
      rating_history: [
        {
          percent: parseInt(formData.rating_percent, 10),
          effective_date: formData.effective_date,
          diagnostic_code: formData.diagnostic_code
        }
      ]
    };

    // 5) Push it onto the veteran’s issues array
    updatedVeterans[index].issues.push(newIssue);

    // 6) Call setVeterans to update the context
    setVeterans(updatedVeterans);

    // 7) Navigate back to the VeteranDetail page
    alert('New Issue Added!');
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
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate(`/veteran/${id}`)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
