import { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';
// apps
import LoadingApp from '../../apps/LoadingApp';
// services
import { apiGetSelectedTask, apiUpdateTask } from '../../services/TaskServices.js'
// components
import CompleteTask from './CompleteTask';
import './SelectedTask.scss'


function SelectedTask(props) {

  let [showChange, setShowChange] = useState(false)
  let [selectTask, setSelectTask] = useState({'title':'...'})
  let [load, setLoad] = useState(false)

  const openCloseChangeTask = (boolValue) => {
    setShowChange(boolValue)
  }

  const retiveSelectedTask = async () => {
    setLoad(true)
    const task = await apiGetSelectedTask()
    if (task.length > 0) {
      setSelectTask(task[0])
    } else {
      setSelectTask({'title':'...'})
    }
    setLoad(false)
    console.log(task);
  }

  const updateCompleteTask = async () => {
    if (selectTask.id) {
      setLoad(true)
      const response = await apiUpdateTask(selectTask.id, {'state':'1'})
      if (response) {
        retiveSelectedTask()
      }
      openCloseChangeTask(false)
      setLoad(false)
    } 
  }

  useEffect(
    () => {
      retiveSelectedTask()
    }, [])

  return(
    <>
      { load ? <LoadingApp /> : null }
      {showChange ? (
        <CompleteTask  
          closeFunction={openCloseChangeTask}
          successFunction={updateCompleteTask}
        />
      ) : null}
      <div className="task-select">
        <a 
          className="task-select__text" 
          onClick={() => openCloseChangeTask(true)}>{selectTask.title}</a>
        <NavLink to={props.ruta} className="task-select__icon">
          {props.child}
        </NavLink>
      </div>
    </>
  )
}

export default SelectedTask