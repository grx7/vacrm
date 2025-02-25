import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  // Mock data: list of veterans
  const [veterans] = useState([
    { id: 1, full_name: 'John Smith', dob: '1980-01-01', issues: 2, lastUpdate: '2023-03-24' },
    { id: 2, full_name: 'Alice Johnson', dob: '1975-05-10', issues: 3, lastUpdate: '2023-04-15' },
  ]);

  return (
    <div>
      <h2>Dashboard: Veteran Cases</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }} border="1" cellPadding="8">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>DOB</th>
            <th># Issues</th>
            <th>Last Update</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {veterans.map((v, idx) => (
            <tr key={v.id}>
              <td>{idx + 1}</td>
              <td>{v.full_name}</td>
              <td>{v.dob}</td>
              <td>{v.issues}</td>
              <td>{v.lastUpdate}</td>
              <td>
                <Link to={`/veteran/${v.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/veteran/new" style={{ display: 'inline-block', marginTop: '1rem' }}>
        Add New Veteran
      </Link>
    </div>
  );
}
