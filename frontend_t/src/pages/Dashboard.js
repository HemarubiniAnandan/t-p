import React from 'react';

export default function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Teacher Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

