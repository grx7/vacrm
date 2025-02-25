import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddVeteran() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    dob: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating new veteran:', formData);
    // In real code, you'd post this data to an API, then redirect:
    // e.g., axios.post('/api/veterans', formData).then(() => navigate('/'));
    alert('New Veteran Added (mock). Check console for data.');
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
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label><br />
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            required
          />
        </div>
        <br />
        <input type="submit" value="Save" />
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
}
