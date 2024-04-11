import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function AddUserToTricount({ tricountId }: { tricountId: any }) {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const response = await fetch(`/api/Tricounts/Tricount/AddUserToTricount/${tricountId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUserToTricount;