import { createContext, useContext, useState } from 'react';

export const TricountContext = createContext( { feed: [], updateFeed: () => {} } );

export const TricountContextProvider = (props: React.PropsWithChildren<{}>) => {
    const [feed, setFeed] = useState([])
  
    const updateFeed = async () => {
        // Get the token from localStorage
        const token = localStorage.getItem('token')
  
        const res = await fetch('/api/Tricounts/Tricount/TricountListing/', {
          headers: {
            // Include the token in the Authorization header
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        })
  
        const data = await res.json()
        setFeed(data)
      }

    return (
        <TricountContext.Provider value={{feed, updateFeed}}>
            {props.children}
        </TricountContext.Provider>
    )
}