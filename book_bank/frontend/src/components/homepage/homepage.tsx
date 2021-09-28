import React from 'react'
import {Link} from 'react-router-dom'
import './homepage.css'

const Homepage = (props: any) => {

  return (
    <div>
    <h1 className="homepage-header">The Only Website You Will Ever Need...</h1>
      <Link to={{pathname: "/entry", state: {formType: "login"}}}>Click here to Login</Link>
      <Link to={{pathname: "/entry", state: {formType: "signup"}}}>Click here to Sign Up</Link>
    </div>
  )
}


export default Homepage
