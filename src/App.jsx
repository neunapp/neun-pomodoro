import './App.scss'
import HeaderMain from "./components/HeaderMain"
import { RouterProvider } from "react-router-dom";
import { routes } from './routes/routes';
import { GlobalProvider } from './context/UserProvider';

function App() {

  return (
    <GlobalProvider>
      <HeaderMain></HeaderMain>
      <RouterProvider router={routes} />
    </GlobalProvider>
  )
}

export default App
