import React, {useState} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {loginUser, useAuthState, useAuthDispatch} from '../context/index.js'


interface stateType {
  formType: string
  }

interface Data {
  username: string;
  password: string;
}


const UserSession = (props: any) => {


const location = useLocation()
const state = location.state as stateType
const {formType} = state;
const dispatch = useAuthDispatch()
const history = useHistory()
const [errr, displayErr] = useState(false)
const [msg, setMsg] = useState("")


const {loading, errorMesage} = useAuthState()



  const handleSubmit = (event: any) => {
    event.preventDefault();
    let data: Data = {
      username: event.target.username.value,
      password: event.target.password.value
    }


    const submit = async () => {
      try {
      let res =  await loginUser(dispatch, data)
      console.log(res)
      if (!res.user) {
        displayErr(true)
        setMsg(res.msg)
        return
      }
     history.push('/greeting')
      } catch (error) {
      }
    }

    submit()
  }

  const registerSubmit = (event: any) => {
    event.preventDefault()
    let data: Data = {
      username: event.target.username.value,
      password: event.target.username.value
    }

    const register = async () => {
    let url = "http://localhost:5000/api/register"
    let res = await fetch(url, {method: "POST", body: JSON.stringify(data)})
    }

    register()


  }



  //const location = useLocation()
  //const state = location.state as stateType
  //const {formType} = state;

  if (formType === 'login') {
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username:</label><input type="text" name="username"></input>
        <label>Username:</label><input type="password" name="password"></input>
        <button type="submit">Login</button>
      </form>
      {errr ? <div>{msg}</div> : null}
    </div>
  )
  }
  else if (formType === 'signup') {
    return(
      <div>
        <form onSubmit={registerSubmit}>
          <label>Username:</label><input type="text" name="username"/>
          <label>Username</label><input type="password" name="password"/>
          <button type="submit" >Signup</button>
        </form>
      </div>
    )
  }
}

export default UserSession
