import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataContext';

export default function Dashboard() {
  // Read the array of veterans from context
  const { veterans } = useContext(DataContext);

  return (
    <div>
      <h2>Dashboard: Veteran Cases</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
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
          {veterans.map((v, idx) => {
            // e.g., get last timeline entry's date
            const lastEntry = v.timeline[v.timeline.length - 1];
            const lastUpdate = lastEntry ? lastEntry.entry_date : 'N/A';

            return (
              <tr key={v.id}>
                <td>{idx + 1}</td>
                <td>{v.full_name}</td>
                <td>{v.dob}</td>
                <td>{v.issues.length}</td>
                <td>{lastUpdate}</td>
                <td>
                  <Link to={`/veteran/${v.id}`}>View</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/veteran/new" style={{ marginTop: '1rem', display: 'inline-block' }}>
        Add New Veteran
      </Link>
    </div>
  );
}
