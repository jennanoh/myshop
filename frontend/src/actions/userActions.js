import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,USER_LOGOUT } from "../constants/userConstants";

export const login = (email, password) => async(dispatch) => {
  try{
    dispatch({
      type: USER_LOGIN_REQUEST
    })
    const config = {
      headers:{
        'Content-Type': 'application/json'
        //before passing user info to the post req, we need to declare what type of content it is
      }
    }
    const {data} = await axios.post(
      '/api/users/login', 
      {email, password}, 
      config
    )
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    localStorage.setItem('userInfo',JSON.stringify(data))
    //place in browser storage

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message :
        error.message
    })
  }
}

export const logout = () => async(dispatch) => {
localStorage.removeItem('userInfo')//remove info from browser
  dispatch({
    type: USER_LOGOUT //the reducer will remove user info in store
  })
}