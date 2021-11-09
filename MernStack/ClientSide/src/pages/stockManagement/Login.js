import React,{useState,useEffect} from 'react';
import { Router, Switch, Route } from "react-router-dom";
import DashboardOverview from '../dashboard/DashboardOverview';
import { Routes } from '../../routes';
import axios from 'axios';
import { useContext, } from "react";
import './loginpagecss.scss';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {Context} from './context';



class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentView: "signUp",
      username:"",
      email:"",
      password:""
    };
    
    this.handleChange =this.handleChange.bind(this);
    this.handleSubmit =this.handleSubmit.bind(this);
}


handleChange(event) {
  let target = event.target;
  let value = target.type === "checkbox" ? target.checked : target.value;
  let name = target.name;

  this.setState({
    [name]: value
  });
}

 handleSubmit(e) {
  e.preventDefault();
  
  const UserObject = {
    username: this.state.username,
    email: this.state.email,
    password: this.state.password
  };
  
//     fetch("http://localhost:5000/api/users/createUser", {
//    method: 'POST',
//    headers: {
//       'Content-Type': 'application/json',
//    },
//    body: JSON.stringify(UserObject)
// })
console.log(UserObject);
const whatsshit =  axios.post('http://localhost:5000/api/users/createUser', UserObject)
  .then(res => console.log(res.data));

  console.log("The form was submitted with the following data:");
}
   


    changeView = (view) => {
      this.setState({
        currentView: view
      })
    } 
    
  
    currentView = () => {
     
      switch(this.state.currentView) {
        case "signUp":
          return (
          
            <form onSubmit={this.handleSubmit}>
              <h2>Sign Up!</h2>
              <fieldset>
                <legend>Create Account</legend>
                <ul>
                  <li>
                    <label for="username">Username:</label>
                    <input type="text" id="username" required   onChange={this.handleChange}  />
                  </li>
                  <li>
                    <label for="email">Email:</label>
                    <input type="email" id="email" required    placeholder="Enter your email..."   
                    onChange={this.handleChange}
                    />
                  </li>
                  <li>
                    <label for="password">Password:</label>
                    <input type="password" id="password" required   placeholder="Enter your password..."  
                    onChange={this.handleChange}
                  />
                  </li>
                </ul>
              </fieldset>
              <button type="button" onClick ={this.handleSubmit} as={Link} to={Routes.DashboardOverview.path} >Submit</button>
              <button type="button" onClick={ () => this.changeView("logIn")}>Have an Account?</button>
            
            </form>
          )
          break
        case "logIn":
          return (
            <form >
              <h2>Welcome Back!</h2>
              <fieldset>
                <legend>Log In</legend>
                <ul>
                  <li>
                    <label for="username">Username:</label>
                    <input type="text" id="username" required   placeholder="Enter your username..."
                        />
                  </li>
                  <li>
                    <label for="password">Password:</label>
                    <input type="password" id="password" required   placeholder="Enter your password..."
                           />
                  </li>
                  <li>
                    <i/>
                    <a onClick={ () => this.changeView("PWReset")} href="#">Forgot Password?</a>
                  </li>
                </ul>
              </fieldset>
              <button type="submit"  onClick={this.onSubmit}>Login</button>
              <button type="button" onClick={ () => this.changeView("signUp")}>Create an Account</button>
            </form>
          )
          break
        case "PWReset":
          return (
            <form>
            <h2>Reset Password</h2>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label for="email">Email:</label>
                  <input type="email" id="email" required/>
                </li>
              </ul>
            </fieldset>
            <button>Send Reset Link</button>
            <button type="button" onClick={ () => this.changeView("logIn")}>Go Back</button>
          </form>
          )
        default:
          break
      }
    }
  
  
    render() {
      return (
        <section id="entry-page">
          {this.currentView()}
        </section>
      )
    }
  }
export default Login;