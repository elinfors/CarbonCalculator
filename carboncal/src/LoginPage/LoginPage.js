import React, { Component } from 'react';
import './LoginPage.css'
import { Link } from 'react-router-dom';


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
                                <Link to={"/SearchTravel"}>
                                    <button type="button" class="btn btn-success btn-lg">Sign in</button>
                                </Link>
                                    
                                </div>
                               
                        </div>
                    </div>
                </form>      
         );
    }
}
 
export default LoginPage;