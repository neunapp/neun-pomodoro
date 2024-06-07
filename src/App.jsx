import { useContext, useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import { routes } from './routes/routes';

import { GlobalProvider } from './context/GlobalContext'
import {  SuccessContext } from './context/SuccessContext'
import SuccessApp from './apps/SuccessApp';

import './App.scss'

function App() {

  const { 
    loadSuccess,
    _
  } = useContext(SuccessContext)


  // solicitamos permiso para notificar 
  useEffect(() => {
    if (!("Notification" in window)) {
      return;
    }

    // Solicitamos permiso para las notificaciones al cargar la aplicación
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("notificaciones on");
      } else if (permission === "denied") {
        console.log("notificaciones off");
      } else {
        console.log("notificacione on/off");
      }
    });
  }, [])

  return (
    <GlobalProvider>
      { loadSuccess ? <SuccessApp /> : null}
      <div className='content-app'>
        <RouterProvider router={routes} />
      </div>
      
    </GlobalProvider>
  )
}

export default App
