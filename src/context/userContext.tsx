import { createContext, useContext, useState } from 'react';

export const UserContext = createContext({
  users: [],
  addUser: () => { },
  fetchUsers: () => { },
  id: '',
  setId: () => { }
});

export const UserContextProvider = (props) => {
  const [id, setId] = useState('')
  const [users, setUsers] = useState([])

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

    if (data.user && !users.some(user => user.id === data.user.id)) {
      setUsers(prevUsers => [...prevUsers, data.user]);
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