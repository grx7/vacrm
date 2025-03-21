import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../DataContext';

export default function EditTimelineIssue() {
  const { id, entryIndex, issueIndex } = useParams();
  const navigate = useNavigate();
  const { veterans, setVeterans } = useContext(DataContext);

  // Find correct Veteran
  const vIndex = veterans.findIndex(v => v.id === parseInt(id));
  if (vIndex < 0) {
    return <div>Veteran not found.</div>;
  }
  const veteran = veterans[vIndex];

  // Convert param strings to numbers
  const eIndex = parseInt(entryIndex, 10);
  const iIndex = parseInt(issueIndex, 10);

  // Timeline entry
  const entry = veteran.timeline[eIndex];
  if (!entry) {
    return <div>Timeline entry not found.</div>;
  }

  // The specific issue we want to edit
  const issueData = entry.issues[iIndex];
  if (!issueData) {
    return <div>Timeline issue not found.</div>;
  }

  // Local form for the timeline entry date and issue fields
  const [formData, setFormData] = useState({
    // main timeline entry fields
    entry_date: entry.entry_date,
    type: entry.type,

    // the specific issue fields
    what_happened: issueData.what_happened || '',
    date_of_event: issueData.date_of_event || '',
    percent_change: issueData.percent_change || ''
  });

  // Save changes
  const handleSubmit = (e) => {
    e.preventDefault();

    // copy
    const updated = [...veterans];

    // 1) update the timeline entry's main date + type
    updated[vIndex].timeline[eIndex] = {
      ...entry,
      entry_date: formData.entry_date,
      type: formData.type
    };

    // 2) update the issue data inside that entry
    updated[vIndex].timeline[eIndex].issues[iIndex] = {
      ...issueData,
      what_happened: formData.what_happened,
      date_of_event: formData.date_of_event,
      percent_change: formData.percent_change
    };

    // persist
    setVeterans(updated);

    alert('Timeline issue updated!');
    navigate(`/veteran/${id}`);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Edit Timeline Issue</h2>

      <form onSubmit={handleSubmit}>
        <fieldset style={{ marginBottom: '1rem' }}>
          <legend>Timeline Entry Info</legend>
          <div>
            <label>Entry Date:</label><br />
            <input
              type="date"
              value={formData.entry_date}
              onChange={(e) => setFormData({ ...formData, entry_date: e.target.value })}
              required
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label>Type:</label><br />
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            />
          </div>
        </fieldset>

        <fieldset style={{ marginBottom: '1rem' }}>
          <legend>Issue-Specific Fields</legend>
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
            <label>Effective Date (Optional):</label><br />
            <input
              type="date"
              value={formData.date_of_event}
              onChange={(e) => setFormData({ ...formData, date_of_event: e.target.value })}
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label>Rating (Percent Change):</label><br />
            <input
              type="number"
              value={formData.percent_change}
              onChange={(e) => setFormData({ ...formData, percent_change: e.target.value })}
            />
          </div>
        </fieldset>

        <button type="submit">Save</button>
        <button type="button" style={{ marginLeft: '1rem' }} onClick={() => navigate(`/veteran/${id}`)}>
          Cancel
        </button>
      </form>
    </div>
  );
}
