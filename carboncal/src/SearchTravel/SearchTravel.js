import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import TravelResults from '../TravelResults/TravelResults'
import travelTypesInstance from './TravelTypes'
import Autocomplete from 'react-google-autocomplete';
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
       showResult: false,
       showZoom: "",
    }
}

update(){
    this.setState({
      savedTravels: this.props.model.savedTravels,
     })
  }

componentDidMount(){
    this.props.model.addObserver(this);
    this.setState({
      savedTravels: this.props.model.savedTravels,
     })
  }

<<<<<<< HEAD
handleTravelType(event,travelType) {
   // this.state.showZoom === travelType.value?
   // event.target.style.zoom = 1.1 : event.target.style.zoom = 1
=======
handleTravelType(travelType) {
   travelTypesInstance.state.types.map(types => (types.value === travelType.value? types.zoom = 1.1 : types.zoom = 1))
>>>>>>> parent of 778e56c... Compare
    document.getElementById('remindUser').style.visibility = "hidden";
    travelType.value === "smallCar"|| travelType.value === "mediumCar" || travelType.value === "largeCar" ? this.setState({
        travelType: travelType.value,
        showMe: true,
        image: travelType.image,
        text: travelType.text,
        color: travelType.color,
        showZoom: travelType.value
    }) : this.setState({
        travelType: travelType.value,
        numberOfTravelers: 1,
        showMe: false,
        image: travelType.image,
        text: travelType.text,
        color: travelType.color,
        showZoom: travelType.value
    });
}

handleTravelStartPoint = (places) => {
    console.log(places)
    this.setState({
        startPoint: places.address_components[0].long_name + "," + places.address_components.slice(-1)[0].long_name,
    });
}

handleTravelEndPoint = (places) => {
    console.log(places)
    this.setState({
        endPoint: places.address_components[0].long_name + "," + places.address_components.slice(-1)[0].long_name,
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
        showMe: false,
    });
}
    render() {
        let travelTypes = null;
        travelTypes = travelTypesInstance.state.types.map(types =>(
            <div key={types.id} className="col-sm-2" id="chooseVehicleBox"> 
                <button onClick={(e) => this.handleTravelType(e,types)} id={types.value + "Button"} type="button" className="btn btn-danger btn-circle btn-xl m-4" style={{backgroundColor: types.color, borderColor: types.color}}>
                <i className={types.image}></i>
                </button>
                <h5 className="badge badge-pill badge-light">{types.text}</h5>
            </div>
            ));
        return (
      <React.Fragment>

            <TopBar currentSavedTravels={this.props.model.savedTravels.length}/>
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
                            <form className="form-group" id="form-group">
                                <input className="form-control" id="inlineFormCustomSelect" placeholder="Type number of people in the car"onChange={this.handleNumberOfTravelers}></input>
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
                                {/*<input id="locationFrom" className="form-control form-control-lg" autoComplete="off" type="text" placeholder="Your start position..." onChange={this.handleTravelStartPoint}></input>*/}
                                <Autocomplete style={{width:"100%",marginTop:"10px"}}  onPlaceSelected={(place) => {this.handleTravelStartPoint(place);}}types={['(regions)']}/>
                            </div>
                            <div className="col-sm-12" id="searchForm">
                            <span id="smallBadge" className="badge badge-secondary">To</span>
                            {/*<input id="locationTo" className="form-control form-control-lg" autoComplete="off" type="text" placeholder="Your destination..." onChange={this.handleTravelEndPoint}></input>*/}
                                <Autocomplete style={{width:"100%",marginTop:"10px"}}  onPlaceSelected={(place) => {this.handleTravelEndPoint(place);}}types={['(regions)']}/>
                        </div>
                    </form>
                    <div className="col-sm-12" id="confirmTravelButton">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 778e56c... Compare
                        <button type="button" className="btn btn-success btn-lg" onClick={() => {this.state.travelType === "" ?this.remindUser():this.handleTravelSearch()}}>Get your result</button>
                    </div>
                    <div className="col-sm-12">
                    <div className="p-3 mb-2 bg-danger text-white" id="remindUser"></div>
<<<<<<< HEAD
=======
                        <button type="button" className="btn btn-success btn-lg" onClick={() => this.remindUser()}>Get your result</button>
>>>>>>> parent of b0d2653... Flygresor.se
=======
>>>>>>> parent of 778e56c... Compare
=======
                        <button type="button" className="btn btn-success btn-lg" onClick={() => this.remindUser()}>Get your result</button>
>>>>>>> parent of b0d2653... Flygresor.se
=======
                        <button type="button" className="btn btn-success btn-lg" onClick={() => this.remindUser()}>Get your result</button>
>>>>>>> parent of b0d2653... Flygresor.se
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
