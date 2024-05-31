import { format } from 'date-fns'
import { useContext, useState,} from "react"

import { apiAddTinesUser } from '../services/TimesServices.js'
import { GlobalContext } from '../context/GlobalContext';
import { getTimeStorage, saveNewTimePomodoroStorage } from '../services/TimePomodoroData';

const usePomodoroCtrls = () => {
  const { 
    user, 
    initialColor,
    setInitialColor,
    timePomodoro, 
    setTimePomodoro,
    setActivePomodoro,
    isBreack,
    setIsBreake,
    counterCicle,
    setCounterCicle } = useContext(GlobalContext)
  const [initialTime, setInitialTime] = useState(timePomodoro)
  
  

  const updateTimer = () => {
    setTimePomodoro(timePomodoro - 1)
  }

  const restartTimer = () => {
    setTimePomodoro(getTimeStorage().time)
    setActivePomodoro(false)
    setIsBreake(false)
  }

  const guardarTimeDB = () => {
    let localData = getTimeStorage()
    console.log(localData);
    // enviamos data a la BD
    const hoy = format(new Date(), 'dd-MM-yyyy');
    let data = {'date': hoy, 'time': localData.timeday, 'user': user.user_id}
    console.log('guarado datos en la nube', data);
    apiAddTinesUser(user, data)
    //
  }

  const saveTimeCompleted = (userId) => {
    // guarda en memoria local el timpo de concentracion
    console.log('--- guardar tiempo --', userId)
    let objPomodoro = getTimeStorage()
    // variable que representa id fecha
    let date = format(new Date(), 'yyyyMMdd') + userId.toString()
    if (date == objPomodoro.date) {
      console.log('--- es misma fecha --', date, objPomodoro.date)
      // se actualiza el time cocentracion local
      objPomodoro.timeday = objPomodoro.timeday + objPomodoro.time
      saveNewTimePomodoroStorage(
        objPomodoro.time/60,
        objPomodoro.pause/60,
        objPomodoro.cicle,
        objPomodoro.timeday,
        date
      )
    } else {
      console.log('--- es fecha diferente--', date, objPomodoro.date)
      //
      if (objPomodoro.date) {
        guardarTimeDB()
      }
      
      // es nueva fecha se registra nuevo tiempo
      objPomodoro.timeday = objPomodoro.time
      objPomodoro.date = date
      saveNewTimePomodoroStorage(
        objPomodoro.time/60,
        objPomodoro.pause/60,
        objPomodoro.cicle,
        objPomodoro.timeday,
        date
      )
    }
  }

  const determineTimeClock = () => {
    // si no breack, time pomodoro, else time pausa
    let localData = getTimeStorage()
    if (isBreack == false) {
      
      setIsBreake(true)
      if (counterCicle >= localData.cicle) {
        setTimePomodoro(localData.pause * 4)
        setCounterCicle(1)
      } else {
        setTimePomodoro(localData.pause)
        incrementCounterCicle()
      }
    } else {
      setIsBreake(false)
      restartTimer()
    }
  }

  const playSound = () => {
    if (isBreack == false) {
      const alertSound = new Audio('/pom01.mp3')
      alertSound.play()
    } else {
      const alertSound = new Audio('/pom02.mp3')
      alertSound.play()
    }
    setInitialColor('#f39c12')
    
    
    setTimeout(() => determineTimeClock(), 3000)
  }

  const incrementCounterCicle = () => {
    setCounterCicle(counterCicle + 1)
  }

  return { 
    timePomodoro,
    initialTime,
    setInitialTime,
    initialColor,
    setInitialColor,
    updateTimer, 
    restartTimer,
    playSound,
    saveTimeCompleted }

}

export default usePomodoroCtrls