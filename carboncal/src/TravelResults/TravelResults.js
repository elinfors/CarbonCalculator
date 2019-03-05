import React, { Component } from 'react';
import CountUp from 'react-countup';
import './TravelResults.css';
import PieChart from 'react-minimal-pie-chart';
import Legend from 'react-minimal-pie-chart';


class TravelResults extends Component {
    constructor(props){
    super(props);
    this.state = {
      status: "LOADING",
      id:"",
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

    saveUserTravel(id) {

      let allResults = this.props.model.allResults;
      for (var i in allResults){
          if (allResults[i].id === (id)){
            this.props.model.saveTravel(allResults[i]);
          }
      }
    }




    render() {
        let travelList = null;
        switch (this.state.status){
            case "LOADING":
                travelList = <em> Loading... </em>;
                break;
            case "LOADED":
                travelList =  this.state.allResults.map((travel,index) =>(
                    <div key={travel.id+index} className = "col-sm-3" id="travelItemResult">
                      <div className="row">
                       <i onClick={()=>this.props.model.removeResult(travel)} className="far fa-times-circle"></i>
                      </div>
                      <div key={"point" + travel.id} id="start_end_text">

                     
                      <span className="badge badge-pill badge-secondary">{travel.startPoint}</span>
                      <br/>
                      <i className="fas fa-arrow-right"></i><br/>
                      <span className="badge badge-pill badge-secondary">{travel.endPoint}</span>
                      </div>
                      <div className="col-sm-12 block">
                        <div key={"emission_text"+travel.id} id="emission_text">
                          <CountUp end={travel.emission*1000} duration={5}/> KG CO2
                        </div>
                      </div>
                      <PieChart
                        data={[
                          
                          { title: 'One', value: 2000-((travel.emission)*1000), color:'#f7c5c5'},
                          { title: 'Two', value: (travel.emission)*1000 , color: '#e80003' } 
                        ]}
                        x={100} y={100} radius={40} lineWidth={20} totalValue={2000} lengthAngle={-360}
                        />
                      <div className="col-sm-12 block">
 
                      <div className="col-sm-12">
                        <span><i className={travel.image} id="travelIcon"style={{backgroundColor: travel.color, borderColor: travel.color}}></i></span>
                          <div className="badge badge-warning m-2 p-3" id="travelDistanceButton">
                            <span id="distanceResult">{travel.distance} km</span>
                          </div>
                      </div>
                      </div>
                      <div className="col-sm-12">
                          <button type="button" onClick = {()=> this.saveUserTravel(travel.id)} className="btn btn-success btn-lg">Add to my travels</button>
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
                   {travelList}

              </div>
            </div>

            </React.Fragment>

          );
    }
}
//<h2>Distance: {travelList} km</h2>
// <span id="carbonResult">Carbon emission: TON CO2/person</span>

export default TravelResults;
