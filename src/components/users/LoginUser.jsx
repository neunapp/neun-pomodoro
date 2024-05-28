
import logoPomodoro from '../../assets/pomodoro.png'
import './LoginUser.scss'

const LoginUser = () => {
  return (
    <div className="login-card">
      <h3 className="login-card__title">Acceder con Google</h3>
      <div className="login-card__body">
        <img src={logoPomodoro} alt="logo google" className="login-card__body__img" />
        <button className="login-card__body__btn">Ingresar con Google</button>
      </div>
    </div>
  )
}

export default LoginUser