import { format } from 'date-fns';
//
import { useContext, useState, useEffect } from "react";
//
import SimpleLoading from '../../apps/SimpleLoading.jsx';
//
import { logout } from "../../services/FirebaseConfig.js";
import { apiCountTasksCompleted } from '../../services/TaskServices.js'
import { apiSumTimeHours, apiSumTaskHoursLast7Days, apiSumTaskHoursDay } from '../../services/TimesServices.js'
import { GlobalContext } from '../../context/GlobalContext.jsx';
import { getFrase } from '../../services/FrasesServices.js'
import logoImg from '../../assets/pomodoro.png'
import { saveDataTimesUser, getPomodoroTimeStorage } from "../pomodoroTimeFunctions.js";

import './ProfileUser.scss'

const ProfileUser = () => {
  const { user } = useContext(GlobalContext)
  const [load, setLoad] = useState(false)
  const [numTareas, setNumTareas] = useState(0)
  const [numHoras, setNumHoras] = useState(0)
  const [numHorasSemana, setHorasSemana] = useState(0)
  const [numHorasHoy, setHorasHoy] = useState(0)

  const cerrarSesion = async () => {
    const objPomodoro = getPomodoroTimeStorage()
    let objTime = {
      'date': format(new Date(), 'yyyy-MM-dd'),
      'time': objPomodoro.timeday
    }
    await saveDataTimesUser(user, objTime, true)
    sessionStorage.removeItem('pomodoroIsAuth')
    logout()
    // window.location.href = '/'
  }

  useEffect(() => {
    const fetchTaskCount = async () => {
      try {
        setLoad(true)
        const count = await apiCountTasksCompleted(user);
        const seconds = await apiSumTimeHours(user);
        const second7Day = await apiSumTaskHoursLast7Days(user);
        const secondHoy = await apiSumTaskHoursLast7Days(user);
        setNumTareas(count);
        setNumHoras((seconds/3600).toFixed(2));
        setHorasSemana((second7Day/3600).toFixed(2));
        setHorasHoy((secondHoy/3600).toFixed(2))
      } catch (err) {
        console.log(err.message);
      } finally {
        // setLoading(false);
        setLoad(false)
        console.log('finally')
      }
    };

    fetchTaskCount();
  }, [user])

  return(
    <div className="user-perfil">
      <div className="user-perfil__img">
        <figure className="image is-128x128">
          { user ? <img
            className='is-rounded'
            src={user.photo}
            alt="Placeholder image"
          /> : <img
            className='is-rounded'
            src={logoImg}
            alt="Placeholder image"
          /> }
          
        </figure>
      </div>
      <h3 className="user-perfil__title">{ user.name }</h3>
      <p className="user-perfil__text">{getFrase()}</p>
      {load ? <SimpleLoading /> :
        <div className="user-perfil__reporte">
          <div className="user-perfil__reporte__item">
            <p className="user-perfil__reporte__item__title">Hoy</p>
            <p className="user-perfil__reporte__item__tag">{numHorasHoy} hrs</p>
          </div>
          <div className="user-perfil__reporte__item">
            <p className="user-perfil__reporte__item__title">Semana/total</p>
            <p className="user-perfil__reporte__item__tag">{numHorasSemana} / {numHoras} hrs</p>
          </div>
          <div className="user-perfil__reporte__item">
            <p className="user-perfil__reporte__item__title">Tareas</p>
            <p className="user-perfil__reporte__item__tag">{numTareas} com</p>
          </div>
        </div> 
      }
      <button className="user-perfil__btn" onClick={cerrarSesion}>Cerrar Sesión</button>
    </div>
  )
}

export default ProfileUser