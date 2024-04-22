import React, { createContext, useState, useContext, useEffect } from 'react';

export const ErrorContext = createContext( {
    errorMessage: "",
    setError: () => { },
});

export function ErrorContextProvider({ ...props }) {
    const [errorMessage, setError] = useState(null);

useEffect(() => {
    const storedError = localStorage.getItem('error');
    
}, []);



return (
    <ErrorContext.Provider value={{ errorMessage, setError }}>
        {props.children}
    </ErrorContext.Provider>
);
}