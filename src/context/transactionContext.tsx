import { createContext, useContext, useState } from 'react';

export const TransactionContext = createContext( { 
    Transactions: [],
    addTransaction: () => { },
    fetchTransactions: () => { },
    setTransactions: () => { },
    deleteTransaction: () => { },
 } );

 type Transaction = { 
    id: string,
    title: string,
    price: number,
    payers: { id: string, name: string }[],
    debtors: { id: string, name: string }[],
    tricountId: string,
  };

export const TransactionContextProvider = (props) => {
    const [ Transactions, setTransactions] = useState<Transaction[]>([])

      async function addTransaction (title, price, payerId, debtorIds, tricountId) {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/Tricounts/Transaction/AddTransaction', {
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
        const response = await fetch(`/api/Tricounts/Transaction/FindAllTransaction/${tricountId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const Transactions: Transaction[] = await response.json();
        setTransactions(Transactions)

      }

      async function deleteTransaction(transactionId, tricountId) {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/Tricounts/Transaction/DeleteTransaction/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({ transactionId, tricountId }),
        });
        fetchTransactions(tricountId);
      }

    return (
        <TransactionContext.Provider value={{ Transactions, addTransaction, fetchTransactions, setTransactions, deleteTransaction}}>
            {props.children}
        </TransactionContext.Provider>
    )
}