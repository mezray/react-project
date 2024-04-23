"use client"
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/context/userContext';
import { TransactionContext } from '@/context/transactionContext';
import { ErrorContext } from '@/context/errorContext';
import "../app/style.css";

function AddTransaction({ tricountId }: { tricountId: any }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { users, fetchUsers, setId } = useContext(UserContext);
  const [payerId, setPayerId] = useState('');
  const [debtorIds, setDebtorIds] = useState<string[]>([]);
  const { addTransaction } = useContext(TransactionContext);
  const { transactionMessage, setTransactionMessage } = useContext(ErrorContext);
  useEffect(() => {
    setId(tricountId);
    fetchUsers(tricountId);
  }, [tricountId]);
    
  useEffect(
    () => {
      if (users.length > 0) {
        setPayerId(users[0].id);
      }
    },
    [users]
  )


  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    addTransaction(title, Number(price), payerId, debtorIds, tricountId);
    // clear title and price
    setTitle('');
    setPrice('');
    setTransactionMessage("Transaction added successfully!")
  };

  return (
    <form className="add-cost-form" onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
      </label>
      <label>
        Payer:
        <select value={payerId} onChange={e => setPayerId(e.target.value)}>
          {users.map(user => (
            <option key={user.id} value={user.id}>
             {user.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Debtors:
        <select multiple value={debtorIds} onChange={e => setDebtorIds(Array.from(e.target.selectedOptions, option => option.value))} required>
          {users.map(user => (
            <option key={user.id} value={user.id} >
              {user.name}
            </option>
          ))}
        </select>
      </label>
      <input type="submit" value="Submit" />
      <p style={{ color: `#${Math.floor(Math.random()*16777215).toString(16)}` }}>{transactionMessage}</p>
    </form>
  );
}

export default AddTransaction;