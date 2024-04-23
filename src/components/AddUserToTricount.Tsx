import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react'; 
import { UserContext } from '@/context/userContext';
import { ErrorContext } from '@/context/errorContext';

function AddUserToTricount({ tricountId }: { tricountId: any }) {
  const [email, setEmail] = useState('');
  const { users, addUser, setId } = useContext(UserContext);
  const { errorMessage, setError } = useContext(ErrorContext);
  useEffect(() => {
    setId(tricountId)
  }, [tricountId])
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
  event.preventDefault();
  const message = await addUser(email);
  if (!message)  {
    setError("User not found with this email");
    return;
  }else{
  setError('User added successfully');
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
      {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </form>
  );
}

export default AddUserToTricount;