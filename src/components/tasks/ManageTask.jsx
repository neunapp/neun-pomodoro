import { NavLink } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
//
// local
import LisTask from './ListTask';
// services
// components
// styles
import './ManageTask.scss'



function ManageTask() {
  const changeStateTask = () => {

  }

  return ( 
    <div className="manage-task">
      <div className="manage-task__head">
        <h3 className="manage-task__head__text">Administrar Tareas</h3>
        <NavLink className="manage-task__head__icon" to={'/task/add'}>
          <FaCirclePlus style={{ fontSize: 40, marginBottom: -5, color: '#9980FA' }}/>
        </NavLink>
      </div>
      <div className="manage-task__filter">
        <NavLink to="/task?paramState=0" className="manage-task__filter__tag active">En proceso</NavLink>
        <NavLink to="/task?paramState=3" className="manage-task__filter__tag">Pediente</NavLink>
        <NavLink to="/task?paramState=1" className="manage-task__filter__tag">Terminado</NavLink>
      </div>
      <div className="manage-task__resume">
        <p className="manage-task__resume__text">Tareas Encontradas</p>
        {/* <p>Concentracion: 10 Hrs</p> */}
      </div>
      <div className="manage-task__body">
        <LisTask />
      </div>
    </div>
  )
}

export default ManageTask