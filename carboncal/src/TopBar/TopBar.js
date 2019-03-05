import React, { Component } from 'react';
import './TopBar.css';
import { Link } from 'react-router-dom';



class TopBar extends Component {
   constructor(){
       super();
       }
   
    render() { 
        return (
        <React.Fragment>
            <nav id="navBar" className="navbar fixed-top navbar-dark bg-dark">
                <div className="container h-100">
                    <Link to="/searchTravel">
                        <span className="navbar-brand">Home</span>
                    </Link>
                    <Link to="/UserTravels">
                        <button className="btn btn-info justify-content-center">
                            <i class="fas fa-th-list mr-2"></i>My list
                        </button>
                    </Link>
                    <div className="btn-group">
                        <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-cog mr-2"></i>Settings
                        </button>
                        <div className="dropdown-menu">
                            <span className="dropdown-item" href="#">My Account</span>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item" id="logOutButton" href="#">Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

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
                        <span id="infoText">Receive your result</span>
                    </div>
                </div>
            </div>
            
            {/*<div className="container h-100">
                <div id="homePageText" className="d-flex justify-content-center h-100">
                    <h2 className="align-items-center">The #1 CarbonCalculator for your travels!<br/><h1>Enjoy!</h1></h2>
                 
                </div>
        </div>*/}
            
            
      </React.Fragment>
          );
    }
}
 
export default TopBar;