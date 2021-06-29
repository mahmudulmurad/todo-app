import React, { useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {logoutUsers} from '../../Redux/user/action';
import {createSingleTask,fetchAllTasks,afterSearch} from "../../Redux/tasks/action";
import './task.css';
import Input from "../Input-field/input";
import Card from '../Card/card';
import Loading from '../Loading/loading';

const Task = ({userData,logoutUsers,createTask,alltasks,loadTasks,searchTask,loading}) =>{

    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [search,setSearch]=useState('');
    console.log(search);
    let logOut=()=>{
        logoutUsers()
        localStorage.clear()
        };

    let handleSubmitTask = async event => {
        event.preventDefault();
        let obj={
            "name":title,
            "description":description
        }
        await createTask(obj)
        await loadTasks();
      };

      useEffect(()=>{
           search ? searchTask(search) : loadTasks() 
      },[loadTasks,searchTask])

    if(loading) return <Loading />
    return(
        <div id="taskDiv">
            <nav className="navbar navbar-expand-md navbar-dark">
                <div>
                    <h1 className="navbar-brand title">Task's</h1>
                    <label className="userName">{userData.name}</label>
                </div>
           
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                        <div className="addbutton">
                            <button 
                                className="btn btn-success addTodo"
                                data-bs-toggle="modal" 
                                data-bs-target="#exampleModal"
                            >
                            <i className="fas fa-plus"></i> Add Tasks</button>
                        </div>
                        
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Hello there</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body form-group">
                                    <label>Title</label>
                                    <Input 
                                        type="text" 
                                        name="title"
                                        id="title"
                                        value={title}
                                        className="form-control"
                                        handleChange={e => setTitle(e.target.value)}
                                        />
                                    <label>Description</label>   
                                    <textarea 
                                        type="text" 
                                        name="title"
                                        id="title"
                                        value={description}
                                        className="form-control"
                                        onChange={e => setDescription(e.target.value)}
                                        />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    data-bs-dismiss="modal"
                                    onClick={handleSubmitTask}
                                    >Save changes</button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </li>
                        <li className="nav-item">
                        <form className="form-inline">
                            <input 
                                className="form-control" 
                                type="search" 
                                placeholder="Search here" 
                                aria-label="Search"
                                onChange={(e)=>setSearch(e.target.value)}
                            />
                        </form>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link logout" onClick={logOut} data-toggle="tooltip" title="Logout">
                            <i className="fal fa-sign-out-alt fa-2x"></i></button>
                        </li>
                    </ul>
                </div>
        </nav>
            <div className="container">
                <div className="card-container row justify-content-center">
                        <div className="col-lg-8 col-md-8 col-sm-12 todo p-3 mt-4">
                            <h3 className="headline">ToDo</h3>
                            { search ? alltasks.map((one,index) =>
                                <Card one={one} Key={index}/>) : alltasks.map((one,index) =>
                                <Card one={one} Key={index}/>)}
                    </div>  
                </div>
            </div>   
        </div>
    )
}
const mapStateToProps= state =>{
    return{
        userData: state.user.current_user,
        alltasks:state.task.tasks,
        loading:state.task.loading
    }
  }
  const mapDispatchToProps = dispatch =>{
    return{
        logoutUsers : () => dispatch(logoutUsers()),
        createTask : (data) => dispatch(createSingleTask(data)),
        loadTasks :() => dispatch(fetchAllTasks()),
        searchTask :(data) => dispatch(afterSearch(data))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Task);