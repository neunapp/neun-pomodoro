
import './CheckPomodoro.scss'

const CheckPomodoro = (props) => {
  return(
    <div className="alert-card">
      <p className="alert-card__text">¿Cerrar Ciclo pomodoros?</p>
      <div className="alert-card__btns">
        <button className="alert-card__btn" onClick={props.okFunction}>SI</button>
        <button className="alert-card__btn secondary" onClick={props.closeFunction}>NO</button>
      </div>
    </div>
  )
}

export default CheckPomodoro