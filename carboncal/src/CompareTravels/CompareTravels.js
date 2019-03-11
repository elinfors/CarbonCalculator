import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import './CompareTravels.css';

class CompareTravels extends Component {
    constructor(props){
    super(props);
    this.state = {
      status: "LOADING",
      id:"",
      compareTravels: this.props.model.compareTravels
    }
    }

    update(){
        this.setState({
            compareTravels: this.props.model.compareTravels,
           })
        scrollToComponent(this.scrollTo, { offset: 0, align: 'middle', duration: 200, ease:'inExpo'})
    }

    componentDidMount(){
        this.props.model.addObserver(this);
        this.setState({
          allResults: this.props.model.allResults,
          status: "LOADED"
         })
      }
  

    saveUserTravel(id) {

        let allResults = this.props.model.allResults;
        for (var i in allResults){
            if (allResults[i].travelID === (id)){
              this.props.model.saveTravel(allResults[i]);
            }
        }
      }

    render(){
        let travelList = null;
        switch (this.state.status){
            case "LOADING":
                travelList = <em> Loading... </em>;
                break;
            case "LOADED":
                travelList =  this.state.compareTravels.map((travel,index) =>(
                    <div key={travel.id+index} className = "col-sm-3" id="travelItemResult">
                    <div className="col-sm-12 justify-content-center mt-2" key={"point" + travel.id} id="start_end_text">
                        <span className="badge badge-pill badge-dark">{travel.startPoint}</span>
                        <br/>
                        <i className="fas fa-arrow-right m-2"></i>
                        <br/>
                        <span className="badge badge-pill badge-dark">{travel.endPoint}</span>
                      </div>
                      <div className="badge badge-warning m-2 p-3" id="emission_text">
                        <span > {travel.emission*1000} kgCO2</span>
                      </div>      
                      <div className="col-sm-12 block">
                        <span class="badge badge-pill badge-secondary">
                          <span className="mr-2"><i className={travel.image} id="travelIcon"style={{backgroundColor: travel.color, borderColor: travel.color}}></i></span>
                          <span className="mr-2"id="distanceResult">{travel.distance} km</span>
                        </span>
                      </div>
                      <div className="col-sm-12"> 
                          <button type="button" onClick = {()=> {this.simpleDialog.show();this.saveUserTravel(travel.travelID)}} ref={(section) => { this.scrollTo = section; }} className="btn btn-success btn-lg">Add to my travels</button>
                    </div>
                    </div>
                ))
            break;

            default:
                travelList = <b>Failed to load data, please try again</b>;
                }

                return(
                    <React.Fragment>
                        <span>{travelList}</span>
                    </React.Fragment>
                )
        }


}

export default CompareTravels;