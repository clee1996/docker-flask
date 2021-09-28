import regeneratorRuntime from "regenerator-runtime";

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(loginPayload),
    credentials: 'include'
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch('http://localhost:5000/api/login', requestOptions);
    console.log(response)
    let data = await response.json();
    console.log(data)

    if (data && data.login) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      return data
    }
    else if (data.msg) {

    dispatch({ type: 'LOGIN_ERROR', error: data.msg });
    return data
    }
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}

export async function logout(dispatch) {
  let resp = await fetch("http://localhost:5000/api/logout", {method: "POST"})
  dispatch({ type: 'LOGOUT' });


}
