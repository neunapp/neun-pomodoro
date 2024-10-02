import { 
  GoogleAuthProvider, 
  getAuth, 
  signInWithPopup, 
  getRedirectResult,
  setPersistence, 
  browserLocalPersistence
} from "firebase/auth";
//
import App from '../../services/FirebaseConfig.js'
import { apiAddUsers } from "../../services/userServices.js";

import { useEffect, useContext, useState } from "react";
import { GlobalContext } from '../../context/GlobalContext.jsx';
import LoadingApp from '../../apps/LoadingApp';

import logoPomodoro from '../../assets/pomodoro.png'
import './LoginUser.scss'

const LoginUser = () => {
  const { 
    user,
    setUser } = useContext(GlobalContext)
  const [load, setLoad] = useState(false) 

  const provider = new GoogleAuthProvider();
  const auth = getAuth(App)
  auth.languageCode = 'es'


  const loginGoogle = async () => {
    setLoad(true)
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, provider)
        .then((result) => {
          
          if (result) {
            const usuario = {
              'user_id': result.user.uid,
              'name': result.user.displayName,
              'email': result.user.email,
              'photo': result.user.photoURL,
            }
            setUser(usuario)
            apiAddUsers(result.user)
            // estado de usuario activo
            sessionStorage.setItem('pomodoroIsAuth', 'true')
            setLoad(false)
          }
        }).catch((error) => {
          console.log(error)
          setLoad(false)
          // ...
        });
        setLoad(false)
    } catch (error) {
      console.log(error)
      setLoad(false)
    }
  }
  
  useEffect(() => {
    // getUsuario()
  }, [user])

  return (
    <>
      { load ? <LoadingApp /> : null } 
      <div className="login-card">
        <h3 className="login-card__title">Acceder con Google</h3>
        <div className="login-card__body">
          <img src={logoPomodoro} alt="logo google" className="login-card__body__img" />
          <button className="login-card__body__btn" onClick={loginGoogle}>Ingresar con Google</button>
        </div>
      </div>
    </>
  )
}

export default LoginUser