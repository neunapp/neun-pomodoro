
import './SuccessApp.scss'

const SuccessApp = ({texto = 'Guarado'}) => {
  return (
    <div className="success-app">
      <p className="success-app__text">{texto}</p>
    </div>
  )
}

SuccessApp.texto = 'Guardado!'
SuccessApp.time = 1000

export default SuccessApp