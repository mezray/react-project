"use client"
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/context/user';
import { TransactionContext } from '@/context/transaction';

function AddCost({ tricountId }: { tricountId: any }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { users, fetchUsers, setId } = useContext(UserContext);
  const [payerId, setPayerId] = useState('');
  const [debtorIds, setDebtorIds] = useState([]);
  const { addTransaction } = useContext(TransactionContext);
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
    console.log(title, price, payerId, debtorIds, tricountId);
    addTransaction(title, price, payerId, debtorIds, tricountId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
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
        <select multiple value={debtorIds} onChange={e => setDebtorIds(Array.from(e.target.selectedOptions, option => option.value))}>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default AddCost;