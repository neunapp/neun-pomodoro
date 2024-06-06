import './CompleteTask.scss'
import BaseFlotaingCard from "../base/BaseFlotaingCard";

function CompleteTask(props) {

  const closeChangeTask = () => {
    props.closeFunction(false)
  }


  return ( 
    <BaseFlotaingCard>
      <div className="change-task">
        <p className="change-task__text">¿Completaste la tarea?</p>
        <div className="change-task__ctrls">
          <button 
            className="change-task__ctrls__btn" 
            onClick={ () =>  props.successFunction('1')}>Si</button>
          <button 
            className="change-task__ctrls__btn secondary" 
            onClick={() =>  props.successFunction('0')}>En Proceso</button>
          <button 
            className="change-task__ctrls__btn red" 
            onClick={closeChangeTask}>Cancelar</button>
        </div>
      </div>
    </BaseFlotaingCard>
  );
}

export default CompleteTask;