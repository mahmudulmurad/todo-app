import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import './home.css';
import image from '../../data/image.jpg';
import logo from '../../data/logo101.jpg';
import CustomeButton from '../custombutton/custombutton';
import Input from '../Input-field/input';
import {loginUsers} from '../../Redux/user/action';

const Home = ({loginUser}) =>{

    const [email,setEmail]=useState('');
    const [password, setPassword]= useState('');

      let handleSubmit = async event => {
        event.preventDefault();
        let obj={
            "email":email,
            "password":password
        }
        loginUser(obj)
      };
    return(
        <div className="mainDiv container" id="mainDiv">
            <div className="card login-card">
                <div className="row">
                    <div className="col-md-5">
                        <img src={image} alt="login" className="login-card-img" />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <div className="brand-logo">
                                <img src={logo} alt="logo" className="logo"/>
                            </div>
                            <p className="login-card-discription">Sign into your account</p>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <Input 
                                        type="email" 
                                        name="email"
                                        label="Email"
                                        id="email"
                                        value={email}
                                        handleChange={e => setEmail(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group mb-4">
                                <Input 
                                    type="password" 
                                    name="password"
                                    value={password}
                                    label="Password"
                                    handleChange={e => setPassword(e.target.value)}
                                    id="password" 
                                    className="form-control" 
                                />   
                                </div>

                                <CustomeButton 
                                    value="Login"
                                />

                            </form>
                            <p className="login-card-footer-text">Don't have an account? 
                            <Link to="/register" className="text-reset"> Register here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch =>{
    return{
        loginUser : (e)=>dispatch(loginUsers(e))
    }
  }
export default connect(null,mapDispatchToProps)(Home);