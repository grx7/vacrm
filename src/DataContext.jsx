import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const DataContext = createContext();

// Some sample data to populate localStorage the first time
const SAMPLE_DATA = [
  {
    id: 1,
    full_name: 'John Smith',
    dob: '1980-01-01',
    issues: [
      {
        id: 1,
        issue_name: 'PTSD',
        rating_history: [
          { percent: 70, effective_date: '2023-01-21', diagnostic_code: '8000' }
        ]
      },
      {
        id: 2,
        issue_name: 'Back Condition',
        rating_history: [
          { percent: 20, effective_date: '2023-03-24', diagnostic_code: '8002' }
        ]
      }
    ],
    timeline: [
      {
        entry_date: '2023-01-01',
        type: '21-526EZ (application for compensation)',
        issues: [
          { issue_id: 2, what_happened: 'Applies for service connection' },
          { issue_id: 1, what_happened: 'Files for increase' }
        ]
      },
      {
        entry_date: '2023-04-05',
        type: 'Rating Decision',
        issues: [
          { issue_id: 2, what_happened: 'Grants SC eff. 03/24/2023' },
          { issue_id: 1, what_happened: 'Continues rating at 70% eff. 01/21/2023' }
        ]
      }
    ]
  },
  {
    id: 2,
    full_name: 'Alice Johnson',
    dob: '1975-05-10',
    issues: [],
    timeline: []
  }
];

/**
 * DataProvider
 * 1) Loads the veterans array from localStorage, or uses SAMPLE_DATA if none found.
 * 2) Exposes { veterans, setVeterans } so child components can read/update the data.
 * 3) Writes changes to localStorage so they persist if the page is refreshed.
 */
export function DataProvider({ children }) {
  // On first load, try reading from localStorage
  const [veterans, setVeterans] = useState(() => {
    const stored = localStorage.getItem('veterans');
    return stored ? JSON.parse(stored) : SAMPLE_DATA;
  });

  // Whenever "veterans" changes, update localStorage
  useEffect(() => {
    localStorage.setItem('veterans', JSON.stringify(veterans));
  }, [veterans]);

  return (
    <DataContext.Provider value={{ veterans, setVeterans }}>
      {children}
    </DataContext.Provider>
  );
}
