import React, { Component } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import fire from './Fire';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Loader from 'react-loader-spinner';


class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            email: "",
            password: ""
        }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleInput = this.handleInput.bind(this);
    }

    
    handleLogin(e){
        e.preventDefault();
        console.log("hej");
        this.setState({loading:true});
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        console.log(u)}).catch((error)=>{
            console.log(error);
        });
    }
    

    handleInput(e){
        this.setState({[e.target.name]: e.target.value})
    }

    uiConfig = {
        signInFlow : "popup",
        signInOptions : [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callback: {
            signInSucess: () => false
        }

    }

    render() { 
            return ( 
                this.state.loading ?
                <form id="loginForm">
                    <div className="d-flex justify-content-center h-100">
                <Loader type="Plane" color="#00BFFF" height="100" width="100"/>
                    </div>
                </form>
                :
                <form id="loginForm">
                    <div className="d-flex justify-content-center h-100">
                        <div className="col-sm-4" id="signInText">
                            <div className="col-sm-12">
                                <h2> Sign in</h2>
                            </div>
                                <div className="col-sm-12" id="loginBox">
                                    <div className="form-group">
                                        <label htmlFor="inputEmail">Email</label>
                                        <input type="email" className="form-control" id="inputEmail" name="email" value={this.state.email} onChange={this.handleInput}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPassword">Password</label>
                                        <input type="password" className="form-control" id="inputPassword" name="password" value={this.state.password} onChange={this.handleInput}></input>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                <button onClick={this.handleLogin} type="button" className="btn btn-success btn-lg">Sign in</button>
                                <Link to="SignUp">
                                <button type="button" className="btn btn-info btn-lg">Sign Up</button>
                                </Link>
                                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                            </div>       
                        </div>
                    </div>
                    
                    
                </form>      
        );
    }
}
 
export default LoginPage;