import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../DataContext';

export default function AddTimelineEntry() {
  const { id } = useParams();   // Veteran's ID from URL
  const navigate = useNavigate();

  // Get data + setter from context
  const { veterans, setVeterans } = useContext(DataContext);

  // We’ll provide a fixed list of event types for the dropdown
  const eventTypes = [
    '21-526 EZ (new claim)',
    '21-526 EZ (claim for increase)',
    'Informal claim',
    'Supplemental Claim',
    'Higher Level Review',
    'Notice of Disagreement',
    'Statement of Case',
    'Supplemental Statement of Case',
    'Form-9',
    'Rating Decision',
    'Board Decision',
    'CAVC Decision',
    'Other'
  ];

  // This is the local form state for collecting the new timeline entry’s data
  const [formData, setFormData] = useState({
    entry_date: '',
    type: '',
    issues: []  // We'll store an array of { issue_id, what_happened, date_of_event, percent_change }
  });

  // Find the correct Veteran from context
  const currentVeteran = veterans.find((v) => v.id === parseInt(id));
  if (!currentVeteran) {
    return (
      <div>
        <h2>Veteran Not Found</h2>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  // We'll show the user a dropdown of the veteran's existing issues
  const availableIssues = currentVeteran.issues;

  // For adding issues to the timeline, we track them in these local states
  const [currentIssueId, setCurrentIssueId] = useState('');
  const [currentWhatHappened, setCurrentWhatHappened] = useState('');

  // NEW FIELDS: date picker + percent inc/dec
  const [currentIssueDate, setCurrentIssueDate] = useState('');
  const [currentPercentChange, setCurrentPercentChange] = useState('');

  // Add the chosen issue + details to formData.issues
  const handleAddIssue = () => {
    if (!currentIssueId || !currentWhatHappened) {
      alert('Please select an issue and describe what happened.');
      return;
    }

    // Prevent adding the same issue multiple times
    const alreadyAdded = formData.issues.find((i) => i.issue_id === parseInt(currentIssueId));
    if (alreadyAdded) {
      alert('That issue is already in the list. Remove it first or choose a different one.');
      return;
    }

    // Build an object that includes the two new fields
    const newIssueLine = {
      issue_id: parseInt(currentIssueId),
      what_happened: currentWhatHappened,
      date_of_event: currentIssueDate,    // optional
      percent_change: currentPercentChange // optional
    };

    setFormData({
      ...formData,
      issues: [...formData.issues, newIssueLine]
    });

    // Reset local fields
    setCurrentIssueId('');
    setCurrentWhatHappened('');
    setCurrentIssueDate('');
    setCurrentPercentChange('');
  };

  // Remove an issue from formData.issues
  const handleRemoveIssue = (issueId) => {
    setFormData({
      ...formData,
      issues: formData.issues.filter((i) => i.issue_id !== issueId)
    });
  };

  // Final form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1) Make a copy of the veterans array
    const updatedVeterans = [...veterans];
    // 2) Find the correct veteran
    const idx = updatedVeterans.findIndex((v) => v.id === parseInt(id));
    if (idx < 0) {
      alert('Veteran not found');
      navigate('/');
      return;
    }

    // 3) Build a new timeline entry object
    const newEntry = {
      entry_date: formData.entry_date,
      type: formData.type,
      issues: formData.issues
    };

    // 4) Push it onto the veteran’s timeline array
    updatedVeterans[idx].timeline.push(newEntry);

    // 5) Save the updated array to context -> localStorage
    setVeterans(updatedVeterans);

    // 6) Navigate back
    alert('New Timeline Entry added!');
    navigate(`/veteran/${id}`);
  };

  return (
    <div>
      <h2>Add Timeline Entry</h2>
      <p><strong>Veteran ID:</strong> {id}</p>

      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        {/* MAIN TIMELINE FIELDS */}
        <div>
          <label>Date of Event:</label><br />
          <input
            type="date"
            value={formData.entry_date}
            onChange={(e) => setFormData({ ...formData, entry_date: e.target.value })}
            required
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Type:</label><br />
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          >
            <option value="">-- Select an Event Type --</option>
            {eventTypes.map((et, index) => (
              <option key={index} value={et}>
                {et}
              </option>
            ))}
          </select>
        </div>

        <hr style={{ margin: '1rem 0' }} />

        {/* ISSUES AFFECTED */}
        <h4>Issues Involved</h4>
        <div>
          <label>Select Issue:</label><br />
          <select
            value={currentIssueId}
            onChange={(e) => setCurrentIssueId(e.target.value)}
          >
            <option value="">-- Choose an Issue --</option>
            {availableIssues.map((issue) => (
              <option key={issue.id} value={issue.id}>
                {issue.issue_name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <label>What Happened?</label><br />
          <textarea
            rows="2"
            cols="40"
            placeholder="Describe the decision or event for this issue..."
            value={currentWhatHappened}
            onChange={(e) => setCurrentWhatHappened(e.target.value)}
          />
        </div>

        {/* NEW FIELDS: Date + Percentage Increase/Decrease */}
        <div style={{ marginTop: '0.5rem' }}>
          <label>Effective Date:</label><br />
          <input
            type="date"
            value={currentIssueDate}
            onChange={(e) => setCurrentIssueDate(e.target.value)}
          />
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <label>Rating Increase/Decrease (Optional):</label><br />
          <input
            type="number"
            placeholder="e.g. +10 or -10"
            value={currentPercentChange}
            onChange={(e) => setCurrentPercentChange(e.target.value)}
          />
        </div>

        <button
          type="button"
          style={{ marginTop: '0.5rem' }}
          onClick={handleAddIssue}
        >
          Add Issue to List
        </button>

        {/* SHOW THE LIST OF ISSUES ADDED */}
        <div style={{ marginTop: '1rem' }}>
          <ul>
            {formData.issues.map((i) => {
              // Find the name from the available issues
              const found = availableIssues.find((ai) => ai.id === i.issue_id);
              const name = found ? found.issue_name : `Issue #${i.issue_id}`;

              return (
                <li key={i.issue_id} style={{ marginBottom: '0.5rem' }}>
                  <strong>{name}</strong> – {i.what_happened}
                  {i.date_of_event && (
                    <div>Date: {i.date_of_event}</div>
                  )}
                  {i.percent_change && (
                    <div>Percent change: {i.percent_change}</div>
                  )}
                  <button
                    type="button"
                    style={{ marginLeft: '1rem' }}
                    onClick={() => handleRemoveIssue(i.issue_id)}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <hr style={{ margin: '1rem 0' }} />

        <button type="submit">Save Entry</button>
        <button
          type="button"
          style={{ marginLeft: '1rem' }}
          onClick={() => navigate(`/veteran/${id}`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
