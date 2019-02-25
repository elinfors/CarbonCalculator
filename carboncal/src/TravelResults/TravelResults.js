import React, { Component } from 'react';

class TravelResults extends Component {
    constructor(){
    super();
    this.state = {  
    }
    }

    createOtbject(){
        let object = {
            travel: this.state.travel,
            type: this.props.type,
            start: this.props.start,
            end: this.props.end
        }
        return object;
    }

    update = () => {
        console.log("travelResults" + this.props.model.getUserTravel());
        this.props.model.getUserTravel()
          .then(travel => {
            this.setState({
              travel: travel.resourceSets[0].resources[0].travelDistance
            });
            this.props.model.list.push(this.createOtbject());
          })
          .catch(() => {
            this.setState({
              status: "ERROR"
            });
          })  
          console.log(this.props.model.list);
        //console.log(this.props.model.list.map(data =>(data.resourceSets[0].resources[0].travelDistance)));
    }

    componentDidMount(){
        //this.update()
        this.props.model.addObserver(this);
    }

    render() { 
        let travelList = this.state.travel;
        return (
            <React.Fragment>
            <h1>Hej</h1>
            <h2>{travelList}</h2>
            </React.Fragment>
           
          );
    }
}
 
export default TravelResults;


