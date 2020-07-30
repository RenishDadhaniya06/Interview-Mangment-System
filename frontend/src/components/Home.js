import React, { Component } from 'react'
import axios from 'axios'



class Home extends Component {
    
    logoutHandler = async(e) =>{
        e.preventDefault();
        axios.defaults.headers.common['Authorization'] = await localStorage.getItem('Auth1')
        await axios.post('http://localhost:3000/users/logout')
        .then((response)=>{
            localStorage.clear()
            this.props.history.push('/')
        }).catch((e)=>{
            console.log('Error:',e)
        })
    }
    logoutAllHandler = async(e) =>{
        e.preventDefault();
        axios.defaults.headers.common['Authorization'] =await localStorage.getItem('Auth1')
        await axios.post('http://localhost:3000/users/logoutAll')
        .then((response)=>{
            localStorage.clear()
            this.props.history.push('/')
        }).catch((e)=>{
            console.log('Error:',e)
        })
    }

    render(){
        const Auth = localStorage.getItem('Auth')
        let x = null
        if(Auth === null)
        {
            x= this.props.history.push('/')
        }
        return(
            <div style={{fontSize:"larger"}}>
                {x}
                <p>Hello User</p>
                <button className="btn btn-success" onClick={(e) => this.logoutHandler(e)}>Logout</button><br/>
                <button className="btn btn-danger" onClick={(e) => this.logoutAllHandler(e)}>LogOut From All Devices</button>
            </div>
        )
    }
}

export default Home