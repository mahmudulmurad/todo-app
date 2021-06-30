import {Set_Current_User,Fail_Current_User,Logout_Current_User} from './actionType';
import axios from 'axios';

export const setCurrentUser = user =>{
    return{
        type:Set_Current_User,
        payload:user
    }
}
export const failCurrentUser = error =>{
    return{
        type:Fail_Current_User,
        payload:error
    }
}
export const logoutCurrentUser =()=>{
    return{
        type:Logout_Current_User
    }
}
export const fetchUsers = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/me`, {
            headers: {
              "Content-type": "application/json;charset=UTF-8",
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          })
        .then(response => {
          const user = response.data
          dispatch(setCurrentUser(user))
        })
        .catch(error => {
          dispatch(failCurrentUser(error.message))
        })
    }
  }

  export const signUsers = (data) => {
      let obj={
          "name":data.name,
          "email":data.email,
          "password":data.password
      }
        return (dispatch) => {
        axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/users`,obj)
        .then(response => {
          const user = response.data
          localStorage.setItem('token', response.data.token);
          dispatch(setCurrentUser(user))
        })
        .catch(error => {
          dispatch(failCurrentUser(error.message))
        })
    }
  }

  export const loginUsers = (data) => {
    let obj={
        "email":data.email,
        "password":data.password
    }
      return (dispatch) => {
      axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/login`,obj)
      .then(response => {
        const user = response.data
        localStorage.setItem('token', response.data.token);
        dispatch(setCurrentUser(user))
      })
      .catch(error => {
        dispatch(failCurrentUser(error.message))
      })
  }
}
export const logoutUsers = () => {
      return (dispatch) => {
      axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/logout`, {
        headers: {
          "Content-type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(() => {
        dispatch(logoutCurrentUser())
      })
      .catch(error => {
        dispatch(failCurrentUser(error.message))
      })
  }
}