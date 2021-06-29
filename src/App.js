import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
  } from "react-router-dom";
import './App.css';
import Home from './Components/Home/home';
import Task from './Components/Tasks/task';
import RegisterPage from './Components/Register/register';
import {connect} from 'react-redux';
import {fetchUsers} from './Redux/user/action';


function App({fetchUsers,userData}) {

  useEffect(()=>{
    fetchUsers()
  },[fetchUsers])

  return (
      <div >
        <Router>
            <Switch>

                <Route exact path="/">
                {
                  userData ? <Redirect to="/tasks"/>: <Home />
                }
               
                </Route>

                <Route exact path="/login">
                {
                  userData ? <Redirect to="/tasks"/>: <Home />
                }
                </Route>

                <Route exact path="/register">
                  {
                    userData ? <Redirect to="/tasks"/>: <RegisterPage />
                  }
                </Route>

                <Route exact path="/tasks">
                {
                    userData ? <Task /> :<Redirect to="/login"/>
                }
                 
                </Route>
            </Switch>
        </Router>
        
      </div>

  );
}

const mapStateToProps= state =>{
  return{
      userData: state.user.isUser
  }
}
const mapDispatchToProps = dispatch =>{
  return{
  fetchUsers : ()=>dispatch(fetchUsers())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
