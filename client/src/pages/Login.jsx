import React from 'react'

import { useAuth0 } from "@auth0/auth0-react";
import { Nav } from '../components';

const Login = () => {

  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  console.log("user: ", user)

  return !isAuthenticated ? (
    <>
       <Nav isAuthenticate={isAuthenticated} />
      <button onClick={() => loginWithRedirect()} > Login </button>
    </>
  ) : (
    ""
  )

}

export default Login