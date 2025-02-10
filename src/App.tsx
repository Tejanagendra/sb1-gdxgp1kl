import React from 'react';
import Navbar from './components/Navbar';
import ActivityCards from './components/ActivityCards';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActivityDetail from './components/ActivityDetail';
import { PointsProvider } from './context/PointsContext';

function App() {
  return (
    <Router>
      <PointsProvider>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<ActivityCards />} />
            <Route path="/activity/:id" element={<ActivityDetail />} />
          </Routes>
        </div>
      </PointsProvider>
    </Router>
  );
}

export default App;