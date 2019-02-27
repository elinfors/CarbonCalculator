import React, { Component } from 'react';
import './TravelResults.css';

class TravelResults extends Component {
    constructor(props){
    super(props);
    this.state = {
      status: "LOADING",
      type: this.props.type,
      start: this.props.start,
      end: this.props.end,
      emission: this.props.model.getCarbonEmission()

    }
    }

    createObject(){
        let object = {
            id: this.state.travelID,
            distance: this.state.distance,
            type: this.props.type,
            start: this.props.start,
            end: this.props.end,
            emission: this.props.model.getCarbonEmission()
        }
        return object;
    }

    update = () => {
        //console.log("travelResults" + this.props.model.getUserTravel()); 
        //this.props.model.getRoute()
        this.props.model.getUserTravel()
          .then(distance => {
            this.setState({
              distance: distance.resourceSets[0].resources[0].travelDistance,
              travelID: distance.resourceSets[0].resources[0].id,
              status: "LOADED"
            });
            this.props.model.allResults.push(this.createObject());
          })
          .catch(() => {
            this.setState({
              status: "ERROR"
            });
          })  
          console.log(this.props.model.allResults);
        //console.log(this.props.model.list.map(data =>(data.resourceSets[0].resources[0].travelDistance)));
    }
   

    componentWillMount(){
        this.update()
        this.props.model.addObserver(this);
    }

    render() { 
        let travelList = null;
        switch (this.state.status){
            case "LOADING":
                travelList = <em> Loading... </em>;
                break;
            case "LOADED":
                travelList =  this.props.model.allResults.map(travel =>(
                    <div key ={travel.id} className = "col-sm-4">
                    <div id="start_end_text"className = "col-sm-12">
                    {travel.start}<i className="fas fa-arrow-right"></i>{travel.end}
                    </div>
                    <div className="col-sm-12 block">
                    <div className="round round-lg">
                    <p>
                        <div id="emission_text">{travel.emission}</div>
                        <br/>
                        <div>CO2/person</div>
                        </p>
                    </div>
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
            <div id="chooseRideContainer" className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="col-sm-12" id="chooseRideText">
                    <span><i id="infoSymbolThreeBig" className="fas fa-check-circle m-2"></i></span>
                    <span id="chooseTextBig">Your result</span>
                    </div>
                </div>
            </div>
            <div className="container h-100">
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


