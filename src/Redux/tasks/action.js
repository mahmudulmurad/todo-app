import {
    Loading_Tasks,
    Fetch_Tasks,
    Fail_Calling_Tasks,
    Remove_Item,
    Get_Single_Item
} from './actionType';
import axios from 'axios';


export const deleteTask = (id)=>{
  let data=id
  return() =>{
    axios
    .delete(`http://localhost:3003/tasks/${data}`,{
      headers: {
        "Content-type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch(error => {
      //dispatch(failFetchingTask(error.message))
      console.log(error.data);
    })
  }
}
export const createSingleTask = task =>{
    let obj={
        "name":task.name,
        "description":task.description
    }
    return (dispatch) => {
        axios
        .post(`http://localhost:3003/tasks`,obj,{
          headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((res) => {
          console.log(res);
        })
        .catch(error => {
          dispatch(failFetchingTask(error.message))
        })
    }
}
export const updateTask =task =>{
  const {id, des1,name1} = task
  let obj ={
    "name":name1,
    "description":des1
  }
  return(dispatch) =>{
   axios.patch(`http://localhost:3003/tasks/update/${id}`,obj,{
    headers: {
      "Content-type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
   })
   .then(res =>{
     console.log(res.data)
   })
   .catch(error =>{
    dispatch(failFetchingTask(error.message))
   })
  }

}

export const fetchAllTasks =() =>{
    return (dispatch) => {
        dispatch(loadingTask())
        axios
        .get(`http://localhost:3003/tasks`,{
          headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((res) => {
          dispatch(fetchTasks(res.data))
        })
        .catch(error => {
          dispatch(failFetchingTask(error.message))
        })
    }
}
export const loadingTask =()=>{
    return{
        type:Loading_Tasks
    }
}

export const fetchTasks = task =>{
    return{
        type:Fetch_Tasks,
        payload:task
    }
}
export const failFetchingTask = error =>{
    return{
        type:Fail_Calling_Tasks,
        payload:error
    }
}
export const REMOVEITEM = item =>({
  type:Remove_Item,
  payload:item
});
export const singleTask = inx =>({
  type:Get_Single_Item,
  payload:inx
});

export const afterSearch = (data) =>{
  let str = data
  return (dispatch) => {
    dispatch(loadingTask())
    axios
    .get(`http://localhost:3003/tasks/${str}`,{
      headers: {
        "Content-type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((res) => {
      dispatch(fetchTasks(res.data))
    })
    .catch(error => {
      dispatch(failFetchingTask(error.message))
    })
  }
}

// type:Filter_Tasks_From_Search,
// payload:data