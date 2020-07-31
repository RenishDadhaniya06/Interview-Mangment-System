import React from "react";
import axios from 'axios'
import classes from "./Modal.module.css";

const EditModal = (props) => {

  const editHandler =async (e) =>{
        e.preventDefault()
        const data = {
            name: e.target.elements.name.value,
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
          };
          axios.defaults.headers.common["Authorization"] = await localStorage.getItem(
            "Auth1"
          );
          axios.patch('http://localhost:3000/users/me',data)
          .then((data)=>{
           console.log(data)
            document.getElementById('done').click()
          })
          .catch((e)=>{
              console.log(e)
          })
    }

  if (!props.show) {
    return null;
  } else {
    return (
    <div className={classes.Modal}>{props.children}<br/>
    <form className="form-group" onSubmit={(e) => editHandler(e)}>
          <input
            className="form-control"
            name="name"
            type="text"
            defaultValue={props.name}
            required
          />
          <br />
          <input
            className="form-control"
            name="email"
            type="email"
            defaultValue={props.email}
            required
          />
          <br />
          <input
            className="form-control"
            name="password"
            type="password"
            placeholder="New Password"
            required
          />
          <br />
          <div id="signup"></div>
          <br />
          <button className="btn btn-primary" type="submit">
            Edit
          </button>
        </form>
     <button className="btn btn-primary" onClick={props.cancel} id="done" >Cancel</button>
    </div>)
  }
};

export default EditModal;
