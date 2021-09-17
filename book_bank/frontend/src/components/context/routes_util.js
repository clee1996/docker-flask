import React, {Component} from 'react'
import {Redirect, Route} from "react-router-dom"

import {useAuthState} from './context.js'

export const ProtectedRoute = ({component: Component, path, ...rest}) => {

  const user = useAuthState()
  return(
    <Route path={path}
      render = {props =>
          user.token ? <Component {...props}/> :
          <Redirect to="/"/>
      }/>
  )
}

