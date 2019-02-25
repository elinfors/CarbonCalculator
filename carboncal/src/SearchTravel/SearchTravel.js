import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import './SearchTravel.css';
class SearchTravel extends Component {
    state = {  }
    render() { 
        return (
      <React.Fragment>
            <TopBar></TopBar>
            <div id="chooseRideContainer" className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="col-sm-12" id="chooseRideText">
                        <span><i id="infoSymbolOneBig" class="fas fa-check-circle m-2"></i></span>
                        <span id="chooseTextBig">Choose your ride</span>
                    </div>
                </div>
            </div>
            <div className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="col-sm-12" id="vehicleSymbolContainer">
                        <div className="col-sm-2" id="chooseVehicleBox">
                            <button id="smallCarButton" type="button" class="btn btn-danger btn-circle btn-xl m-4">                            
                                <i class="fas fa-car-side"></i>
                            </button>
                            
                            <h5 className="badge badge-pill badge-light">Small car</h5>
                        </div>
                        <div className="col-sm-2" id="chooseVehicleBox">
                            <button id="mediumCarButton" type="button" class="btn btn-primary btn-circle btn-xl m-4">
                                <i class="fas fa-shuttle-van"></i>
                            </button>
                            <h5 className="badge badge-pill badge-light">Medium car</h5>
                        </div>
                        <div className="col-sm-2" id="chooseVehicleBox">
                            <button id="largeCarButton" type="button" class="btn btn-success btn-circle btn-xl m-4">
                                <i class="fas fa-truck-moving"></i>
                            </button>
                            <h5 className="badge badge-pill badge-light">Large car</h5>
                        </div>
                        <div className="col-sm-2" id="chooseVehicleBox">
                            <button id="planeButton" type="button" class="btn btn-info btn-circle btn-xl m-4">
                                <i class="fas fa-plane"></i>
                            </button>
                            <h5 className="badge badge-pill badge-light">Plane</h5>
                        </div>
                        <div className="col-sm-2" id="chooseVehicleBox">
                            <button id="trainButton" type="button" class="btn btn-info btn-circle btn-xl m-4">
                                <i class="fas fa-subway"></i>                       
                            </button>
                            <h5 className="badge badge-pill badge-light">Train</h5>
                        </div>
                        <div className="col-sm-2" id="chooseVehicleBox">
                            <button id="shipButton" type="button" class="btn btn-info btn-circle btn-xl m-4">
                                <i class="fas fa-ship"></i>               
                            </button>
                            <h5 className="badge badge-pill badge-light">Ship</h5>
                        </div>
                    </div>
                </div>
            </div>


            <div id="chooseRideContainer" className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="col-sm-12" id="chooseRideText">
                    <span><i id="infoSymbolTwoBig" class="fas fa-check-circle m-2"></i></span>
                    <span id="chooseTextBig">Choose your travel</span>
                    </div>
                </div>
            </div>
            <div className="container h-100">
                    <div className="col-sm-12" id="searchFormContainer">
                        <form class="form">
                            <div className="col-sm-12" id="searchForms">
                                <span id="smallBadge" className="badge badge-secondary">From</span>
                                <input id="locationTo" className="form-control form-control-lg" type="text" placeholder="your start position..."></input>
                            </div>
                            <div className="col-sm-12" id="searchForms">
                                <span id="smallBadge" className="badge badge-secondary">To</span>
                                <input id="locationFrom" className="form-control form-control-lg" type="text" placeholder="your destination..."></input>
                            </div>
                        </form>
                        <div className="col-sm-12" id="confirmTravelButton">
                            <button type="button" class="btn btn-success btn-lg">Get your result</button>
                        </div>   
                    </div> 
            
            </div>
            
                    
    </React.Fragment>
        
          );
    }
}
 
export default SearchTravel;