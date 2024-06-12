import { format } from 'date-fns';
//
import { apiAddTimesUser } from '../../services/TimesServices.js'


export const getPomodoroTimeStorage = () => {
  const defaultTimePomodoro = 25*60
  const defaultPausePomodoro = 5*60
  // recuepramos objeto
  const objTimePomodoro = localStorage.getItem("objTimePomodoro")
  
  // si existe convertimos la cadena a json
  if (objTimePomodoro) {
    const timePomodoro = JSON.parse(objTimePomodoro)
    return timePomodoro
  } else {
    const timePomodoro = {
      'time': defaultTimePomodoro,
      'pause': defaultPausePomodoro,
      'cicle': 4,
      'date': format(new Date(), 'yyyy-MM-dd'),
      'timeday': 0,
      'isUser': false, 
    }
    localStorage.setItem(
      "objTimePomodoro",
      JSON.stringify(timePomodoro)
    )
    return timePomodoro
  }
}

const restartDataTime = () => {
  const pomodoroObj = getPomodoroTimeStorage()
  let newData = {
    'time': pomodoroObj.time,
    'pause': pomodoroObj.pause,
    'cicle': pomodoroObj.cicle,
    'date': String(format(new Date(), 'yyyy-MM-dd')),
    'timeday': 0,
    'isUser': false, 
  }
  // verificamos si es stop
  localStorage.setItem(
    "objTimePomodoro",
    JSON.stringify(newData)
  )
}

export const setNewTimePomodoro = (newTimePomodoroValue, pauseValue, cicleValue, timeday=0) => {
  let newData = {
    'time': newTimePomodoroValue*60,
    'pause': pauseValue*60,
    'cicle': cicleValue,
    'date': String(format(new Date(), 'yyyy-MM-dd')),
    'timeday': timeday,
    'isUser': false, 
  }
  // verificamos si es stop
  localStorage.setItem(
    "objTimePomodoro",
    JSON.stringify(newData)
  )
}

export const saveDataTimesUser = async (currentUser, timeObj, stopCiclo) => {
  const pomodoroObj = getPomodoroTimeStorage()
  // normalizamos los datos
  pomodoroObj.date = String(pomodoroObj.date)
  timeObj.date = String(timeObj.date)
  if (pomodoroObj.date == timeObj.date) {
    // es la misma fecha, se acumula el tiempo
    let newData = {
      'time': pomodoroObj.time,
      'pause': pomodoroObj.pause,
      'cicle': pomodoroObj.cicle,
      'date': pomodoroObj.date,
      'timeday': pomodoroObj.timeday + timeObj.time,
      'isUser': currentUser ? true : false, 
    }
    // verificamos si es stop
    localStorage.setItem(
      "objTimePomodoro",
      JSON.stringify(newData)
    )
    if (stopCiclo) {
      let dataTime = {
        'date': timeObj.date,
        'time': newData.timeday,
        'user': currentUser.user_id,
      }
      await apiAddTimesUser(currentUser, dataTime)
      // reiniciamos timeday pomodoro
      restartDataTime()
    }
  } else {
    
    let dataTime = {
      'date': pomodoroObj.date,
      'time': pomodoroObj.timeday,
      'user': currentUser.user_id,
    }
    
    await apiAddTimesUser(currentUser, dataTime)
    if (stopCiclo) {
      let dataTime = {
        'date': timeObj.date,
        'time': timeObj.time,
        'user': currentUser.user_id,
      }
      await apiAddTimesUser(currentUser, dataTime)
    }
    restartDataTime()
  }
}