
import React, { useContext } from 'react';
import { GlobalContext } from '../context/UserProvider';
import { NavLink } from 'react-router-dom';

import './HeaderMain.scss'

function HeaderMain() {

  const { user } = useContext(GlobalContext)

  const cambiarTema = () => {
    console.log('cambiar temas light/dark');
  }
  
  return (
    <>
      <div className="header-main">
        <div>
          <a href="/" className='header-main__title'>Pomodoro</a>
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