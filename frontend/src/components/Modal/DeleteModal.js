import React from 'react'
import classes from './Modal.module.css';

const Modal = (props) =>{
    if(!props.show ){
            return null
    }
    else{
        return(
        <div className={classes.Modal}>
         {props.children}<br/>
         <button className="btn btn-danger" onClick={props.deleteUser}>Delete</button>
         <button className="btn btn-primary" onClick={props.cancel} >Cancel</button>
        </div>
    )} 
}

export default Modal