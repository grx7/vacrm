import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Example pages (you can adapt your actual file paths)
import Dashboard from './pages/Dashboard';
import VeteranDetail from './pages/VeteranDetail';
import EditTimelineIssue from './pages/EditTimelineIssue';
// Add the following imports:
import AddIssue from './pages/AddIssue';
import AddTimelineEntry from './pages/AddTimelineEntry';

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
            {/* Existing routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/veteran/:id" element={<VeteranDetail />} />

            {/* NEW: AddIssue and AddTimelineEntry routes */}
            <Route path="/veteran/:id/issue/new" element={<AddIssue />} />
            <Route path="/veteran/:id/timeline/new" element={<AddTimelineEntry />} />

            {/* Existing Edit route */}
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
