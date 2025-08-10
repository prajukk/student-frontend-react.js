// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthContext'; // Make sure this is the correct import
import PrivateRoute from './components/PrivateRoute';

// Components
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import DepartmentDashboard from './components/DepartmentDashboard';
import StudentProfile from './components/StudentProfile';
import UpdateStudent from './components/UpdateStudent';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/student-dashboard" 
              element={
                <PrivateRoute role="student">
                  <StudentDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/department-dashboard" 
              element={
                <PrivateRoute role="department">
                  <DepartmentDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/student/:id" 
              element={
                <PrivateRoute role="student">
                  <StudentProfile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/update-student/:id" 
              element={
                <PrivateRoute role="department">
                  <UpdateStudent />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;