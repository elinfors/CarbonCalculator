import React, { Component } from 'react';
import CountUp from 'react-countup';
import './TravelResults.css';
import scrollToComponent from 'react-scroll-to-component';
import SkyLight from 'react-skylight';
import PieChart from 'react-minimal-pie-chart';
import CompareTravels from '../CompareTravels/CompareTravels';
import Tooltip from "react-simple-tooltip"




class TravelResults extends Component {
    constructor(props){
    super(props);
    this.state = {
      status: "LOADING",
      id:"",
      showCompare: false,
      compareButton: "btn btn-secondary",
      compareButtonText: "Compare Travels" 
    }
    }

    update(){
      this.setState({
        allResults: this.props.model.allResults,
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

    saveUserTravel(travel) {
      this.props.model.saveTravel(travel);
    }

    saveTravelCompare(travel){
      this.setState({
        compareButton: "btn btn-success",
        showCompare: true
       })
      this.props.model.saveCompare(travel);

    }

    handleColor(emission){ //Changes the Piechart color depending on emission
      if(emission > 2 ){
        return "#cc0000"
      }
      else{
        return  "#ffc300"
      }
    }

    handleCompare(){
      this.state.showCompare === false ? 
      this.setState({
        showCompare: true,
        compareButtonText: "Hide"
    }):
      this.setState({
        showCompare: false,
        compareButtonText: "Compare Travels"
    })

    }


    render() {

      var myBigGreenDialog = {
        backgroundColor: '#17a2b8',
        color: '#ffffff',
        width: '60%',
        height: '10%',
        left: '45%',
        minHeight: '50px',
        marginTop: '-300px',

      };

        let travelList = null;
        switch (this.state.status){
            case "LOADING":
                travelList = <em> Loading... </em>;
                break;
            case "LOADED":
                travelList =  this.state.allResults.map((travel,index) =>(
                    <div key={travel.id+index} className = "" id="travelItemResult">

                     <div className="col-sm-12" key={"point" + travel.id} id="start_end_text">
                            
                              <div className="m-1 float-left" style={{lineHeight: "1.5"}}>
                                <span id="startPoint"className="text-truncate p-1">{travel.startPoint}</span>
                                <i className="fas fa-arrow-right"></i>
                                <span id="endPoint"className="text-truncate p-1">{travel.endPoint}</span>
                              </div>
                              <div className="container justify-content-end">
                                <i className="far fa-times-circle d-flex justify-content-end" onClick={()=>this.props.model.removeResult(travel)}></i>
                              </div>

                     </div>
                     <div className="col-sm-12" >
                        <Tooltip  id="carbon-per" className="m-2" background= "rgba(54, 55, 56, 0.9)" border="none" radius="4" placement="right" content={(100*(travel.emission/2)).toFixed(1)+"% of recomended carbon emission per year"} style={{width: "90%"}}>
                          <div className="progress" style={{height: "25px"}}>
               
                          <div id="progress-bar" className="progress-bar" role="progressbar" style={{maxWidth: travel.emission*100/2 + "%", backgroundColor: this.handleColor(travel.emission)}} aria-valuenow={travel.emission*100/2} aria-valuemin="0" aria-valuemax="2000">
                          <span id="progress-bar-title" className="title">{(100*(travel.emission/2)).toFixed(1)}%</span>
                          </div>
                         </div>
                        </Tooltip>
                      </div>

                      <div className="badge badge-warning m-2 p-3" >
                        <span id="emission_text" ><CountUp end={travel.emission*1000} duration={5}/></span><br/>
                        <span id="co2Text">KG CO2/person</span>

                      </div>
                      

                      <div className="col-sm-12 block">
                        
                          <span className="mr-2"><i className={travel.image} id="travelIcon" style={{backgroundColor: travel.color, borderColor: travel.color}}></i></span>
                          <span className="mr-2"id="distanceResult"><CountUp end={travel.distance} duration={5}/>  km</span>
                  
                      
                      </div>
                      <div id="result_buttons"className="col-sm-12"> 
                          {/*<button type="button" onClick = {()=> {this.saveTravelCompare(travel)}} className="btn btn-info btn-lg">Compare</button>
                          <button type="button" onClick = {()=> {this.simpleDialog.show();this.saveUserTravel(travel.travelID)}} ref={(section) => { this.scrollTo = section; }} className="btn btn-info btn-lg">Add to My List</button>*/}   
                          <Tooltip class="compare_travel"placement="left" content="Click to compare" background= "rgba(54, 55, 56, 0.9)" border="none" radius="4">
                          <i className="far fa-copy" onClick = {()=> {this.saveTravelCompare(travel)}}></i>
                          </Tooltip>
                          <Tooltip placement="right" content="Click to save travel" background= "rgba(54, 55, 56, 0.9)" border="none" radius="4">
                          <i className="far fa-plus-square" onClick = {()=> {this.simpleDialog.show();this.saveUserTravel(travel)}} ref={(section) => { this.scrollTo = section; }}></i>
                          </Tooltip>
                          <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Added to list"/>
                    </div>
                   </div>
                ))
                break;
            default:
            travelList = <b>Failed to load data, please try again</b>;

        }

        return (
            <React.Fragment>
            <div key={"frame"} id="chooseRideContainer" className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="col-sm-12" id="chooseRideText">
                    <span><i id="infoSymbolThreeBig" className="fas fa-check-circle m-2"></i></span>
                    <span id="chooseTextBig">Your result</span>
                    {this.state.showCompare?
                    <button id="compare_button" className={this.state.compareButton} onClick={() => {this.handleCompare()}}>Hide</button>
                    :null}
                    </div>
                </div>
            </div>
            <div key={"travelList"} className="container h-100">
              <div className="col-sm-12" id="getResultContainer">
              {this.state.showCompare?
             <CompareTravels key={this.state.key} travelResults={this.state} model={this.props.model} ></CompareTravels>
            :null}
                   {travelList}
              </div>
            </div>

            

            </React.Fragment>

          );
    }
}


export default TravelResults;
