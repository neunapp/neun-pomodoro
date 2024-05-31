import { format } from 'date-fns'

import React, { useState, useContext } from 'react';
import { MdModeEdit } from "react-icons/md";
import { MdOutlineRestore } from "react-icons/md";
import { IoMdPlay } from "react-icons/io";
import { IoStop } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { BsClipboardCheckFill } from "react-icons/bs";
//
import { GlobalContext } from '../context/GlobalContext';
import { apiAddTimes } from '../services/TimesServices.js'
import { getTimeStorage, saveNewTimePomodoroStorage } from '../services/TimePomodoroData';
//
import { formattedTime } from '../utils/pomodoroFormat.js'
//
import usePomodoroCtrls from '../hooks/usePomodoroCtrls';
//
import SelectedTask from './tasks/SelectedTask'
import ChangeTimePomodoro from './ChangeTimePomodoro'
import CheckPomodoro from './CheckPomodoro';

import './Pomodoro.scss'

function Pomodoro() {
  const { 
    user,
    timePomodoro, 
    activePomodoro, 
    setActivePomodoro, 
    isBreack,
    counterCicle,
    setCounterCicle,
    initialColor,
    setInitialColor } = useContext(GlobalContext)
  
  let [isEdit, setIsEdit] = useState(false)
  let [isCheck, setIsCheck] = useState(false)
  // hook
  const {  
    restartTimer, 
    saveTimeCompleted
  } = usePomodoroCtrls()

  const iniciarCronometro = () => {
    let value = !activePomodoro
    setActivePomodoro(value)
    setInitialColor('#00cec9')
    setIsCheck(false)
  }

  const chekCiclePomodoro = () => {
    console.log('terminar ciclo?')
    setActivePomodoro(false)
    setIsCheck(true)
  }

  const finishCiclePomodoro = () => {
    
    // guardamos si es necesario
    let objPomodoro = getTimeStorage()
    // variable que representa id fecha
    const hoy = format(new Date(), 'dd-MM-yyyy')
    let date = format(new Date(), 'yyyyMMdd') + user.user_id.toString()
    let timeConsumed = 0
    if (!isBreack && activePomodoro) {
      timeConsumed = objPomodoro.time - timePomodoro
    }
    // recuperamos el tiempo consumido
    if (date != objPomodoro.date) {
      if (objPomodoro.date != null) {
        // fechas diferentes, guardar 
        let data = {'date': hoy, 'time': objPomodoro.timeday + timeConsumed, 'user': user.user_id}
        console.log('guarado datos en la nube 1', objPomodoro.time, timePomodoro, data);
        apiAddTimes(data)
      }
      
    } else {
      let data = {'date': hoy, 'time': objPomodoro.timeday + timeConsumed, 'user': user.user_id}
      console.log('guarado datos en la nube 2', objPomodoro.timeday, timePomodoro, data);
      apiAddTimes(data)
    }
    console.log('reiniciar cilo pomodoro');
    restartTimer()
    setCounterCicle(1)
    setIsCheck(false)
    saveNewTimePomodoroStorage(
      objPomodoro.time/60,
      objPomodoro.pause/60,
      objPomodoro.cicle,
      0,
      null
    )
  }

  const editTimePomodoro = () => {
    setIsEdit(true)
  }

  const closeEditTime = () => {
    setIsEdit(false)
    setIsCheck(false)
  }

  


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
            <div className="pomodoro__clock__cicle">
            { (!isBreack && activePomodoro) ?
                [...Array(counterCicle)].map((_, i) => (
                  <span key={i} className='pomodoro__clock__cicle__item'></span>
                ))
              : null
            }
            </div>
            
          </div>

          {/* <p className='pomodoro__report'>{(isBreack) ? '¡Hora de estirar las piernas!':'¡Hora de brillar!'}</p> */}
          { (isBreack) ? 
            <p className='pomodoro__report animate'>¡Hora de estirar las piernas!</p> 
            : <p className='pomodoro__report'>¡Hora de brillar! </p>
          }

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