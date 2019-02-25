import React, { Component } from 'react';
import './LoginPage.css'

class LoginPage extends Component {
    state = {  }
    render() { 
        return ( 
                <form id="loginForm">
                    <div className="d-flex justify-content-center h-100">
                        <div className="col-sm-4" id="signInText">
                            <div className="col-sm-12">
                                <h2> Sign in</h2>
                            </div>
                                <div className="col-sm-12" id="loginBox">
                                    <div class="form-group">
                                        <label for="inputEmail">Email</label>
                                        <input type="email" class="form-control" id="inputEmail" placeholder="Email"></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputPassword">Password</label>
                                        <input type="password" class="form-control" id="inputPassword" placeholder="Password"></input>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <button type="button" class="btn btn-success btn-lg">Sign in</button>
                                </div>
                               
                        </div>
                    </div>
                </form>      
         );
    }
}
 
export default LoginPage;