import regeneratorRuntime from "regenerator-runtime";

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    //headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch('http://localhost:5000/api/login', requestOptions);
    let data = await response.json();

    if (data && data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
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
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}
