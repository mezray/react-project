"use client"
import React, { useState, useEffect } from 'react';

function AddCost({ tricountId }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [payerName, setPayerName] = useState('');
  const [users, setUsers] = useState([]);
  const [debtorNames, setDebtorNames] = useState([]);
  const [payerId, setPayerId] = useState('');
  const [debtorIds, setDebtorIds] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/finduser/${tricountId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const allUsers = await response.json();
      setUsers(allUsers);
    }

    fetchUsers();
  }, [tricountId]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const response = await fetch('/api/addcost', {
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
    const data = await response.json();
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