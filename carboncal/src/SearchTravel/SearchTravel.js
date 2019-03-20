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
       warning: "",
    
    }
    this.handleTravelSearch = this.handleTravelSearch.bind(this)
}


update(){
    this.setState({
        savedTravelsLength: this.props.model.savedTravels.length,
     })
  }

componentDidMount(){
    this.props.model.addObserver(this);
    this.setState({
        savedTravelsLength: this.props.model.savedTravels.length,
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
            <div key={types.id} className="col-xs-1" id="chooseVehicleBox">
                <div className="col-sm-12" id="vehicleSymbolContainer">
                    <button id="vehicleCircle" onClick={() => this.handleTravelType(types)} id={types.value + "Button"} type="button" className="btn btn-danger btn-circle btn-xl m-3" style={{backgroundColor: types.color, borderColor: types.color, zoom:types.zoom}}>
                        <i id="imageType" className={types.image}></i>
                    </button>
                </div>
                <div className="col-sm-12">
                    <h5 id="symbolText" className="badge badge-pill badge-light">{types.text}</h5>
                </div>
            </div>
            ));
            let carTravelersList = travelTypesInstance.state.types.map((types,index) =>(
                <div key={"carTraver" + types.id} id="numberOfCarTravelers">
                    <button id="addPassengers" onClick={this.handleNumberOfTravelers} value={index + 1} className="btn btn-secondary btn-l">{index + 1}</button>
                </div>
            ));
            carTravelersList[7] =  <div key={"carTraver" + 7} id="numberOfCarTravelers">
            <button id="addPassengers" onClick={() => this.setState({addMorePassengers:true})} className="btn btn-secondary btn-l">+</button>
            </div>
        return (
      
      <React.Fragment>
            <TopBar currentSavedTravels={this.props.model.savedTravels.length}/>
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
                <nav className="navbar navbar-expand-lg" id="vehicleNavbar">
                        <button id="arrowDownButton" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                            <span><i className="fas fa-sort-down"></i></span>
                        </button>  
                        <div className="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo02">
                            {travelTypes}
                            
                        </div>
                        
                </nav>
                {this.state.showCarPassengers?
                                <div className="col-sm-6" id="chooseNumberOfPeopleBox">
                                    <h6 id="numberOfPeopleText">Total number of people in the {this.state.text}:</h6>
                                        <span>
                                        <i id="peopleIcon"class="fas fa-male"></i>
                                        {carTravelersList}
                                        </span>
                                        {this.state.addMorePassengers?
                                        <form className="form-group" id="form-group">
                                            <h6 id="numberOfPeopleText">Are you even more?</h6>
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
                        <button type="button" className="btn btn-info btn-lg" onClick={() => this.remindUser()}>Get your result</button>
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
