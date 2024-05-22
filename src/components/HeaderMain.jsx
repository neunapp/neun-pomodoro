import React, { useContext } from 'react';

import { GlobalContext } from '../context/UserProvider';

import './HeaderMain.scss'

function HeaderMain() {

  const { user, _ } = useContext(GlobalContext)

  const cambiarTema = () => {
    console.log(getDataUser)
    console.log('cambiar temas light/dark');
  }
  
  return (
    <>
      <div className="header-main">
        <div>
          <a href="/" className='header-main__title'>Pomodoro Neun</a>
        </div>
        <div className='header-main__options'>
          <a href="/task" className='button' onClick={cambiarTema}>Tareas</a>
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