import React from 'react'
import {Link} from 'react-router-dom'

const Homepage = (props: any) => {
  console.log(props)

  return (
    <div>
    <h1>WELCOME TO THE BOOK BANK</h1>
      <Link to={{pathname: "/entry", state: {formType: "login"}}}>Click here to Login</Link>
      <Link to={{pathname: "/entry", state: {formType: "signup"}}}>Click here to Sign Up</Link>
    </div>
  )
}


export default Homepage
