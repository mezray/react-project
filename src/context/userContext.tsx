import { createContext, useContext, useState } from 'react';
import { ErrorContext } from './errorContext';


type UserContextType = {
  users: {
    name: string; id: string, email: string 
}[];
  addUser: (email: string) => Promise<boolean>;
  fetchUsers: (id: string) => Promise<void>;
  id: string;
  setId: (id: string) => void;
};

export const UserContext = createContext<UserContextType>({
  users: [],
  addUser: async (email: string) => false,
  fetchUsers: async (id: string) => { },
  id: '',
  setId: () => { }
});


export const UserContextProvider = (props: React.PropsWithChildren<{}>) => {
  const [id, setId] = useState('')
  const [users, setUsers] = useState<{ name: string; id: string; email: string }[]>([]);([])
  const { setAddUserMessage, setError } = useContext(ErrorContext);

  async function addUser(email: string) {
  const token = localStorage.getItem('token');
  const response = await fetch(`/api/Tricounts/Tricount/AddUserToTricount/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (data.user && !users.some((user: { id: string }) => user.id === data.user.id)) {
    setUsers(prevUsers => [...prevUsers, data.user]);
    setAddUserMessage('')
    return true;
  } else {
    return false;
  }
}



  async function fetchUsers(id: string) {
    if (!id) return;
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/Tricounts/Tricount/FindUser/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const allUsers = await response.json();
    setUsers(allUsers);
  }


  return (
    <UserContext.Provider value={{ users, addUser, fetchUsers, id, setId }}>
      {props.children}
    </UserContext.Provider>
  )
}