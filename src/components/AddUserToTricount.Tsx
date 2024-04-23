import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react'; 
import { UserContext } from '@/context/userContext';
import { ErrorContext } from '@/context/errorContext';

function AddUserToTricount({ tricountId }: { tricountId: any }) {
  const [email, setEmail] = useState('');
  const { users, addUser, setId } = useContext(UserContext);
  const { addUserMessage, setAddUserMessage } = useContext(ErrorContext);
  useEffect(() => {
    setId(tricountId)
  }, [tricountId])
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
  event.preventDefault();
  const message = await addUser(email);
  if (!message)  {
    setAddUserMessage("User already in the tricount or wrong email");
    return;
  }else{
    setAddUserMessage('User added successfully');
  setEmail('');
  }
}

  return (
    <form className="add-user-form"  onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <button type="submit">Add User</button>
      <div>
      <p style={{ color: `#${Math.floor(Math.random()*16777215).toString(16)}` }}>{addUserMessage}</p>
      </div>
    </form>
  );
}

export default AddUserToTricount;