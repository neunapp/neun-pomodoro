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

export const setNewTimePomodoro = ({
  newTimePomodoroValue=25*60, // en segundos  = t * 60
  pauseValue=5*60, // en segundos  = t * 60
  cicleValue=4, 
  timeday=0, // en segundos  = t * 60
  date=String(format(new Date(), 'yyyy-MM-dd')),
  isUser=true} = {}
) => { // Asegurar que la fecha se interprete como UTC    
  let newData = {
    'time': newTimePomodoroValue,
    'pause': pauseValue,
    'cicle': cicleValue,
    'timeday': timeday,
    'date': date,
    'isUser': isUser, 
  }
  // verificamos si es stop
  localStorage.setItem(
    "objTimePomodoro",
    JSON.stringify(newData)
  )
  return newData
}

export const saveDataTimesUser = async (currentUser, timeObj, pomodoroObj, stopCiclo) => {
  // normalizamos los datos
  pomodoroObj.date = String(pomodoroObj.date)
  timeObj.date = String(timeObj.date)
  if (pomodoroObj.date == timeObj.date) {
    // es la misma fecha, se acumula el tiempo
    let newData = setNewTimePomodoro({
      newTimePomodoroValue:pomodoroObj.time, 
      pauseValue:pomodoroObj.pause, 
      cicle:pomodoroObj.cicle,
      timeday:pomodoroObj.timeday + timeObj.time,
      date:pomodoroObj.date,
      isUser:currentUser ? true : false
    })
    //
    // verificamos si es stop
    if (stopCiclo) {
      // cerrar ciclo y guardar datos
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
    // es otro dia, guardamos dia anterior
    let lastDataTime = {
      'date': pomodoroObj.date,
      'time': pomodoroObj.timeday,
      'user': currentUser.user_id,
    }
    
    await apiAddTimesUser(currentUser, lastDataTime)
    // es otro dia, acumulamos dia actual
    let newData = setNewTimePomodoro({
      newTimePomodoroValue:pomodoroObj.time, 
      pauseValue:pomodoroObj.pause, 
      cicle:pomodoroObj.cicle,
      timeday:timeObj.time,
      date:timeObj.date,
      isUser:currentUser ? true : false
    })

    if (stopCiclo) {
      let dataTime = {
        'date': timeObj.date,
        'time': timeObj.time,
        'user': currentUser.user_id,
      }
      await apiAddTimesUser(currentUser, dataTime)
      restartDataTime()
    }
  }
}