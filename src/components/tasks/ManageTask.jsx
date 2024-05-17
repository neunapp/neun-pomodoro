import { NavLink } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";
// local
import TaskCard from "./TaskCard"
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
        <a href="#" className="manage-task__filter__tag active">En proceso</a>
        <a href="#" className="manage-task__filter__tag">Pediente</a>
        <a href="#" className="manage-task__filter__tag">Terminado</a>
      </div>
      <div className="manage-task__resume">
        <p className="manage-task__resume__text">Completadas: 20</p>
        <p>Concentracion: 10 Hrs</p>
      </div>
      <div className="manage-task__body">
        {[...Array(10)].map((_, index) => (
          <TaskCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default ManageTask