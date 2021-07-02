import React from 'react';
import './navbar.css';
import {connect} from 'react-redux';
import {logoutUsers} from '../../Redux/user/action';

const Nabvar =({userData,logoutUsers}) =>{

    let logOut=()=>{
        logoutUsers()
        localStorage.clear()
        };
    
    return(
        <nav className="navbar navbar-dark w-100  position-fixed">
                <div>
                    <h1 className="navbar-brand mx-4 fs-3">Task's</h1>
                    <label className="userName">{userData.name}</label>
                </div>
                <ul>
                <li className="nav-item">
                    <button 
                        className="nav-link mx-4 border-0 bg-transparent" 
                        onClick={logOut} data-toggle="tooltip" 
                        title="Logout">
                    <i className="fal fa-sign-out-alt fa-2x"></i></button>
                </li>
                </ul>
        </nav>
    )
}
const mapStateToProps= state =>{
    return{
        userData: state.user.current_user
    }
  }
  const mapDispatchToProps = dispatch =>{
    return{
        logoutUsers : () => dispatch(logoutUsers())
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Nabvar);