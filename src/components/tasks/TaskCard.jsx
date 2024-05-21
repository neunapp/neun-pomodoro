import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ChangeStateTask from './ChangeStateTask';
import { CiMenuKebab } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import './TaskCard.scss'

function TaskCard(props) {

  let [showChangeState, setShowChangeState] = useState(false)
  const openCloseFlotaing = (value) => setShowChangeState(value)
  return ( 
    <>
      { 
        showChangeState ? <ChangeStateTask closeFunction={openCloseFlotaing} /> : null 
      }
      <div className="task-card">
        <div className="task-card__head">
          <div className="task-card__head__left">
            <a href="#" className="task-card__head__left__tag">{ props.task.size }</a>
            <a href="#" className="task-card__head__left__tag grey">{ props.task.minutes } min</a>
          </div>
          <a href="#" className="task-card__head__icon">
            <CiMenuKebab />
          </a>
          
        </div>
        <div className="task-card__body">
          <h3 className="task-card__body__title">{ props.task.title }</h3>
          <p className="task-card__body__text">{ props.task.description }</p>
          <p className="task-card__body__date">Caduca: { props.task.date_end }</p>
        </div>
        <div className="task-card__footer">
          <a 
            href="#" 
            className='task-card__footer__tag'      
            onClick={() => openCloseFlotaing(true)}>
              { props.task.state }
          </a>
          <NavLink to={ '/task/update/2' } className='task-card__footer__icon'>
            <FaRegEdit style={{ fontSize: 25, marginBottom: -5 }}/>
            </NavLink>
        </div>
      </div>
    </>
  );
}

export default TaskCard;