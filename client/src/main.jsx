import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from "@auth0/auth0-react"

import App from './App.jsx'

import {Room, Feedback, About, Login, Logout } from './pages/index.js'
import Layout from './Layout.jsx'


import './styles/main.scss'
import './styles/mediaQuery.scss'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "feedback",
        element: <Feedback />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "room",
        element: <Room />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN_NAME}
      clientId={import.meta.env.VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>,
)
