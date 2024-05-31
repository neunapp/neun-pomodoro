import { useContext, useState } from "react";
import { saveNewTimePomodoroStorage } from "../services/TimePomodoroData"
import BaseFlotaingCard from "./base/BaseFlotaingCard"
import ProgressBarManualApp from '../apps/ProgressBarManualApp'

import { GlobalContext } from '../context/GlobalContext';
import { getTimeStorage } from '../services/TimePomodoroData'

import './ChangeTimePomodoro.scss'

const ChangeTimePomodoro = ({closeFuntion,}) => {
  const { 
    setTimePomodoro, 
    timePomodoro,
  } = useContext(GlobalContext)
  const listTimes = [0.2,5,10,15,20,25,30,35,40,45,50,55,60]
  //
  const [pauseValue, setPauseValue] = useState(getTimeStorage().pause/60)
  const [cicleValue, setCicleValue] = useState(getTimeStorage().cicle)
  const [newTimePomodoroValue, setNewTimePomodoroValue] = useState(timePomodoro/60)


  const selectedTime = (value) => {
    
    setNewTimePomodoroValue(value)
  }

  const saveObjPomodoro = () => {
    saveNewTimePomodoroStorage(newTimePomodoroValue, pauseValue, cicleValue)
    setTimePomodoro(newTimePomodoroValue*60)
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
            min={0.1}
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