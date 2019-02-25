import React, { Component } from 'react';

class TravelResults extends Component {
    constructor(){
    super();
    this.state = {  
        
    }
    }
    update = () => {
        console.log("travelResults" + this.props.model.getUserTravel());
        this.props.model.getUserTravel()
          .then(travel => {
            this.setState({
              travel: travel.resourceSets[0].resources[0].travelDistance
            });
            this.props.model.allResults.push(travel);
          })
          .catch(() => {
            this.setState({
              status: "ERROR"
            });
          })  
        //console.log(this.props.model.allResults.map(data =>(data.resourceSets[0].resources[0].travelDistance)));
    }

    componentDidMount(){
        //this.update()
        this.props.model.addObserver(this);
    }

    render() { 
        let travelList = this.state.travel;
        return (
            <React.Fragment>
            <h2>{travelList}</h2>
            </React.Fragment>
           
          );
    }
}
 
export default TravelResults;