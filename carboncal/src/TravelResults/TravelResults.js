import React, { Component } from 'react';
import CountUp from 'react-countup';
import './TravelResults.css';

class TravelResults extends Component {
    constructor(props){
    super(props);
    this.state = {
      status: "LOADING",
    }
    }

    update(){
      this.setState({
        allResults: this.props.model.allResults,
       })
    }
   
    componentDidMount(){
      this.props.model.addObserver(this);
      this.setState({
        allResults: this.props.model.allResults,
        status: "LOADED"
       })
    }

    render() { 
        let travelList = null;
        switch (this.state.status){
            case "LOADING":
                travelList = <em> Loading... </em>;
                break;
            case "LOADED":
                travelList =  this.state.allResults.map((travel,index) =>(
                    <div key={travel.id+index} className = "col-sm-4">
                      <div key={"point" + travel.id} id="start_end_text"className = "col-sm-12">
                      {travel.startPoint}<i className="fas fa-arrow-right"></i>{travel.endPoint}
                      </div>
                      <div  className="col-sm-12 block">
                      <div  className="round round-lg">
                          <div key={"emission_text"+travel.id} id="emission_text">
                          <CountUp end={travel.emission*1000} duration={5}/> KG CO2
                          </div>
                      </div>
                      <div  className="round round-lg m-2">
                          <CountUp end={travel.distance} duration={5}/> KM
                          </div>
                      <div className="btn btn-danger btn-circle btn-xl m-4">
                            <i className={travel.image}></i>
                          </div>
                      <h5 className="badge badge-pill badge-light">{travel.text}</h5>
                      </div>
                      <div className="col-sm-12">
                          <button type="button" className="btn btn-success btn-lg">Add to my travels</button>
                    </div> 
                   </div>
                ))
                break;
            default:
            travelList = <b>Failed to load data, please try again</b>;
        
        }
        //   
        //} 
        //let classes = "badge m-2 badge-";
        //classes += (this.props.model.getCarbonEmission() > 0.004) ? "danger" : "success";
        //let travelList = this.state.travel;
        //let carbonEmission = this.props.model.getCarbonEmission();
        return (
            <React.Fragment>
            <div key={"frame"} id="chooseRideContainer" className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="col-sm-12" id="chooseRideText">
                    <span><i id="infoSymbolThreeBig" className="fas fa-check-circle m-2"></i></span>
                    <span id="chooseTextBig">Your result</span>
                    </div>
                </div>
            </div>
            <div key={"travelList"} className="container h-100">
              <div className="col-sm-12" id="getResultContainer">
                <div className="d-flex justify-content-center h-100">
                   {travelList}
                </div>
              </div>
            </div>
            
            </React.Fragment>
           
          );
    }
}
//<h2>Distance: {travelList} km</h2>
// <span id="carbonResult">Carbon emission: TON CO2/person</span>
 
export default TravelResults;


