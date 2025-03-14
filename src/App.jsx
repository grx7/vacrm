import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import VeteranDetail from './pages/VeteranDetail';
import AddVeteran from './pages/AddVeteran';
import AddIssue from './pages/AddIssue';
import IssueHistory from './pages/IssueHistory';
import AddRatingUpdate from './pages/AddRatingUpdate';
import AddTimelineEntry from './pages/AddTimelineEntry';
import EditTimelineIssue from './pages/EditTimelineIssue';

function App() {
  return (
    <Router>
      <div>
        <header style={{ backgroundColor: '#333', padding: '1rem' }}>
          <h1 style={{ color: '#fff', margin: 0 }}>VA Benefits CRM Mock</h1>
        </header>
        <nav style={{ backgroundColor: '#eee', padding: '0.5rem' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>Dashboard</Link>
          <Link to="/veteran/1" style={{ marginRight: '1rem' }}>Veteran #1</Link>
          <Link to="/veteran/new">Add Veteran</Link>
        </nav>
        <div style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/veteran/new" element={<AddVeteran />} />
            <Route path="/veteran/:id" element={<VeteranDetail />} />
            <Route path="/veteran/:id/issue/new" element={<AddIssue />} />
            <Route path="/veteran/:id/issue/:issueId/history" element={<IssueHistory />} />
            <Route path="/veteran/:id/issue/:issueId/rating/new" element={<AddRatingUpdate />} />

            <Route path="/veteran/:id/timeline/new" element={<AddTimelineEntry />} />

            {/* New route for editing a timeline issue */}
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
