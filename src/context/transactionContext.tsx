import { createContext, useContext, useState } from 'react';

type TransactionContextType = {
  Transactions: Transaction[];
  addTransaction: (title: string, price: number, payerId: string, debtorIds: string[], tricountId: string) => void;
  fetchTransactions: (tricountId: string) => void;
  setTransactions: (transactions: Transaction[]) => void;
  deleteTransaction: (transactionId: string, tricountId: string) => void;
};

export const TransactionContext = createContext<TransactionContextType>( { 
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
    payer: { id: string, name: string }[],
    debtors: { id: string, name: string }[],
    tricountId: string,
  };

export const TransactionContextProvider = (props: any) => {
    const [ Transactions, setTransactions] = useState<Transaction[]>([])

    async function addTransaction (
        title: string, 
        price: number,
        payerId: string,
        debtorIds: string[], 
        tricountId: string
      ) {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/Tricounts/Transaction/AddTransaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            price: parseFloat(price.toString()),
            payers: [{ id: payerId }], // Send payer's ID instead of name
            debtors: debtorIds.map(id => ({ id })), // Send debtor's IDs instead of names
            tricountId
          }),
        });
          fetchTransactions(tricountId);
         };

      async function fetchTransactions(tricountId: string) {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/Tricounts/Transaction/FindAllTransaction/${tricountId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const Transactions: Transaction[] = await response.json();
        setTransactions(Transactions)

      }

      async function deleteTransaction(transactionId: any, tricountId: string) {
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