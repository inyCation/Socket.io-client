import React from 'react'
import { Nav } from '../components/index'
import { useAuth0 } from "@auth0/auth0-react";


const About = () => {
  const { user, isAuthenticated } = useAuth0();

  return !isAuthenticated ? (
    <Nav isAuthenticate={isAuthenticated} />

  ) : (
    <>
      <Nav isAuthenticate={isAuthenticated} />
    </>
  )
}

export default About