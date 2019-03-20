//* Component for camparing travels
//* Each travel you have searched for with a specific traveltype, 
//* you can click the "comparebutton" to get a new view with the CO2 emission for every traveltype

import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import travelTypesInstance from '../Data/TravelTypes';
import CountUp from 'react-countup';
import './CompareTravels.css';

class CompareTravels extends Component {
    constructor(props){
    super(props);
    this.state = {
      id:"",
      compareTravels: this.props.model.compareTravels
    }
    }

    update(){
        this.setState({
            compareTravels: this.props.model.compareTravels,
           })
        //* Npm package that scrolls to the new view when button is clicked 
           
        scrollToComponent(this.scrollTo, { offset: 0, align: 'middle', duration: 200, ease:'inExpo'})
        console.log(this.state.compareTravels);
    }

    componentDidMount(){
        this.props.model.addObserver(this);
        this.setState({
          compareTravels: this.props.model.compareTravels,
         })
      }


    render(){
        let travelList = null;
                travelList =  <div key="compareTravelsResult" className="col-sm-12" id="compareTravelsResult">
                  <table className="table table-dark">
                  <thead>
                    <tr>
                      <th>Rides</th>
                      {travelTypesInstance.state.types.map(travelType =>(
                       <th style={{textAlign:"center", backgroundColor: travelType.color, borderColor: travelType.color}}><i className={travelType.image}> {travelType.text}</i></th>
                      ))}
                      <th><i className="fas fa-trash"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.compareTravels.map(travel => (
                    <tr>
                      <th> {travel.startPoint} <i id="rightArrow" className="fas fa-arrow-right m-2"></i> {travel.endPoint} (KG C02/person)</th>
                      {travel.AllTravelTypeEmission.map(emission => ( 
                      <td> {emission === travel.maxEmission ? <span className="text-danger">{<CountUp end={emission*1000} duration={3}/>}</span> : emission === travel.minEmission ? <span className="text-success"><CountUp end={emission*1000} duration={3}/></span> : <CountUp end={emission*1000} duration={3}/> }</td>))}
                      <td><i onClick={()=>this.props.model.removeComparedTravel(travel)} className="fas fa-ban"></i></td>
                    </tr>
                     ))}
                  </tbody>
                </table>
                </div>
              
               
                return(
                    <React.Fragment>
                        <span>{travelList}</span>
                    </React.Fragment>
                )
        }


}

export default CompareTravels;