import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * NOTE: In a real app, you might fetch the veteran's issues from a global store or API
 * so the user can select which issues apply. For now, we'll just mimic a quick example.
 */

export default function AddTimelineEntry() {
  const { id } = useParams();   // Veteran's ID from URL
  const navigate = useNavigate();

  // This is mock data for the dropdown of possible "types"
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

  // Pretend these are existing issues for this veteran.
  // In a real app, you'd fetch them or pass them from context.
  const mockIssues = [
    { id: 1, issue_name: 'PTSD' },
    { id: 2, issue_name: 'Back Condition' }
  ];

  // Local form state
  const [formData, setFormData] = useState({
    entry_date: '',
    type: '',
    issues: [] // We'll store an array of { issue_id, what_happened }
  });

  // Track a single "what happened" for the currently selected issue
  const [currentIssueId, setCurrentIssueId] = useState('');
  const [currentWhatHappened, setCurrentWhatHappened] = useState('');

  // Handle adding an issue entry to the issues array
  const handleAddIssueEntry = () => {
    if (!currentIssueId || !currentWhatHappened) {
      alert('Please select an issue and describe what happened.');
      return;
    }

    // Check if this issue is already added
    const alreadyExists = formData.issues.find(i => i.issue_id === parseInt(currentIssueId));
    if (alreadyExists) {
      alert('That issue is already added. Remove it first or choose another issue.');
      return;
    }

    const newIssue = {
      issue_id: parseInt(currentIssueId),
      what_happened: currentWhatHappened
    };
    setFormData({
      ...formData,
      issues: [...formData.issues, newIssue]
    });
    // Reset the local fields
    setCurrentIssueId('');
    setCurrentWhatHappened('');
  };

  // Handle removing an issue from the "issues" array
  const handleRemoveIssue = (issue_id) => {
    setFormData({
      ...formData,
      issues: formData.issues.filter(i => i.issue_id !== issue_id)
    });
  };

  // Handle the final form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd POST this data to your backend or update global state
    console.log('New timeline entry for Veteran', id, formData);
    alert('New Timeline Entry added (mock). Check console for data.');
    // Navigate back to the Veteran Detail page
    navigate(`/veteran/${id}`);
  };

  return (
    <div>
      <h2>Add Timeline Entry</h2>
      <p><strong>Veteran ID:</strong> {id}</p>

      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        {/* DATE OF EVENT */}
        <div>
          <label>Date of Event:</label><br />
          <input
            type="date"
            value={formData.entry_date}
            onChange={(e) => setFormData({ ...formData, entry_date: e.target.value })}
            required
          />
        </div>

        {/* TYPE OF EVENT */}
        <div style={{ marginTop: '1rem' }}>
          <label>Type:</label><br />
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          >
            <option value="">-- Select an Event Type --</option>
            {eventTypes.map((et, index) => (
              <option key={index} value={et}>{et}</option>
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
            <option value="">-- Select an Issue --</option>
            {mockIssues.map(issue => (
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
            value={currentWhatHappened}
            onChange={(e) => setCurrentWhatHappened(e.target.value)}
          />
        </div>
        <button type="button" style={{ marginTop: '0.5rem' }} onClick={handleAddIssueEntry}>
          Add Issue to List
        </button>

        {/* DISPLAY THE LIST OF ISSUES ADDED */}
        <div style={{ marginTop: '1rem' }}>
          <ul>
            {formData.issues.map((issueEntry) => {
              // Find the name in mockIssues
              const found = mockIssues.find(i => i.id === issueEntry.issue_id);
              const name = found ? found.issue_name : `Issue #${issueEntry.issue_id}`;
              return (
                <li key={issueEntry.issue_id} style={{ marginBottom: '0.5rem' }}>
                  <strong>{name}</strong> - {issueEntry.what_happened}
                  <button
                    type="button"
                    style={{ marginLeft: '1rem' }}
                    onClick={() => handleRemoveIssue(issueEntry.issue_id)}
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
