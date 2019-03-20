import React, { Component } from 'react';
import './TopBar.css';
import { Link } from 'react-router-dom';
import fire from '../LoginPage/Fire';



class TopBar extends Component {
    constructor(){
        super();
        this.state = {
        }
        this.handleLogout = this.handleLogout.bind(this);
    }
        
    handleLogout(){
        fire.auth().signOut();
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
                            <i class="fas fa-th-list mr-2"></i>My list<span id="topBarCounter" className="ml-2">{this.props.currentSavedTravels}</span>

                        </button>
                    </Link>
                    <div className="btn-group">
                        <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-cog mr-2"></i>Settings
                        </button>
                        <div className="dropdown-menu">
                            <span className="dropdown-item" href="#">My Account</span>
                            <div className="dropdown-divider"></div>
                            <button onClick={this.handleLogout} className="dropdown-item" id="logOutButton" href="#">Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>


            
            
      </React.Fragment>
          );
    }
}
 
export default TopBar;