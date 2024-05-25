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
      time: defaultTimePomodoro
    }
    return timePomodoro
  }
}

export const saveNewTimePomodoroStorage = (newTime) => {
  const timePomodoro = {
    time: newTime*60
  }
  localStorage.setItem(
    "objTimePomodoro",
    JSON.stringify(timePomodoro)
  )
}