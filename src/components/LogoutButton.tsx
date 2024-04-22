"use client"
import React from 'react';
import { useToken } from '@/context/TokenContext'; // adjust the path as needed

function LogoutButton() {
  const { token, setToken } = useToken();

  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Update the token state
    setToken(null);
    // Redirect to login page
    window.location.href = '/';
  };

  return token ? <button onClick={logout}>Logout</button> : null;
}

export default LogoutButton;