import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchStudentData = async () => {
      const res = await axios.get(`/api/students/${user.id}`);
      setStudentData(res.data);
    };
    fetchStudentData();
  }, [user.id]);

  return studentData ? (
    <div>
      <h2>Welcome, {studentData.name}</h2>
      <p>Email: {studentData.email}</p>
    </div>
  ) : <p>Loading...</p>;
};

export default StudentDashboard;
