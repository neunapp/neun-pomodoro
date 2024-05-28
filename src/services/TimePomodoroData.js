export const getTimeStorage = () => {
  const defaultTimePomodoro = 20*60
  // recuepramos objeto
  const objTimePomodoro = localStorage.getItem("objTimePomodoro")
  
  // si existe convertimos la cadena a json
  if (objTimePomodoro) {
    const timePomodoro = JSON.parse(objTimePomodoro)
    console.log('timer: ', timePomodoro)
    return timePomodoro
  } else {
    const timePomodoro = {
      time: defaultTimePomodoro,
      pause: 5*60,
      cicle: 4
    }
    return timePomodoro
  }
}

export const saveNewTimePomodoroStorage = (newTime, pause=5, cicle=4) => {
  console.log('-->', newTime, pause, cicle)
  const timePomodoro = {
    time: newTime*60,
    pause: pause*60,
    cicle: parseInt(cicle)
  }
  localStorage.setItem(
    "objTimePomodoro",
    JSON.stringify(timePomodoro)
  )
}