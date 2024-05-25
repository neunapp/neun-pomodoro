import React, { createContext, useState } from 'react';
//
import { getTimeStorage } from '../services/TimePomodoroData.js';

// creamos un contexo global
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState({
    'email': 'prueba@gmail.com', 
    'id':'U00008',
    'avatar': 'https://picsum.photos/id/101/200/200'
  })
  // funcion inicial
  const initialPomodoro = getTimeStorage()
  // setea el tiempo de concentracion del usuario
  const [timePomodoro, setTimePomodoro] = useState(initialPomodoro.time)
  const [activePomodoro, setActivePomodoro] = useState(false)



  const setDataUser = (newUser) => {
    setUser(newUser)
  }


  return (
    <GlobalContext.Provider value={{ 
      user, 
      setDataUser, 
      timePomodoro, 
      setTimePomodoro,
      activePomodoro,
      setActivePomodoro, 
    }}>
        {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider }