import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import modelInstance from './Data/travelModel';
import './App.css';

import SignUp from "./LoginPage/SignUp";
import SearchTravel from './SearchTravel/SearchTravel';
import UserTravels from './UserTravels/UserTravels';
import HandleLogin from './LoginPage/HandleLogin';
import LoginPage from './LoginPage/LoginPage';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">

      <Route exact path = "/" component={HandleLogin}/>
      
      <Route 
      path = "/SignUp"
      render ={() => <SignUp/>}
      />

      <Route 
      path = "/Login"
      render ={() => <LoginPage/>}
      />

      <Route 
      path = "/SearchTravel"
      render = {() => <SearchTravel model = {modelInstance}/>}
      />

      <Route 
      path = "/UserTravels"
      render ={() => <UserTravels model = {modelInstance}/>}
      />

        
      </header>
    </div>
    );
  }
}

export default App;
