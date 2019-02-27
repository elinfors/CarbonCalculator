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
        //console.log(this.props.model.allResults);
        //for (travel in this.props.model.getAllResults()){
        //    console.log(travel);
        //} 
        let carbonEmission = this.props.model.getCarbonEmission();
        return (
            <React.Fragment>
            <h2>Distance: {travelList} km</h2>
            <h2>Carbon emission: {carbonEmission} TON CO2/person</h2>
            </React.Fragment>
           
          );
    }
}
 
export default TravelResults;


