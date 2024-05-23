import React, { useEffect, useState } from 'react';
import { MdModeEdit } from "react-icons/md";
import { MdOutlineRestore } from "react-icons/md";
import { IoMdPlay } from "react-icons/io";
import { IoStop } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
//
import SelectedTask from './tasks/SelectedTask';

import './Pomodoro.scss'

function Pomodoro() {
  let [time, setTime] = useState(20)
  let [seconds, setSeconds] = useState(50)
  let [isActive, setIsActive] = useState(false)

  const iniciarCronometro = () => {
    let value = !isActive
    setIsActive(value)
  }

  const restartTimer = () => {
    setSeconds(59)
    setIsActive(false)
  }


  useEffect(()=> {
    let intervalId;
    if ((seconds > 0)&&(isActive)) {
      console.log('valor de seconds =', seconds);
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
    } else {
      console.log('seconds == 0');
      clearInterval(intervalId);
    }
    
    return () => clearInterval(intervalId);
  })


  return (
    <>
      <div className="pomodoro">
        <div className="pomodoro__body">
          <SelectedTask 
            tarea="Aqui Tarea seleccionada" 
            ruta="/task"
            child={<CiEdit style={{ fontSize: 30, marginBottom: -5 }}/>}
          />
          <div className="pomodoro__clock">
            <p className="pomodoro__clock__item">
              <span className="pomodoro__clock__time">{ time }</span>
              <span className="pomodoro__clock__time">:</span>
              <span className="pomodoro__clock__time">{seconds}</span>
            </p>
          </div>
          <div className="pomodoro__ctrls">
            <button className="pomodoro__ctrls__btn" onClick={restartTimer}>
              <MdOutlineRestore />
            </button>
            <button className="pomodoro__ctrls__btn">
              <MdModeEdit />
            </button>
          </div>
          <button className="pomodoro__ctrls__btn play" onClick={iniciarCronometro}>
            {
              isActive ? <IoStop style={{ fontSize: 40, }}/> : <IoMdPlay style={{ fontSize: 40, }}/>
            }
          </button>
        </div>
      </div>
    </>
  )

}

export default Pomodoro