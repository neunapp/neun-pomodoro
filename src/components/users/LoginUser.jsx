import { 
  GoogleAuthProvider, 
  getAuth, 
  signInWithRedirect, 
  getRedirectResult  
} from "firebase/auth";
//
import App from '../../services/FirebaseConfig.js'
import { apiAddUsers } from "../../services/userServices.js";

import { useEffect, useContext } from "react";
import { GlobalContext } from '../../context/GlobalContext.jsx';

import logoPomodoro from '../../assets/pomodoro.png'
import './LoginUser.scss'

const LoginUser = () => {
  const { 
    user,
    setUser } = useContext(GlobalContext)

  const provider = new GoogleAuthProvider();
  const auth = getAuth(App)
  auth.languageCode = 'es'


  const loginGoogle = async () => {
    
    console.log(auth)
    await signInWithRedirect(auth, provider)
  }

  const getUsuario = async () => {
    await getRedirectResult(auth)
      .then((result) => {
        const usuario = {
          'user_id': result.user.uid,
          'name': result.user.displayName,
          'email': result.user.email,
          'photo': result.user.photoURL,
        
        }
        setUser(usuario)
        if (result) {
          localStorage.setItem('userPomodoro', JSON.stringify(usuario))
          apiAddUsers(result.user)
        }
      }).catch((error) => {
        console.log('***********', error)
        // ...
      });
  }
  
  useEffect(() => {
    getUsuario()
  }, [user])

  return (
    <div className="login-card">
      <h3 className="login-card__title">Acceder con Google</h3>
      <div className="login-card__body">
        <img src={logoPomodoro} alt="logo google" className="login-card__body__img" />
        <button className="login-card__body__btn" onClick={loginGoogle}>Ingresar con Google</button>
      </div>
    </div>
  )
}

export default LoginUser