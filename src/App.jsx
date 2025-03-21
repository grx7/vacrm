import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Example pages (you can adapt your actual file paths)
import Dashboard from './pages/Dashboard';
import VeteranDetail from './pages/VeteranDetail';
import EditTimelineIssue from './pages/EditTimelineIssue';

function App() {
  return (
    <Router>
      <div>
        <header style={{ backgroundColor: '#333', padding: '1rem' }}>
          <h1 style={{ color: '#fff', margin: 0 }}>VA Benefits CRM</h1>
        </header>
        <nav style={{ backgroundColor: '#eee', padding: '0.5rem' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>Dashboard</Link>
          <Link to="/veteran/1">Veteran #1</Link>
        </nav>
        <div style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/veteran/:id" element={<VeteranDetail />} />

            {/* Edit timeline issue route */}
            <Route
              path="/veteran/:id/timeline/:entryIndex/issue/:issueIndex/edit"
              element={<EditTimelineIssue />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
