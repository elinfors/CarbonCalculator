import React, { Component } from 'react';
import './TopBar.css';


class TopBar extends Component {
    state = {  }
    render() { 
        return (
        <React.Fragment>
            <div id="headerWrapper">
                <div className="container h-100">
                    <nav id="navBar" className="navbar navbar navbar-dark justify-content-between">
                        <a className="navbar-brand">Home</a>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Your list</button>
                        
                        <div className="btn-group">
                            <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Action
                            </button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">My account</a>
                                <a className="dropdown-item" href="#">My lists</a>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item" id="logOutButton" href="#">logout</button>
                            </div>
                        </div>


                    </nav>
                </div>
            </div>

            <div className="container h-100" id="infoTextContainer">
                <div className="d-flex justify-content-center h-100">
                    <div className="col-sm-4 m-2">
                        <span><i id="infoSymbolOne" className="fas fa-check-circle m-2"></i></span>
                        <span id="infoText">Choose your ride</span>
                    </div>
                    <div className="col-sm-4 m-2">
                        <span><i id="infoSymbolTwo" className="fas fa-check-circle m-2"></i></span>
                        <span id="infoText">Choose your travel</span>
                    </div>
                    <div className="col-sm-4 m-2">
                        <span><i id="infoSymbolThree" className="fas fa-check-circle m-2"></i></span>
                        <span id="infoText">Get the result</span>
                    </div>
                </div>
            </div>
            
            <div className="container h-100">
                <div id="homePageText" className="d-flex justify-content-center h-100">
                    <h2 className="align-items-center">The #1 CarbonCalculator for your travels!<br/><h1>Enjoy!</h1></h2>
                 
                </div>
            </div>
            
            
      </React.Fragment>
          );
    }
}
 
export default TopBar;