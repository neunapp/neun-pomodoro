import './ProgressBarManual.scss'

const ProgressBarManualApp = (props) => {

  const handleChange = (event) => {
    props.stateObj.setValue(parseFloat(event.target.value))
  }

  return(
    <div className="progress-bar">
      <label className="progress-bar__text">{props.text}</label>
      <div className="progress-bar__ctrls">
        <input 
          type="range" 
          min={props.min}
          max={props.max}
          value={props.stateObj.value}
          onChange={handleChange}
          className="progress-bar__ctrls__range" />
        <p className='progress-bar__ctrls__lbl'>{ props.stateObj.value }</p>
      </div>
      
    </div>
  )
}

export default ProgressBarManualApp
