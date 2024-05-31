import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/FirebaseConfig.js';
//
import { getTimeStorage } from '../services/TimePomodoroData.js';

// creamos un contexo global
const GlobalContext = createContext();
const initialPomodoro = getTimeStorage()

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  // funcion inicial
  
  // setea el tiempo de concentracion del usuario
  const [timePomodoro, setTimePomodoro] = useState(initialPomodoro.time)
  const [activePomodoro, setActivePomodoro] = useState(false)
  const [isBreack, setIsBreake] = useState(false)
  const [counterCicle, setCounterCicle] = useState(1)
  const [initialColor, setInitialColor] = useState('#0652DD')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        let dataUser = {
          'user_id': user.uid,
          'name': user.displayName,
          'email': user.email,
          'photo': user.photoURL,
        }
        setUser(dataUser);
      } else {
        setUser(null)
      }
      
    });

    return () => unsubscribe();
  }, [])

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