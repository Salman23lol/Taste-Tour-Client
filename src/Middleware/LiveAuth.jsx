// LiveAuth.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isExpired, decodeToken } from 'react-jwt';

const LiveAuth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('Token');
    if (!token) {
      clearStorageAndRedirect('/user/login');
    } else {
      try {
        const decodedToken = decodeToken(token);
        if (isExpired(token)) {
          clearStorageAndRedirect('/user/login');
        } else {
          const { exp } = decodedToken; // Expiration time from the decoded token
          const now = Math.floor(Date.now() / 1000); // Current time in seconds
          if (exp < now) {
            clearStorageAndRedirect('/user/login');
          } else {
            localStorage.setItem('userData', JSON.stringify(decodedToken));
          }
        }
      } catch (error) {
        clearStorageAndRedirect('/user/login');
      }
    }
  }, [navigate]);

  const clearStorageAndRedirect = (path) => {
    localStorage.clear();
    sessionStorage.clear();
    if (window.location.pathname !== path) {
      navigate(path); // Navigate to the specified path if not already on it
    }
  };

  return children;
};

export default LiveAuth;
