import { useContext, useState } from "react";
import BaseFlotaingCard from "../base/BaseFlotaingCard"
import ProgressBarManualApp from '../../apps/ProgressBarManualApp'

import { GlobalContext } from '../../context/GlobalContext';
import { getPomodoroTimeStorage, setNewTimePomodoro } from './pomodoroTimeFunctions.js'

import './ChangeTimePomodoro.scss'

const ChangeTimePomodoro = ({closeFuntion,}) => {
  const  pomodoroTimeStorage = getPomodoroTimeStorage()
  const { 
    setTimePomodoro,
  } = useContext(GlobalContext)
  const listTimes = [1,5,10,15,20,25,30,35,40,45,50,55,60]
  //
  const [pauseValue, setPauseValue] = useState(pomodoroTimeStorage.pause/60)
  const [cicleValue, setCicleValue] = useState(pomodoroTimeStorage.cicle)
  const [newTimePomodoroValue, setNewTimePomodoroValue] = useState(pomodoroTimeStorage.time/60)


  const selectedTime = (value) => {
    
    setNewTimePomodoroValue(value)
  }

  const saveObjPomodoro = () => {
    // validar si reiniciaron en descaso o en concentracion
    
    setNewTimePomodoro({
      newTimePomodoroValue:newTimePomodoroValue*60, 
      pauseValue:pauseValue*60, 
      cicleValue:cicleValue, 
      timeday:pomodoroTimeStorage.timeday
    })
    setTimePomodoro(newTimePomodoroValue*60)
    window.location.reload();
    closeFuntion()
  }

  return(
    <BaseFlotaingCard>
      <div className="card-times">
        { listTimes.map(
          (time, index) => (
            <a href="#" key={index} onClick={ () => selectedTime(time) }  className="card-times__item">{time}</a>
          )
        ) }
        <a href="#" className="card-times__item selected"> {newTimePomodoroValue} </a>
      </div>
      <div className="card-times__ctrl">
        <div className="card-times__ctrl__item">
          <ProgressBarManualApp 
            min={1}
            text="Descanso:"
            stateObj={{'value': pauseValue, 'setValue': setPauseValue}}
            max="15"
            classStyle="progress is-primary"
          />
        </div>
        <div className="card-times__ctrl__item">
          <ProgressBarManualApp 
            text="Ciclos:"
            min={1}
            stateObj={{'value': cicleValue, 'setValue': setCicleValue}}
            max={10}
            classStyle="progress is-info"
          />
        </div>
      </div>
      <div className="card-times__footer">
          <button className="button is-dark m-1" onClick={closeFuntion}>Cancelar</button>
          <button className="button is-black m-1" onClick={saveObjPomodoro}>Guardar</button>
      </div>
    </BaseFlotaingCard>
  )
}

export default ChangeTimePomodoro