import React from 'react'

import { useAuth0 } from "@auth0/auth0-react";
import { Nav } from '../components';

const Login = () => {

  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  

  return !isAuthenticated ? (
    <>
       <Nav isAuthenticate={isAuthenticated} />
     <div className='logoutContainer' >
       <button onClick={() => loginWithRedirect()} > Login </button>
    </div>
    </>
  ) : (
    ""
  )

}

export default Login