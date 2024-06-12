import { format } from 'date-fns'
import React, { useContext, useEffect, useState, useRef } from 'react';
import { formattedTime } from '../../utils/pomodoroFormat.js'

import { GlobalContext } from '../../context/GlobalContext';
import { getPomodoroTimeStorage, saveDataTimesUser } from './pomodoroTimeFunctions.js'
import TimerWorker from '../../workers/timerWorker.js?worker';

const MainClock = () => {
  const { 
    user,
    activePomodoro,
    setActivePomodoro,
    isBreack,
    setIsBreake,
    timePomodoro,
    setTimePomodoro,
    setInitialColor,
    counterCicle,
    setCounterCicle,
    isReset,
  } = useContext(GlobalContext)

  const [worker, setWorker] = useState(null);
  const localData = getPomodoroTimeStorage()

  const mutableState = useRef({ timePomodoro, isBreack, counterCicle });

  useEffect(() => {
    mutableState.current.timePomodoro = timePomodoro;
    mutableState.current.isBreack = isBreack;
  }, [timePomodoro, isBreack]);

  const restartTimer = () => {
    setTimePomodoro(localData.time)
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

  const completedNotification = (msj) => {
    if ("Notification" in window) {
      if (Notification.permission === 'granted') {
        let notificacion = new Notification(msj)
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(
          (permission) => {
            if (permission === 'granted') {
              let notificacion = new Notification(msj)
            }
          }
        )
      }
    }
  }

  const determineTimeClock = (flat=false, timerWorker=null) => {
    if (flat == false) {
      completedNotification('Es hora de Estirar las piernas, relajate un momento')
      const alertSound = new Audio('/pomstart.mp3')
      alertSound.play()
    } else {
      completedNotification('Es hora de Brillar - Descanso terminado')
      const alertSound = new Audio('/pomend.mp3')
      alertSound.play()
    }
    
    setInitialColor('#f39c12')
    // respecto al breack
    if (flat == false) {
      setIsBreake(true)
      if (mutableState.current.counterCicle >= localData.cicle) {
        setTimePomodoro(localData.pause * 4)
        mutableState.current.counterCicle = 1
        timerWorker.postMessage({ command: 'initialTime', data: localData.pause * 4 })
        setCounterCicle(1)
      } else {
        setTimePomodoro(localData.pause)
        setCounterCicle(mutableState.current.counterCicle + 1)
        mutableState.current.counterCicle += 1
      }
    } else {
      setIsBreake(false)
      restartTimer()
    }
  }

  useEffect(() => {
    if (activePomodoro) {
      startTimer()
    } else {
      if (worker) {
        stopTimer()
      }
    }
    if (isReset) {
      if (worker) {
        resetTimer(localData.time)
      }
    }
  }, [activePomodoro, isReset])
  
  useEffect(() => {
    const timerWorker = new TimerWorker();
      setWorker(timerWorker);
      console.log('el usuario aqui es:', user)
      timerWorker.postMessage({ command: 'initialTime', data: timePomodoro })
      timerWorker.onmessage = (e) => {
        if (typeof e.data === 'number') {
          setTimePomodoro(e.data);
        } else if (e.data.command === 'timeUp') {
          // Si se recibe un mensaje de que el tiempo ha llegado a cero, detener el temporizador
          setActivePomodoro(false)
          //
          if (mutableState.current.isBreack == false) {
            saveTimeCompleted()
            timerWorker.postMessage({ command: 'initialTime', data: localData.pause })
          } else {
            timerWorker.postMessage({ command: 'initialTime', data: localData.time })
            setTimePomodoro(localData.time);
          }
          determineTimeClock(mutableState.current.isBreack, timerWorker)
        }
      };

      return () => {
        timerWorker.terminate();
      };
    
  },[user])


  const startTimer = () => {
    worker.postMessage({ command: 'start' });
  };

  const stopTimer = () => {
    worker.postMessage({ command: 'stop' });
  };

  const resetTimer = (newTime) => {
    worker.postMessage({ command: 'reset', data: newTime });
  };


  return(
    <span className='header-main__time'>{formattedTime(timePomodoro)}</span>
  )
}

export default MainClock