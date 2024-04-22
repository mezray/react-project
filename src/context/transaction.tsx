import { createContext, useContext, useState } from 'react';

export const TransactionContext = createContext( { 
    Transactions: [],
    addTransaction: () => { },
    fetchTransactions: () => { },
 } );

export const TransactionContextProvider = (props) => {
    const [ Transactions, setTransactions] = useState([])

      async function addTransaction (title, price, payerId, debtorIds, tricountId) {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/Tricounts/Cost/AddCost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            price: parseFloat(price),
            payers: [{ id: payerId }], // Send payer's ID instead of name
            debtors: debtorIds.map(id => ({ id })), // Send debtor's IDs instead of names
            tricountId
          }),
        });
          fetchTransactions(tricountId);
         };

      async function fetchTransactions(tricountId) {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/Tricounts/Cost/FindAllCost/${tricountId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const Transactions = await response.json();
        setTransactions(Transactions)

      }

    return (
        <TransactionContext.Provider value={{ Transactions, addTransaction, fetchTransactions, setTransactions}}>
            {props.children}
        </TransactionContext.Provider>
    )
}