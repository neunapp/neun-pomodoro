
import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { NavLink } from 'react-router-dom';
//
import { formattedTime } from '../utils/pomodoroFormat.js'
// hooks
import usePomodoroCtrls from '../hooks/usePomodoroCtrls';
import logoImg from '../assets/pomodoro.png'

import './HeaderMain.scss'

function HeaderMain() {
  const { 
    timePomodoro,
    updateTimer,
    playSound,
    saveTimeCompleted
  } = usePomodoroCtrls()

  const { 
    user,
    activePomodoro,
    setActivePomodoro,
    isBreack,} = useContext(GlobalContext)

  const cambiarTema = () => {
    console.log('cambiar temas light/dark');
  }

  useEffect(()=> {
    if ((timePomodoro > 0) && (activePomodoro) ) {
      const intervalId = setInterval(() => {
        updateTimer()
      }, 1000)
      return () => clearInterval(intervalId)
    } else if ((timePomodoro === 0) && (activePomodoro)) {
      setActivePomodoro(false)
      if (isBreack == false) {
        saveTimeCompleted()
      }
      playSound()
    }
    
  }, [timePomodoro, activePomodoro])

  return (
    <>
      <div className="header-main">
        <div>
          <NavLink to="/" className='header-main__title'>Pomodoro</NavLink>
          <span className='header-main__time'>{formattedTime(timePomodoro)}</span>
        </div>
        <div className='header-main__options'>
          <NavLink to="/task" className='button' onClick={cambiarTema}>Tareas</NavLink>
          <a href='https://www.youtube.com/@Neunapp/playlists' target="_blank" className="button is-info is-small m-2">Cursos</a>
          <NavLink to="/users/login/">
            <figure className="image is-32x32">
            { user ? <img
              className='is-rounded'
              src={user.photo}
              alt="Placeholder image"
            /> : <img
              className='is-rounded'
              src={logoImg}
              alt="Placeholder image"
            /> }
            
          </figure>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default HeaderMain