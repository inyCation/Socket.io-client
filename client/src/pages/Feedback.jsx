import React from 'react'
import { Nav } from '../components/index'
import { Login } from './index'

import { useAuth0 } from "@auth0/auth0-react";


const Feedback = () => {
  const { isAuthenticated } = useAuth0();

  return !isAuthenticated ? (
    <>
      
      <Login />
    </>
  ) : (
    <>
      <Nav isAuthenticate={isAuthenticated} />
      
    </>
  )
}

export default Feedback