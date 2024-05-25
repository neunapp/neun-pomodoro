import { useContext } from "react";
import { saveNewTimePomodoroStorage } from "../services/TimePomodoroData"
import BaseFlotaingCard from "./base/BaseFlotaingCard"

import { GlobalContext } from '../context/GlobalContext';

import './ChangeTimePomodoro.scss'

const ChangeTimePomodoro = ({closeFuntion,}) => {
  const { setTimePomodoro } = useContext(GlobalContext)
  const listTimes = [
    5,
    10,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    50,
    55,
    60
  ]

  const selectedTime = (value) => {
    saveNewTimePomodoroStorage(value)
    setTimePomodoro(value*60)
    closeFuntion()
  }

  return(
    <BaseFlotaingCard>
      <div className="card-times">
        { listTimes.map(
          (time) => (
            <a href="#" onClick={ () => selectedTime(time) }  className="card-times__item">{time}</a>
          )
        ) }
        
      </div>
    </BaseFlotaingCard>
  )
}

export default ChangeTimePomodoro