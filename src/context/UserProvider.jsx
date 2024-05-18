import React, { createContext, useState } from 'react';

// creamos un contexo global
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState({
    'email': 'prueba@gmail.com', 
    'id':'U00008',
    'avatar': 'https://picsum.photos/id/101/200/200'
  })

  const setDataUser = (newUser) => {
    setUser(newUser)
  }


  return (
    <GlobalContext.Provider value={{ user, setDataUser }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider }