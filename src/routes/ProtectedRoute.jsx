import { Navigate  } from 'react-router-dom';
import { useContext } from "react";
//
import { GlobalContext } from '../context/GlobalContext';


const ProtectedRoute = ({ children }) => {
  const { user } = useContext(GlobalContext)
  const storedAuthState = sessionStorage.getItem('pomodoroIsAuth')

  if ((!user) && (storedAuthState != 'true')) {
    return <Navigate to="/users/login/" replace={true} />
  }

  return children
}

export default ProtectedRoute