import React, { useEffect, useState, useContext } from 'react';
import { MdModeEdit } from "react-icons/md";
import { MdOutlineRestore } from "react-icons/md";
import { IoMdPlay } from "react-icons/io";
import { IoStop } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { BsClipboardCheckFill } from "react-icons/bs";
//
import { GlobalContext } from '../context/GlobalContext';
import { getTimeStorage } from '../services/TimePomodoroData';
//
import { formattedTime } from '../utils/pomodoroFormat.js'
//
import SelectedTask from './tasks/SelectedTask'
import ChangeTimePomodoro from './ChangeTimePomodoro'
import CheckPomodoro from './CheckPomodoro';

import './Pomodoro.scss'

function Pomodoro() {
  const { timePomodoro, setTimePomodoro, activePomodoro, setActivePomodoro } = useContext(GlobalContext)
  let [initialColor, setInitialColor] = useState('#0652DD')
  let [isEdit, setIsEdit] = useState(false)
  let [isCheck, setIsCheck] = useState(false)

  const updateTimer = () => {
    setTimePomodoro(timePomodoro - 1)
  }

  const iniciarCronometro = () => {
    let value = !activePomodoro
    setActivePomodoro(value)
    setInitialColor('#00cec9')
    setIsCheck(false)
  }

  const restartTimer = () => {
    setTimePomodoro(getTimeStorage().time)
    setActivePomodoro(false)
  }

  const playSound = () => {
    setInitialColor('#f39c12')
    const alertSound = new Audio('/sond01.mp3')
    alertSound.play();
    setTimeout(() => setTimePomodoro(getTimeStorage().pause), 4000)
  }

  const chekCiclePomodoro = () => {
    console.log('terminar ciclo?')
    setIsCheck(true)
  }

  const editTimePomodoro = () => {
    setIsEdit(true)
  }

  const closeEditTime = () => {
    setIsEdit(false)
    setIsCheck(false)
  }

  const finishCiclePomodoro = () => {
    console.log('reiniciar cilo pomodoro');
    setIsCheck(false)
  }

  useEffect(()=> {
    if ((timePomodoro > 0) && (activePomodoro) ) {
      const intervalId = setInterval(() => {
        updateTimer()
      }, 1000)
      return () => clearInterval(intervalId)
    } else if (timePomodoro === 0) {
      setActivePomodoro(false)
      console.log('tiempo en cero')
      playSound()
    }
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
          <div className="pomodoro__clock" style={{boxShadow: `0px 0px 10px 5px ${initialColor}`}}>
            <p className="pomodoro__clock__item">
              <span className="pomodoro__clock__time">{ formattedTime(timePomodoro) }</span>
            </p>
          </div>
          <div className="pomodoro__ctrls">
            { isCheck ? <CheckPomodoro  closeFunction={() => setIsCheck(false)} okFunction={finishCiclePomodoro} /> : null}
            <button className="pomodoro__ctrls__btn" onClick={restartTimer}>
              <MdOutlineRestore />
            </button>
            
            <button 
              className="pomodoro__ctrls__btn"
              onClick={editTimePomodoro}>
                <MdModeEdit />
              
            </button>
            <button 
              className="pomodoro__ctrls__btn" 
              onClick={chekCiclePomodoro}>
              <BsClipboardCheckFill style={{ fontSize: 20, }}/>
            </button>
            
          </div>
          <button className="pomodoro__ctrls__btn play" onClick={iniciarCronometro}>
            {
              activePomodoro ? <IoStop style={{ fontSize: 40, }}/> : <IoMdPlay style={{ fontSize: 40, }}/>
            }
          </button>
        </div>
      </div>
      { isEdit ? <ChangeTimePomodoro closeFuntion={closeEditTime} /> : null }
      
    </>
  )

}

export default Pomodoro