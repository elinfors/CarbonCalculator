import React, { Component } from 'react';
import './TravelResults.css';

class TravelResults extends Component {
    constructor(){
    super();
    this.state = {
      
    }
    }

    createOtbject(){
        let object = {
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
        this.props.model.getUserTravel()
          .then(distance => {
            this.setState({
              distance: distance.resourceSets[0].resources[0].travelDistance,
            });
            this.props.model.allResults.push(this.createOtbject());
          })
          .catch(() => {
            this.setState({
              status: "ERROR"
            });
          })  
          console.log(this.props.model.allResults);
        //console.log(this.props.model.list.map(data =>(data.resourceSets[0].resources[0].travelDistance)));
    }
   

    componentDidMount(){
        //this.update()
        this.props.model.addObserver(this);
    }

    render() { 
        let travelList = null;
        //console.log();
        //for (travel in this.props.model.allResults){
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
                <h2>Distance: {travelList} km</h2>
                <div className="d-flex justify-content-center h-100">
                    <span id="carbonResult">Carbon emission: TON CO2/person</span>
                </div>
              </div>
            </div>
            
            </React.Fragment>
           
          );
    }
}
 
export default TravelResults;


