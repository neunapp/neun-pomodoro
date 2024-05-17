import './ChangeStateTask.scss'
import BaseFlotaingCard from "../base/BaseFlotaingCard"

function ChangeStateTask(props) {
  const closeFlotaing = () => props.closeFunction(false)

  return(
    <>
      <BaseFlotaingCard>
        <h3 className="change-state__title">Selecciona el nuevo estado</h3>
        <div className="change-state">
          <a href="#" className="button is-primary is-light">Pendiente</a>
          <a href="#" className="button is-info">En Proceso</a>
          <a href="#" className="button is-success">Terminado</a>
          <a href="#" className="button is-small" onClick={closeFlotaing}>Cancelar</a>
        </div>
      </BaseFlotaingCard>
    </>
  )
}

export default ChangeStateTask