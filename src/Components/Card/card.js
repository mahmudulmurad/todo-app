import React, { useState } from 'react';
import './card.css';
import {deleteTask,REMOVEITEM,updateTask,fetchAllTasks,singleTask} from "../../Redux/tasks/action";
import { connect } from 'react-redux';
import Input from '../Input-field/input';

const Card =(props) =>{
  const {one,Key,deleteTask,REMOVEITEM,update,loadTasks,getSingle,task} = props
  let [name1,setName1]=useState('');
  let [des1, setDes1]=useState('');
  let id = task._id

 const handleClick=async (id)=>{ 
    await deleteTask(id);
     await REMOVEITEM(id)
  }
    return(
        <div className="container singleCard">
          <div className="taskDiv">
            <p className="name"><strong>Title</strong> : {one.name}</p>
            <p className="name"><strong>Details</strong> : {one.description}</p>
            <p className="name"><strong>Time</strong> : {one.createdAt}</p>
          </div>
            <div className="buttonDiv">
                      <button  
                        className="delete Dposition" 
                        data-toggle="tooltip" 
                        title="Delete Task"
                        onClick={()=>handleClick(one._id)}>
                        <i className="fas fa-trash fa-2x"></i></button>

                      <button 
                        className="edit Eposition" 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal1"
                        data-toggle="tooltip" 
                        title="Edit Task"
                        onClick={() =>getSingle(Key)}
                        >
                        <i className="fas fa-pen-square fa-2x"></i></button>
                        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Hello there</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body form-group">
                                <p><strong>Title</strong> : {task.name}</p>
                                <p><strong>Description</strong> : {task.description}</p>
                                    <label>Title</label>
                                    <Input 
                                        type="text" 
                                        name="title"
                                        id="title"
                                        value={name1}
                                        className="form-control"
                                        handleChange={e => setName1(e.target.value)}
                                        />
                                    <label>Description</label>   
                                    <textarea 
                                        type="text" 
                                        name="description"
                                        id="description"
                                        value= {des1}
                                        className="form-control"
                                        onChange={e => setDes1(e.target.value)}
                                        />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button 
                                    type="button" 
                                    className="btn btn-primary save" 
                                    data-bs-dismiss="modal"
                                    onClick={async ()=> {await update({id,name1,des1}); await loadTasks()}}
                                    >Save changes</button>
                                </div>
                                </div>
                            </div>
                        </div>
                </div>
        </div>
    )
}
const mapStateToProps = state =>{
  return{
    task:state.task.task
}
}
const mapDispatchToProps = dispatch =>{
  return{
      deleteTask : (data)=> dispatch(deleteTask(data)),
      REMOVEITEM:(data) =>dispatch(REMOVEITEM(data)),
      update : (data) => dispatch(updateTask(data)),
      loadTasks :() => dispatch(fetchAllTasks()),
      getSingle : (data) =>dispatch(singleTask(data))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Card);