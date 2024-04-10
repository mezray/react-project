"use client"
import React from 'react';

function LogoutButton() {
  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/';
  };

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}

export default LogoutButton;