import { format } from 'date-fns'
import { useContext, useState,} from "react"

import { getPomodoroTimeStorage } from '../components/pomodoroTimeFunctions.js'
import { GlobalContext } from '../context/GlobalContext';
import { saveDataTimesUser } from '../components/pomodoroTimeFunctions.js';

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
    setTimePomodoro(getPomodoroTimeStorage().time)
    setActivePomodoro(false)
    setIsBreake(false)
  }

  const saveTimeCompleted = () => {
    // guarda en memoria local el timpo de concentracion
    let objPomodoro = getPomodoroTimeStorage()
    // variable que representa id fecha
    let timeObj = {
      'date': format(new Date(), 'yyyy-MM-dd'),
      'time':objPomodoro.timeday + objPomodoro.time
    }
    saveDataTimesUser(user, timeObj, false)
  }

  const determineTimeClock = () => {
    // si no breack, time pomodoro, else time pausa
    let localData = getPomodoroTimeStorage()
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
      const alertSound = new Audio('/pomstart.mp3')
      alertSound.play()
    } else {
      const alertSound = new Audio('/pomend.mp3')
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