import React from 'react'
import { Nav } from '../components';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {
  const { logout,isAuthenticated } = useAuth0();

  return(
    <>
      <Nav isAuthenticate={isAuthenticated} />
     <div className='logoutContainer' >
     <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} >Logout</button>

    </div>
    </>
  )
}
export default Logout