import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseFlotaingCard from "../base/BaseFlotaingCard"
// apps
import {  SuccessContext } from '../../context/SuccessContext'
import LoadingApp from '../../apps/LoadingApp';
// servicios
import { apiUpdateTask } from '../../services/TaskServices.js'
import './ChangeStateTask.scss'


function ChangeStateTask(props) {
  const navigate = useNavigate();
  const { setLoadSuccess } = useContext(SuccessContext)
  const [ load, setLoad ] = useState(false)

  const closeFlotaing = () => props.closeFunction(false)

  const updateStateTask = async (state) => {
    console.log('actualizando');
    setLoad(true)
    await apiUpdateTask(props.task.id, {'state': state})
    closeFlotaing()
    setLoad(false)
    setLoadSuccess(true)
    navigate('/')
    setInterval(() => {
      setLoadSuccess(false)
    }, 2000);
  }

  return(
    <>
      { load ? <LoadingApp /> : null } 
      <BaseFlotaingCard>
        <h3 className="change-state__title">Selecciona el nuevo estado</h3>
        <div className="change-state">
          <a 
            href="#" 
            className="button is-info"
            onClick={() => updateStateTask('2')}>En Seleccion</a>
          <a 
            href="#" 
            className="button is-success"
            onClick={() => updateStateTask('1')}>Terminado</a>
          <a 
            href="#" 
            className="button is-primary is-light"
            onClick={() => updateStateTask('3')}>Pendiente</a>
          
          <a 
            href="#" 
            className="button has-text-warning"
            onClick={() => updateStateTask('0')}>En Proceso</a>
          
          <a 
            href="#" 
            className="button is-small" 
            onClick={closeFlotaing}>Cancelar</a>
        </div>
      </BaseFlotaingCard>
    </>
  )
}

export default ChangeStateTask