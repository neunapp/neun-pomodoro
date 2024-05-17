import './TaskCard.scss'
import { useState } from 'react';
import ChangeStateTask from './ChangeStateTask';
import { CiMenuKebab } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";

function TaskCard() {

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
            <a href="#" className="task-card__head__left__tag">S</a>
            <a href="#" className="task-card__head__left__tag grey">130 min</a>
          </div>
          <a href="#" className="task-card__head__icon">
            <CiMenuKebab />
          </a>
          
        </div>
        <div className="task-card__body">
          <h3 className="task-card__body__title">Diseñar Card Producto</h3>
          <p className="task-card__body__text">completar el diseño del card producto en css para prouecto vuejs</p>
          <p className="task-card__body__date">Caduca: 12 ene 2024</p>
        </div>
        <div className="task-card__footer">
          <a href="#" className='task-card__footer__tag' onClick={() => openCloseFlotaing(true)}>En proceso</a>
          <a href="#" className='task-card__footer__icon'>
            <FaRegEdit style={{ fontSize: 25, marginBottom: -5 }}/>
            </a>
        </div>
      </div>
    </>
  );
}

export default TaskCard;