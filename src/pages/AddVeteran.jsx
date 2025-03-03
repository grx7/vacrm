import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../DataContext';

export default function AddVeteran() {
  const navigate = useNavigate();
  const { veterans, setVeterans } = useContext(DataContext);
  const [formData, setFormData] = useState({
    full_name: '',
    dob: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 1) Create a new ID (could do something more robust)
    const newId = veterans.length ? Math.max(...veterans.map(v => v.id)) + 1 : 1;
    // 2) Build a new object
    const newVet = {
      id: newId,
      full_name: formData.full_name,
      dob: formData.dob,
      issues: [],
      timeline: []
    };
    // 3) Update the array in state
    setVeterans([...veterans, newVet]);
    // 4) Navigate back to Dashboard
    navigate('/');
  };

  return (
    <div>
      <h2>Add New Veteran</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label><br />
          <input
            type="text"
            value={formData.full_name}
            onChange={e => setFormData({ ...formData, full_name: e.target.value })}
            required
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Date of Birth:</label><br />
          <input
            type="date"
            value={formData.dob}
            onChange={e => setFormData({ ...formData, dob: e.target.value })}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
          Save
        </button>
      </form>
    </div>
  );
}
