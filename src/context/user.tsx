import { createContext, useContext, useState } from 'react';

export const UserContext = createContext({ users: [], addUser: () => {}, fetchUsers: () => {}, transactions: [], id: '', setId: () => {}
   });

export const UserContextProvider = (props) => {
    const [id, setId] = useState('')
    const [users, setUsers] = useState([])
    const [transactions, setTransactions] = useState([])

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

        setUsers([...users, data.user])
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
        <UserContext.Provider value={{users, addUser, fetchUsers, transactions, id, setId }}>
            {props.children}
        </UserContext.Provider>
    )
}