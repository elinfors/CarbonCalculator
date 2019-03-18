import React, { Component } from 'react';
import './LoginPage.css';
import fire from './Fire';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            message: "",
            showMessage: false
        }
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleInput = this.handleInput.bind(this);
    } 

    handleInput(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleCreateAccount(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        this.setState({
            message: "Account Created",
            showMessage: true
        })}
        ).catch((error)=>{
            console.log(error);
            this.setState({
                message: "Could not create an account!",
                showMessage: true
            })
        });
    }

    render() { 
        return ( 
                <form id="loginForm">
                    <div className="d-flex justify-content-center h-100">
                        <div className="col-sm-4" id="signInText">
                            <div className="col-sm-12">
                                <h2>Create Account</h2>
                            </div>
                               
                                <div className="col-sm-12" id="loginBox">
                                    <div className="form-group">
                                        <label htmlFor="inputEmail">Enter Email</label>
                                        <input type="email" className="form-control" id="inputEmail" name="email" value={this.state.email} onChange={this.handleInput}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPassword">Enter Password</label>
                                        <input type="password" className="form-control" id="inputPassword" name="password" value={this.state.password} onChange={this.handleInput} ></input>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                <button onClick={this.handleCreateAccount} type="button" className="btn btn-info btn-lg">Create Account</button>
                            </div>
                            {this.state.showMessage ?
                                <div className="col-sm-12">
                                     <h3>{this.state.message}</h3>
                                 </div> :null} 
                        </div>
                    </div>
                    
                </form>      
        );
    }
}
 
export default SignUp;