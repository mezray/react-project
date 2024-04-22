import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react'; 
import { UserContext } from '@/context/user';

function AddUserToTricount({ tricountId }: { tricountId: any }) {
  const [email, setEmail] = useState('');
  const { users, addUser, setId } = useContext(UserContext);
  useEffect(() => {
    setId(tricountId)
  }, [tricountId])
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    await addUser(email);
    setEmail('');
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUserToTricount;