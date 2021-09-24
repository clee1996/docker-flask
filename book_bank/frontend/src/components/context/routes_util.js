import React, {Component} from 'react'
import {Redirect, Route} from "react-router-dom"

import {useAuthState} from './context.js'

export const ProtectedRoute = ({component: Component, ...rest}) => {

  const user = useAuthState()
  return(
    <Route {...rest}
      render = {props =>
          user.token ? <Component {...rest} {...props}/> :
          <Redirect to="/"/>
      }/>
  )
}

export const AuthRoute = ({component: Component, ...rest}) => {
  const user = useAuthState()
  return(
    <Route {...rest}
      render = {props =>
          !user.token ? <Component {...rest} {...props}/> :
          <Redirect to="/greeting"/>
      }
    />
  )
}

