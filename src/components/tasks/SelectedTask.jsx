import { format } from 'date-fns';
import { useState, useEffect, useContext } from 'react';

import { NavLink } from 'react-router-dom';
// apps
import LoadingApp from '../../apps/LoadingApp';
//
import { GlobalContext } from '../../context/GlobalContext';
// services
import { apiGetSelectedTaskUser, apiUpdateTasksUser } from '../../services/TaskServices.js'
// components
import CompleteTask from './CompleteTask';
import './SelectedTask.scss'


function SelectedTask(props) {
  const { user } = useContext(GlobalContext)
  let [showChange, setShowChange] = useState(false)
  let [selectTask, setSelectTask] = useState({'title':'...'})
  let [load, setLoad] = useState(false)

  const openCloseChangeTask = (boolValue) => {
    setShowChange(boolValue)
  }

  const retiveSelectedTask = async () => {
    setLoad(true)
    const task = await apiGetSelectedTaskUser(user)
    if (task.length > 0) {
      setSelectTask(task[0])
    } else {
      setSelectTask({'title':'...'})
    }
    setLoad(false)
  }

  const updateCompleteTask = async (value) => {
    // value = estado al que se actualizara
    if (selectTask.id) {
      const ahora = format(new Date(), 'yyyy-MM-dd')
      setLoad(true)
      const response = await apiUpdateTasksUser(user, selectTask.id, {'state':value, 'date_update': ahora})
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