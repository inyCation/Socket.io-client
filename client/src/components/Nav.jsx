import React, { useCallback, useState } from 'react'
import Ham from './Ham';

import { NavLink } from "react-router-dom"



const Nav = ({isAuthenticate}) => {

    
    const loginOrLogout = isAuthenticate ? {item:"Logout",link:"/logout"} : {item:"Login",link:"/login"};

    const menuItems = [
        {
            item: "home",
            link: "/",
        },
        {
            item: "enter room",
            link: "/room",
        },
        {
            item: "about app",
            link: "/about",
        },
        {
            item: "feedback",
            link: "/feedback",
        },
    ]
    menuItems.push(loginOrLogout);


    const [menuStatus, setmenuStatus] = useState(false);

    const handleMenu = useCallback(() => {
        setmenuStatus((prev) => !prev);
    }, []);

  return (
        <>
            <nav>
                <div className="logo">Chat Room</div>
                <div className={`menu ${menuStatus ? 'menu-mob' : ''}`}>
                    {menuItems.map((items, index) => (
                        <NavLink key={index} to={items.link}>{items.item}</NavLink>
                    ))}
                </div>
                <div className="ham" onClick={handleMenu}>
                    <Ham isOpen={menuStatus} />
                </div>

            </nav>
        </>
    )
}

export default Nav