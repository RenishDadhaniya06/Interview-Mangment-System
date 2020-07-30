import React, { Component } from 'react'
import axios from 'axios'
import classes from './Login.module.css'
import {NavLink} from 'react-router-dom'

class Login extends Component {

    loginHandler = async(e) =>{
        localStorage.setItem('Auth','Done')
        e.preventDefault();
        const data = {
            email : e.target.elements.email.value,
            password : e.target.elements.password.value
        }
        await axios.post('http://localhost:3000/users/login',data)
        .then((response)=>{
            localStorage.setItem('Auth1',response.data.token)
            axios.defaults.headers.common['Authorization'] = response.data.token
            this.props.history.push('/home')
        })
        .catch((error)=>{
            document.getElementById('login').innerHTML = error.response.data.Message
            console.log(error.response)
        })
    }
    render(){
        localStorage.clear()
        return(
            <div className={classes.Login} >
           Login<br/>
        <form className="form-group" onSubmit={(e) => this.loginHandler(e)} >
          <input className="form-control"  name="email" type="email" placeholder="Email" required /><br/>
          <input
           className="form-control" 
            name="password"
            type="password"
            placeholder="Password"
            required
          /><br/>
          <div id="login"></div><br/>
          <button className="btn btn-success" type="submit">Log In</button><br/>
         Don't Have Account <NavLink to="/">Register</NavLink>
        </form>
      </div>
        )
    }
}

export default Login