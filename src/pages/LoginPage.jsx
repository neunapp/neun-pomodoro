import { useContext } from 'react';

import { GlobalContext } from '../context/GlobalContext';

import LoginUser from "../components/users/LoginUser"
import SimpleLoading from '../apps/SimpleLoading.jsx';
import ProfilePage from "./ProfilePage"

const LoginPage = () => {
  const { user, loadUser } = useContext(GlobalContext)
  return (
    <>
      {loadUser ?
        <div className='center-screen'>
          <SimpleLoading />
        </div>:
        <div>
          { user ? <ProfilePage />: <LoginUser /> }
        </div>
      }
    </>    
  )
}

export default LoginPage