import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import './UserTravels.css';


class UserList extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <TopBar></TopBar>
                <div id="userListContainer" className="container h-100">
                    <div id="itemBlock"className="d-block p-2 text-white">
                 
                        <div className="badge badge-pill badge-dark">
                            <span id="destinationResult" className="badge badge-primary badge m-3"> Stockholm</span>
                            <i className="fas fa-arrow-right m-2"></i>
                            <span id="destinationResult" className="badge badge-primary badge m-3">Göteborg</span>
                            
                        
               
                        </div>
                        <span id="carbonListItems" className="round round-lg">hej</span>
                     
                    </div>
                </div>
                


            </React.Fragment>
          );
    }
}
 
export default UserList;