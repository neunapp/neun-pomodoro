import { useContext } from 'react';

import { GlobalContext } from '../context/GlobalContext';

import LoginUser from "../components/users/LoginUser"
import ProfilePage from "./ProfilePage"

const LoginPage = () => {
  const { user } = useContext(GlobalContext)
  return (
    <div>
      { user ? <ProfilePage />: <LoginUser /> }
    </div>
  )
}

export default LoginPage