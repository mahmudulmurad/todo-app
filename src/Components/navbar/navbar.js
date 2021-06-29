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
        <nav className="navbar navbar-dark w-100 h-70 position-fixed">
                <div>
                    <h1 className="navbar-brand title">Task's</h1>
                    <label className="userName">{userData.name}</label>
                </div>
                <ul>
                <li className="nav-item">
                            <button className="nav-link logout" onClick={logOut} data-toggle="tooltip" title="Logout">
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