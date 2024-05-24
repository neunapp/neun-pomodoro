import { useContext } from 'react';
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
