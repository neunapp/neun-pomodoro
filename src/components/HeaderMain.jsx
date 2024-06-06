
import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
//
import MainClock from './pomodoro/MainClock.jsx'

import logoImg from '../assets/user.jpg'

import './HeaderMain.scss'


function HeaderMain() {
  const { 
    user,
  } = useContext(GlobalContext)
  // ==============================================
  // useEffect(()=> {
  //   if ((timePomodoro > 0) && (activePomodoro) ) {
  //     const intervalId = setInterval(() => {
  //       updateTimer()
  //     }, 1000)
  //     return () => clearInterval(intervalId)
  //   } else if ((timePomodoro === 0) && (activePomodoro)) {
  //     setActivePomodoro(false)
  //     if (isBreack == false) {
  //       saveTimeCompleted()
  //     }
  //     playSound()
  //   }
    
  // }, [timePomodoro, activePomodoro])

  return (
    <>
      <div className="header-main">
        <div>
          <NavLink to="/" className='header-main__title'>Pomodoro</NavLink>
          <MainClock />
        </div>
        <div className='header-main__options'>
          <NavLink to="/task" className='button is-small'>Tareas</NavLink>
          <a 
            href='https://www.youtube.com/@Neunapp/playlists' 
            target="_blank" 
            className="button is-small btn-main m-2">Cursos</a>
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