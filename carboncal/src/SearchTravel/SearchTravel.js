import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import TravelResults from '../TravelResults/TravelResults'
import travelTypesInstance from '../Data/TravelTypes'
import Autocomplete from 'react-google-autocomplete';
import './SearchTravel.css';

class SearchTravel extends Component {
    constructor(){
    super();
    this.state = {
       travelType: "smallCar",
       startPoint: "Stockholm",
       endPoint: "Luleå",
       numberOfTravelers: 1,
       showCarPassengers:false,
       addMorePassengers:false,
       showResult: false,
       showWarning: false,
       warning: ""
    }
    this.handleTravelSearch = this.handleTravelSearch.bind(this)
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

handleTravelType(travelType){
   travelTypesInstance.state.types.map(types => (types.value === travelType.value? types.zoom = 1.1 : types.zoom = 1))
   travelType.value === "smallCar"|| travelType.value === "mediumCar" || travelType.value === "largeCar" ? this.setState({
        travelType: travelType.value,
        showCarPassengers: true,
        addMorePassengers:false,
        image: travelType.image,
        text: travelType.text,
        color: travelType.color,
        showZoom: travelType.value,
        showWarning: false
    }) : this.setState({
        travelType: travelType.value,
        numberOfTravelers: 1,
        showCarPassengers: false,
        addMorePassengers:false,
        image: travelType.image,
        text: travelType.text,
        color: travelType.color,
        showZoom: travelType.value,
        showWarning: false
    });
}

handleTravelStartPoint = (places) => {
    console.log(places)
    this.setState({
        startPoint: places.address_components[0].long_name + "," + places.address_components.slice(-1)[0].long_name,
        showWarning: false
    });
}

handleTravelEndPoint = (places) => {
    console.log(places)
    this.setState({
        endPoint: places.address_components[0].long_name + "," + places.address_components.slice(-1)[0].long_name,
        showWarning: false
    });
}

handleNumberOfTravelers = (event) => {
    this.setState({
        numberOfTravelers: event.target.value,
    })
}

remindUser(){
    
    if (this.state.travelType === ""){
        this.setState({
            warning: "Enter your type of ride!",
            showWarning: true 
        })  
    }
    else if(this.state.startPoint === ""){
        this.setState({
            warning: "Enter your start point!",
            showWarning: true
        })
    }
    else if(this.state.endPoint === ""){
        this.setState({
            warning: "Enter where your going!",
            showWarning: true
        })  
    }
    else{
        this.handleTravelSearch()
    }
}

handleTravelSearch(){
    this.props.model.setUserTravel(this.state);
    this.setState({
        showResult: true,
        showWarning: false
    });
}
    render() {
        let travelTypes = travelTypesInstance.state.types.map(types =>(
            <div key={types.id} className="col-sm-2" id="chooseVehicleBox"> 
                <button onClick={() => this.handleTravelType(types)} id={types.value + "Button"} type="button" className="btn btn-danger btn-circle btn-xl m-4" style={{backgroundColor: types.color, borderColor: types.color, zoom:types.zoom}}>
                <i className={types.image}></i>
                </button>
                <h5 className="badge badge-pill badge-light">{types.text}</h5>
            </div>
            ));
            let carTravelersList = travelTypesInstance.state.types.map((types,index) =>(
                <div key={"carTraver" + types.id} id="numberOfCarTravelers">
                    <button onClick={this.handleNumberOfTravelers} value={index + 1} className="btn btn-danger btn-circle btn-l m-2">{index + 1}</button>
                </div>
            ));
            carTravelersList[7] =  <div key={"carTraver" + 7} id="numberOfCarTravelers">
            <button onClick={() => this.setState({addMorePassengers:true})} className="btn btn-danger btn-circle btn-l m-2">+</button>
            </div>
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
                        {this.state.showCarPassengers?
                            <div className="col-sm-6" id="chooseNumberOfPeopleBox">
                                <h6>How many will you be in the {this.state.text}?</h6>
                                {carTravelersList}
                                    {this.state.addMorePassengers?
                                        <form className="form-group" id="form-group">
                                            <h6>Are you even more?</h6>
                                            <input className="form-control" id="inlineFormCustomSelect" type="number" min="1" max="10" value={this.state.numberOfTravelers} onChange={this.handleNumberOfTravelers}></input>
                                        </form>:null}
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
                {this.state.showWarning?
                    <div className="container h-100">
                        <div className="p-3 mb-2 bg-danger text-white" id="remindUser">
                            <span>{this.state.warning}</span>
                        </div>
                    </div>:null}
            </div>
            <div className="container h-100">
                    <div className="col-sm-12" id="searchFormContainer">
                        <form className="form">
                            <div className="col-sm-12" id="searchForms">
                                <span id="smallBadge" className="badge badge-secondary">From</span>
                                {/*<input id="locationFrom" className="form-control form-control-lg" autoComplete="off" type="text" placeholder="Your start position..." onChange={this.handleTravelStartPoint}></input>*/}
                                <Autocomplete style={{width:"100%",fontSize:"20px",marginTop:"10px"}}  onPlaceSelected={(place) => {this.handleTravelStartPoint(place);}}types={['(regions)']}/>
                            </div>
                            <div className="col-sm-12" id="searchForm">
                                <span id="smallBadge" className="badge badge-secondary">To</span>
                            {/*<input id="locationTo" className="form-control form-control-lg" autoComplete="off" type="text" placeholder="Your destination..." onChange={this.handleTravelEndPoint}></input>*/}
                                <Autocomplete style={{width:"100%",fontSize:"20px",marginTop:"10px"}}  onPlaceSelected={(place) => {this.handleTravelEndPoint(place);}}types={['(regions)']}/>
                        </div>
                    </form>
                    <div className="col-sm-12" id="confirmTravelButton">
                        <button type="button" className="btn btn-success btn-lg" onClick={() => this.remindUser()}>Get your result</button>
                    </div>
                </div>
                
            </div>
            
            {this.state.showResult?
                <TravelResults model={this.props.model}/>
            :null}
             </React.Fragment>

          );
    }
}
export default SearchTravel;
