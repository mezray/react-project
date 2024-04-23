import React, { createContext, useState, useContext, useEffect } from 'react';

export const ErrorContext = createContext( {
    errorMessage: "",
    transactionMessage: "",
    addUserMessage: "",
    setError: (errorMessage: string) => { },
    setTransactionMessage: (transactionMessage: string) => { },
    setAddUserMessage: (addUserMessage: string) => { }
});

export function ErrorContextProvider({ ...props }) {
    const [errorMessage, setError] = useState("");
    const [transactionMessage, setTransactionMessage] = useState("");
    const [addUserMessage, setAddUserMessage] = useState("");

    useEffect(() => {
        const storedError = localStorage.getItem('error');
        
    }, []);



    return (
        <ErrorContext.Provider value={{ errorMessage, setError, transactionMessage, setTransactionMessage, addUserMessage, setAddUserMessage}}>
            {props.children}
        </ErrorContext.Provider>
    );
}