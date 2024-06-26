"use client"
import React, { useContext } from 'react';
import { TokenContext } from '@/context/tokenContext';

function LogoutButton() {
  const { token, setToken } = useContext(TokenContext);

  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Update the token state
    setToken("");
    // Redirect to login page
    window.location.href = '/';
  };

  return token ? <button onClick={logout}>Logout</button> : null;
}

export default LogoutButton;