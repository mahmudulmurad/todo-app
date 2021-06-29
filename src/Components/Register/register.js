import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';
import image from '../../data/image.jpg';
import logo from '../../data/logo101.jpg';
import CustomeButton from '../custombutton/custombutton';
import Input from '../Input-field/input';
import {signUsers} from '../../Redux/user/action';
import { connect } from 'react-redux';

const RegisterPage =({signUsers})=>{
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password, setPassword]= useState('');

   let handleSubmit = async event => {
        event.preventDefault();
        let obj={
            "name":name,
            "email":email,
            "password":password
        }
        signUsers(obj)
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
                            <p className="login-card-discription">Sign up your account.</p>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <Input 
                                        type="name" 
                                        name="name"
                                        label="Name"
                                        id="name"
                                        value={name}
                                        handleChange={e => setName(e.target.value)}
                                        className="form-control" 
                                    />
                                </div>
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
                                    isRegister
                                    value="Sign up"
                                />

                            </form>
                            <p className="login-card-footer-text">Already have an account?
                            <Link to="/login" className="text-reset"> Login here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch =>{
    return{
        signUsers : (e)=>dispatch(signUsers(e))
    }
  }
export default connect(null,mapDispatchToProps)(RegisterPage);