import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import TravelResults from '../TravelResults/TravelResults'
import travelTypesInstance from './TravelTypes'
import './SearchTravel.css';
class SearchTravel extends Component {
    constructor(){
    super();
    this.state = {
       travelType: "",
       startPoint: "",
       endPoint: "",
       numberOfTravelers: 1,
       showMe:false,
       showResult: false
    }
}

handleTravelType(travelType) {
    let selectedTravelType = travelType.value;
    document.getElementById('remindUser').style.visibility = "hidden";
    selectedTravelType === "smallCar"|| selectedTravelType === "mediumCar" || selectedTravelType === "largeCar" ? this.setState({
        travelType: selectedTravelType,
        showMe: true,
        image: travelType.image,
        text: travelType.text,
    }) : this.setState({
        travelType: selectedTravelType,
        numberOfTravelers: 1,
        showMe: false,
        image: travelType.image,
        text: travelType.text
    }) ;   
}

handleTravelStartPoint = (event) => {
    this.setState({
        startPoint: event.target.value,
    });
}

handleTravelEndPoint = (event) => {
    this.setState({
        endPoint: event.target.value,
    });
}

handleNumberOfTravelers = (event) => {
    this.setState({
        numberOfTravelers: event.target.value,
    })
}

remindUser(){
    let remindUser = document.getElementById('remindUser');
    remindUser.innerHTML ='You forgot to choose a ride!' ;
    remindUser.style.visibility = "visible" ;
}

handleTravelSearch(){
    this.props.model.setUserTravel(this.state);
    this.setState({
        showResult: true,
    });
}
    render() {
        let travelTypes = null;
        travelTypes = travelTypesInstance.state.types.map(types =>(
            <div key={types.id} className="col-sm-2" id="chooseVehicleBox">
                <button onClick={() => this.handleTravelType(types)} id={types.value + "Button"} type="button" className="btn btn-danger btn-circle btn-xl m-4">
                <i className={types.image}></i>
                </button>
                <h5 className="badge badge-pill badge-light">{types.text}</h5>
            </div>
            ));
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
                        {travelTypes}
                        {this.state.showMe?
                            <div className="col-sm-6" id="chooseNumberOfPeopleBox">
                            <span className="badge badge-dark" id="formText">Number of people:</span>
                            <form className="form-group" id="form-group">
                                <select className="custom-select" id="inlineFormCustomSelect" onChange={this.handleNumberOfTravelers}>
                                    <option value="1">1</option>
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
                                <div id='printoutPanelFrom'></div>
                                <input id="locationFrom" className="form-control form-control-lg" autoComplete="off" type="text" placeholder="Your start position..." onClick={this.handleTravelStartPoint}></input>
                            </div>
                        <div className="col-sm-12" id="searchForm">
                            <div id='printoutPanelTo'></div>
                            <span id="smallBadge" className="badge badge-secondary">To</span>
                            <input id="locationTo" className="form-control form-control-lg" autoComplete="off" type="text" placeholder="Your destination..." onClick={this.handleTravelEndPoint}></input>
                        </div>
                    </form>
                    <div className="col-sm-12" id="confirmTravelButton">
                        <button type="button" className="btn btn-success btn-lg" onClick={() => {this.state.travelType === "" ?this.remindUser():this.handleTravelSearch()}}>Get your result</button>
                    </div>
                    <div className="col-sm-12">
                    <div className="p-3 mb-2 bg-danger text-white" id="remindUser"></div>
                    </div>
                </div>
            </div>

            {this.state.showResult?
             <TravelResults key={this.state.key} model={this.props.model} ></TravelResults>
            :null}
             </React.Fragment>

          );
    }
}
export default SearchTravel;
