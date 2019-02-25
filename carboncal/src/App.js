import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import modelInstance from './Data/travelModel';
import calcInstance from './Data/carbonCalculator';
import './App.css';

import LoginPage from "./LoginPage/LoginPage";
import SearchTravel from './SearchTravel/SearchTravel';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">

      <Route exact path = "/" component={LoginPage}/>

      <Route 
      path = "/SearchTravel"
      render = {() => <SearchTravel model = {modelInstance}/>}
      />

        
      </header>
    </div>
    );
  }
}

export default App;
