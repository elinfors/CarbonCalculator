import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import TravelResults from '../TravelResults/TravelResults'
import './SearchTravel.css';
class SearchTravel extends Component {
    constructor(){
    super();
    this.state = {
       travelType: "",
       startPoint: "",
       endPoint: "",
       showMe:false,
       showResult: false

    }
    this.handleTravelStartPoint = this.handleTravelStartPoint.bind(this);
    this.handleTravelEndPoint = this.handleTravelEndPoint.bind(this);
}



showTheResult(){
    this.setState({showResult: true});
}


handleTravelType(selectedTravelType) {
    selectedTravelType === "smallCar"|| selectedTravelType === "mediumCar" || selectedTravelType === "largeCar" ? this.setState({
        travelType: selectedTravelType,
        showMe: true
    }) : this.setState({
        travelType: selectedTravelType,
        showMe: false
    }) ;
    
}

handleTravelStartPoint(event){
    this.setState({
        startPoint: event.target.value,
    });
}

handleTravelEndPoint(event){
    this.setState({
        endPoint: event.target.value,
    });
}

handleTravelSearch(){
    this.props.model.setUserTravel(this.state);
}


    render() {
        return (
      <React.Fragment>
            <TopBar></TopBar>
            <div id="chooseRideContainer" className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="col-sm-12" id="chooseRideText">
                        <span><i id="infoSymbolOneBig" className="fas fa-check-circle m-2"></i></span>
                        <span id="chooseTextBig">Choose your ride</span>
                    </div>
                </div>
            </div>
            <div className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="col-sm-12" id="vehicleSymbolContainer">
                        <div className="col-sm-2" id="chooseVehicleBox">
                            <button onClick={() => this.handleTravelType("smallCar")} id="smallCarButton" type="button" className="btn btn-danger btn-circle btn-xl m-4">
                                <i className="fas fa-car-side"></i>
                            </button>

                            <h5 className="badge badge-pill badge-light">Small car</h5>
                        </div>
                        <div className="col-sm-2" id="chooseVehicleBox">
                            <button onClick={() => this.handleTravelType("mediumCar")} id="mediumCarButton" type="button" className="btn btn-primary btn-circle btn-xl m-4">
                                <i className="fas fa-shuttle-van"></i>
                            </button>

                            <h5 className="badge badge-pill badge-light">Medium car</h5>
                        </div>
                        <div className="col-sm-2" id="chooseVehicleBox">
                            <button onClick={() => this.handleTravelType("largeCar")} id="largeCarButton" type="button" className="btn btn-success btn-circle btn-xl m-4">
                                <i className="fas fa-truck-moving"></i>
                            </button>
                            <h5 className="badge badge-pill badge-light">Large car</h5>
                        </div>
                        <div className="col-sm-2" id="chooseVehicleBox">
                            <button onClick={() => this.handleTravelType("plane")} id="planeButton" type="button" className="btn btn-info btn-circle btn-xl m-4">
                                <i className="fas fa-plane"></i>
                            </button>
                            <h5 className="badge badge-pill badge-light">Plane</h5>
                        </div>
                        <div className="col-sm-2" id="chooseVehicleBox">
                            <button onClick={() => this.handleTravelType("train")} id="trainButton" type="button" className="btn btn-info btn-circle btn-xl m-4">
                                <i className="fas fa-subway"></i>
                            </button>
                            <h5 className="badge badge-pill badge-light">Train</h5>
                        </div>
                        <div className="col-sm-2" id="chooseVehicleBox">
                            <button onClick={() => this.handleTravelType("ship")} id="shipButton" type="button" className="btn btn-info btn-circle btn-xl m-4">
                                <i className="fas fa-ship"></i>
                            </button>
                            <h5 className="badge badge-pill badge-light">Ship</h5>
                        </div>
                        {this.state.showMe?
                            <div className="col-sm-6" id="chooseNumberOfPeopleBox">
                            <span className="badge badge-dark" id="formText">Number of people:</span>
                            <form className="form-group" id="form-group">
                                <select className="custom-select" id="inlineFormCustomSelect">
                                    <option default="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </form>
                            </div>
                            :null}
                    </div>
                </div>
            </div>


            <div id="chooseRideContainer" className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="col-sm-12" id="chooseRideText">
                    <span><i id="infoSymbolTwoBig" className="fas fa-check-circle m-2"></i></span>
                    <span id="chooseTextBig">Choose your travel</span>
                    </div>
                </div>
            </div>
            <div className="container h-100">
                    <div className="col-sm-12" id="searchFormContainer">
                        <form className="form">
                            <div className="col-sm-12" id="searchForms">
                                <span id="smallBadge" className="badge badge-secondary">From</span>
                                <div id='printoutPanel'></div>
                                <input id="locationFrom" className="form-control form-control-lg" type="text" placeholder="Your start position..." onChange={this.handleTravelStartPoint}></input>
                            </div>
                        <div className="col-sm-12" id="searchForms">
                            <span id="smallBadge" className="badge badge-secondary">To</span>
                            <input id="locationTo" className="form-control form-control-lg" type="text" placeholder="Your destination..." onChange={this.handleTravelEndPoint}></input>
                        </div>
                    </form>
                    <div className="col-sm-12" id="confirmTravelButton">
                        <button type="button" className="btn btn-success btn-lg" onClick={() => {this.handleTravelSearch();this.showTheResult()}}>Get your result</button>
                    </div>
                </div>
            </div>

             <TravelResults model={this.props.model} type={this.state.travelType} start={this.state.startPoint} end={this.state.endPoint}/>
    </React.Fragment>

          );
    }
}
export default SearchTravel;
