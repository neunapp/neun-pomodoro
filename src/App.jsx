import { useContext } from 'react';
import HeaderMain from "./components/HeaderMain"
import { RouterProvider } from "react-router-dom";
import { routes } from './routes/routes';

import { GlobalProvider } from './context/UserProvider';
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
      <HeaderMain></HeaderMain>
      <RouterProvider router={routes} />
    </GlobalProvider>
  )
}

export default App
