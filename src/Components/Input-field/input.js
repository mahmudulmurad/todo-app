import React from 'react';
import './input.css';
const Input =({handleChange,label, ...otherProps })=>{
    return(
        <div className='group'>
         <label
            htmlFor={otherProps.name} 
            className="forlabel" >
            {label}
        </label>
        <input 
            className='form-control'
            onChange={handleChange}
            {...otherProps} 
        />
      </div>
    )
}
export default Input;