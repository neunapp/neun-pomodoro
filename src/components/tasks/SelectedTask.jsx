import { useState } from 'react';

import './SelectedTask.scss'
import CompleteTask from './CompleteTask';
import { NavLink } from 'react-router-dom';



function SelectedTask(props) {

  let [showChange, setShowChange] = useState(false)

  const openCloseChangeTask = (boolValue) => {
    setShowChange(boolValue)
  }


  return(
    <>
      {showChange ? <CompleteTask  closeFunction={openCloseChangeTask} /> : null}
      <div className="task-select">
        <a 
          className="task-select__text" 
          onClick={() => openCloseChangeTask(true)}>{props.tarea}</a>
        <NavLink to={props.ruta} className="task-select__icon">
          {props.child}
        </NavLink>
      </div>
    </>
  )
}

export default SelectedTask