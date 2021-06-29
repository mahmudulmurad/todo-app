import React from 'react';
import './custombutton.css';
const CustomeButton =({value,isRegister})=>{
    return(
        <div className="form-group mb-4">
            <input 
                name="login" 
                id="login" 
                className={`${isRegister ? 'register':''} btn login-btn mb-4`} 
                type="submit" 
                value={value} 
            />
        </div>
    )
}
export default CustomeButton;