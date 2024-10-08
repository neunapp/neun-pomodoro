import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/FirebaseConfig.js';
//
import { getPomodoroTimeStorage } from '../components/pomodoro/pomodoroTimeFunctions.js'

// creamos un contexo global
const GlobalContext = createContext();
const initialPomodoro = getPomodoroTimeStorage()

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  // funcion inicial
  
  // setea el tiempo de concentracion del usuario
  const [loadUser, setLoadUser] = useState(false)
  const [timePomodoro, setTimePomodoro] = useState(initialPomodoro.time)
  const [activePomodoro, setActivePomodoro] = useState(false)
  const [isBreack, setIsBreake] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [counterCicle, setCounterCicle] = useState(1)
  const [initialColor, setInitialColor] = useState('#0652DD')

  useEffect(() => {
    setLoadUser(true)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        let dataUser = {
          'user_id': user.uid,
          'name': user.displayName,
          'email': user.email,
          'photo': user.photoURL,
        }
        setUser(dataUser);
        setLoadUser(false)
      } else {
        setUser(null)
        setLoadUser(false)
      }
      
    });

    return () => unsubscribe();
  }, [])

  return (
    <GlobalContext.Provider value={{ 
      user, 
      setUser, 
      loadUser,
      timePomodoro, 
      setTimePomodoro,
      activePomodoro,
      setActivePomodoro,
      isBreack,
      setIsBreake,
      counterCicle,
      setCounterCicle,
      initialColor,
      setInitialColor,
      isReset,
      setIsReset
    }}>
        {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider }