import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../DataContext';

export default function EditTimelineIssue() {
  const { id, entryIndex, issueIndex } = useParams();
  const navigate = useNavigate();
  const { veterans, setVeterans } = useContext(DataContext);

  // Find the correct Veteran
  const vIndex = veterans.findIndex((v) => v.id === parseInt(id));
  if (vIndex < 0) {
    return <div>Veteran not found</div>;
  }
  const veteran = veterans[vIndex];

  // Convert to numbers
  const eIndex = parseInt(entryIndex, 10);
  const iIndex = parseInt(issueIndex, 10);

  const entry = veteran.timeline[eIndex];
  if (!entry) {
    return <div>Timeline entry not found</div>;
  }

  const issueData = entry.issues[iIndex];
  if (!issueData) {
    return <div>Issue in timeline not found</div>;
  }

  // Local form state for editing
  const [formData, setFormData] = useState({
    what_happened: issueData.what_happened || '',
    date_of_event: issueData.date_of_event || '',
    percent_change: issueData.percent_change || ''
  });

  // Save changes
  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = [...veterans]; // copy
    // Overwrite the fields
    updated[vIndex].timeline[eIndex].issues[iIndex] = {
      ...issueData,
      what_happened: formData.what_happened,
      date_of_event: formData.date_of_event,
      percent_change: formData.percent_change
    };

    // Persist
    setVeterans(updated);

    alert('Timeline issue updated!');
    navigate(`/veteran/${id}`);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Edit Timeline Issue</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>What Happened?</label><br />
          <textarea
            rows="2"
            cols="40"
            value={formData.what_happened}
            onChange={(e) => setFormData({ ...formData, what_happened: e.target.value })}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Effective Date:</label><br />
          <input
            type="date"
            value={formData.date_of_event}
            onChange={(e) => setFormData({ ...formData, date_of_event: e.target.value })}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Rating (%):</label><br />
          <input
            type="number"
            value={formData.percent_change}
            onChange={(e) => setFormData({ ...formData, percent_change: e.target.value })}
          />
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>
          Save
        </button>
        <button type="button" style={{ marginLeft: '1rem' }} onClick={() => navigate(`/veteran/${id}`)}>
          Cancel
        </button>
      </form>
    </div>
  );
}
