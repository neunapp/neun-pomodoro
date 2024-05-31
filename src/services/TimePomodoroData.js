
export const getTimeStorage = () => {
  const defaultTimePomodoro = 0.2*60
  const defaultPausePomodoro = 0.15*60
  // recuepramos objeto
  const objTimePomodoro = localStorage.getItem("objTimePomodoro")
  
  // si existe convertimos la cadena a json
  if (objTimePomodoro) {
    const timePomodoro = JSON.parse(objTimePomodoro)
    console.log('-timer-: ', timePomodoro)
    return timePomodoro
  } else {
    const timePomodoro = {
      time: defaultTimePomodoro,
      pause: defaultPausePomodoro,
      cicle: 4,
      date: null,
      timeday: 0
    }
    return timePomodoro
  }
}

export const saveNewTimePomodoroStorage = (newTime, pause=5, cicle=4, timeday=0, idDate=null) => {
  console.log('-->', newTime, pause, cicle)
  const timePomodoro = {
    time: newTime*60,
    pause: pause*60,
    cicle: parseInt(cicle),
    timeday: timeday,
    date: idDate,
  }
  localStorage.setItem(
    "objTimePomodoro",
    JSON.stringify(timePomodoro)
  )
}