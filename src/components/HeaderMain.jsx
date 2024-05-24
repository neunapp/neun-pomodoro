
import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { NavLink } from 'react-router-dom';
//
import { formattedTime } from '../utils/pomodoroFormat.js'

import './HeaderMain.scss'

function HeaderMain() {

  const { user, timePomodoro, setTimePomodoro, activePomodoro, setActivePomodoro } = useContext(GlobalContext)
  let [initialTime, setInitialTime] = useState(timePomodoro)

  const cambiarTema = () => {
    console.log('cambiar temas light/dark');
  }
  
  const updateTimer = () => {
    setTimePomodoro(timePomodoro - 1)
  }

  const restartTimer = () => {
    setTimePomodoro(initialTime)
    setActivePomodoro(false)
  }

  const playSound = () => {
    const alertSound = new Audio('/sond01.mp3')
    alertSound.play();
    setTimeout(() => restartTimer(), 4000)
  }

  useEffect(()=> {
    if ((timePomodoro > 0) && (activePomodoro) ) {
      const intervalId = setInterval(() => {
        updateTimer()
      }, 1000)
      return () => clearInterval(intervalId)
    } else if (timePomodoro === 0) {
      setActivePomodoro(false)
      console.log('tiempo en cero')
      playSound()
    }
  })

  return (
    <>
      <div className="header-main">
        <div>
          <NavLink to="/" className='header-main__title'>Pomodoro</NavLink>
          <span className='header-main__time'>{formattedTime(timePomodoro)}</span>
        </div>
        <div className='header-main__options'>
          <NavLink to="/task" className='button' onClick={cambiarTema}>Tareas</NavLink>
          <a className="button is-info is-small m-2">Cursos</a>
          <a href="#">
            <figure className="image is-32x32">
            <img
              className='is-rounded'
              src={user.avatar}
              alt="Placeholder image"
            />
          </figure>
          </a>
        </div>
      </div>
    </>
  )
}

export default HeaderMain