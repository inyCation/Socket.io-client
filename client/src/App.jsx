import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Nav } from './components/index';
import {LandingPage} from './pages/index';

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
      <>
        <Nav isAuthenticate={isAuthenticated} />
        <LandingPage />   
      </>
  )
};

export default App;
