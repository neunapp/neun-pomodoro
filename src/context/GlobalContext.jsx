import React, { createContext, useState } from 'react';
//
import { getTimeStorage } from '../services/TimePomodoroData.js';
import { getUserStorage } from '../services/userServices.js';

// creamos un contexo global
const GlobalContext = createContext();
const initialPomodoro = getTimeStorage()

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(getUserStorage())
  // funcion inicial
  
  // setea el tiempo de concentracion del usuario
  const [timePomodoro, setTimePomodoro] = useState(initialPomodoro.time)
  const [activePomodoro, setActivePomodoro] = useState(false)
  const [isBreack, setIsBreake] = useState(false)
  const [counterCicle, setCounterCicle] = useState(1)
  const [initialColor, setInitialColor] = useState('#0652DD')


  return (
    <GlobalContext.Provider value={{ 
      user, 
      setUser, 
      timePomodoro, 
      setTimePomodoro,
      activePomodoro,
      setActivePomodoro,
      isBreack,
      setIsBreake,
      counterCicle,
      setCounterCicle,
      initialColor,
      setInitialColor
    }}>
        {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider }