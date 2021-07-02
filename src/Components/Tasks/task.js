import React, { useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {logoutUsers} from '../../Redux/user/action'
import {createSingleTask,fetchAllTasks,afterSearch} from "../../Redux/tasks/action"
import './task.css'
import Input from "../Input-field/input"
import Card from '../Card/card'
import Loading from '../Loading/loading'
import Navbar from '../navbar/navbar'
import { Icon } from 'react-icons-kit'
import {plus} from 'react-icons-kit/metrize/plus'

const Task = ({createTask,alltasks,loadTasks,searchTask,loading,filteredTask}) =>{

    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [search,setSearch]=useState('')

    let goForSearch = (e) =>{
        setSearch(e.target.value)
    }
    let handleSubmitTask = async event => {
        event.preventDefault()
        let obj={
            "name":title,
            "description":description
        }
        await createTask(obj)
        await loadTasks()
      };
      
      useEffect(()=>{
        search ? searchTask(search):loadTasks() 
      },[loadTasks,search,searchTask])

    if(loading) return <Loading />
    return(
        <div>
        <Navbar />
           
        <div className="addSearch">
            <button className="btn add mx-2 my-2">
            <Icon 
                size={25} 
                icon={plus}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"    
                />
            </button>
                <input
                className="search"
                    type="search" 
                    placeholder="search..." 
                    aria-label="Search"
                    onChange={goForSearch}
                />
        </div>
            
                        
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Hello there</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body form-group">
                    <Input 
                        type="text" 
                        name="title"
                        id="title"
                        label="Title"
                        value={title}
                        className="form-control"
                        onChange={e => setTitle(e.target.value)}
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
            <div className="container">
                <div className="card-container row justify-content-center">
                        <div className="col-lg-8 col-md-8 col-sm-12 todo p-3">
                            <h3 className="headline">ToDo</h3>
                            <div className="mt-5">
                                { search ? filteredTask.map((one,index) =>
                                    <Card one={one} Key={index}/>) : alltasks.map((one,index) =>
                                    <Card one={one} Key={index}/>) 
                                }
                            </div> 
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
        filteredTask:state.task.tasks2,
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