import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    age: '',
    gender: '',
    dob: '',
    mobile: '',
  });


  const handleUpdateProfile = () => {
 
    window.alert('Thank you for submitting!');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2 className="mb-4">Dashboard</h2>
        <div className="form-group mb-3">
          <label>Age:</label>
          <input
            type="text"
            className="form-control rounded-0"
            value={userData.age}
            onChange={(e) => setUserData({ ...userData, age: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <label>Gender:</label>
          <input
            type="text"
            className="form-control rounded-0"
            value={userData.gender}
            onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <label>Date of Birth:</label>
          <input
            type="date"
            className="form-control rounded-0"
            value={userData.dob}
            onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <label>Mobile:</label>
          <input
            type="text"
            className="form-control rounded-0"
            value={userData.mobile}
            onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
          />
        </div>
        <button onClick={handleUpdateProfile} className="btn btn-success w-100 rounded-0 mb-2">
          Update Profile
        </button>
        <button onClick={handleLogout} className="btn btn-danger w-100 rounded-0">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
