import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for the token
export const TokenContext = createContext( {
  token: null,
  setToken: () => { },
});

// Create a provider for the token context
export function TokenContextProvider({ ...props }) {
  const [token, setToken] = useState(null);

  // Check if a token exists in local storage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log(storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}