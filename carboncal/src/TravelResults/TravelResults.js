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

    saveUserTravel(id) {

      let allResults = this.props.model.allResults;
      for (var i in allResults){
          if (allResults[i].travelID === (id)){
            this.props.model.saveTravel(allResults[i]);
          }
      }
    }

    saveTravelCompare(travel){
      this.setState({
        compareButton: "btn btn-success"
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
      //console.log(typeof this.handleColor(3));
      //style för addtolist popup

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
                    <div key={travel.id+index} className = "col-sm-3" id="travelItemResult">

                     <div className="row d-flex" key={"point" + travel.id} id="start_end_text">
                          <div className="ml-1 mt-2">
                            <span id="startPoint"className="text-truncate p-1">{travel.startPoint}</span>
                            <i className="fas fa-arrow-right p-1"></i>
                            <span id="endPoint"className="text-truncate p-1">{travel.endPoint}</span>

                          </div>
                          <div>
                            <i className="d-flex justify-content-end" onClick={()=>this.props.model.removeResult(travel)} className="far fa-times-circle"></i>
                          </div>
                     </div>

                      <div className="badge badge-warning m-2 p-3" >
                        <span id="emission_text" ><CountUp end={travel.emission*1000} duration={5}/></span><br/>
                        <span id="co2Text">KG CO2/person</span>

                      </div>
                      <div className="row d-flex" >
                    <Tooltip id="carbon-per" className="m-2" placement="right" content={(100*(travel.emission/2)).toFixed(1)+"% of recomended carbon emission per year"} style={{width: "90%"}}>
                      <div className="progress">
                      <div id="progress-bar" className="progress-bar" role="progressbar" style={{width: travel.emission*100/2 + "%", backgroundColor: this.handleColor(travel.emission)}} aria-valuenow={travel.emission*100/2} aria-valuemin="0" aria-valuemax="100">{(100*(travel.emission/2)).toFixed(1)}%</div>
                      </div></Tooltip></div>
                     


                      <div className="col-sm-12 block">
                        <span class="badge badge-pill badge-secondary">
                          <span className="mr-2"><i className={travel.image} id="travelIcon" style={{backgroundColor: travel.color, borderColor: travel.color}}></i></span>
                          <span className="mr-2"id="distanceResult"><CountUp end={travel.distance} duration={5}/>  KM</span>
                        </span>
                        
                        <span class="badge badge-pill badge-secondary">
                          <span className="mr-2"><i className="fas fa-hiking" id="travelIcon" style={{backgroundColor: travel.color, borderColor: travel.color}}></i></span>
                          <span className="mr-2" id="distanceResult"><CountUp end={travel.numberOfTravelers} duration={5}/></span>
                        </span>
                      </div>
                      <div className="col-sm-12"> 
                          {/*<button type="button" onClick = {()=> {this.saveTravelCompare(travel)}} className="btn btn-info btn-lg">Compare</button>
                          <button type="button" onClick = {()=> {this.simpleDialog.show();this.saveUserTravel(travel.travelID)}} ref={(section) => { this.scrollTo = section; }} className="btn btn-info btn-lg">Add to My List</button>*/}
                          <Tooltip placement="left" content="Click to compare">
                          <i className="far fa-copy" onClick = {()=> {this.saveTravelCompare(travel)}}></i>
                          </Tooltip>
                          <Tooltip placement="right" content="Click to save travel">
                          <i className="far fa-plus-square" onClick = {()=> {this.simpleDialog.show();this.saveUserTravel(travel.travelID)}} ref={(section) => { this.scrollTo = section; }}></i>
                          </Tooltip>

                          <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Added to list"/>
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
        //import { AnimateOnChange } from '@nearform/react-animation';
        /*{<AnimateOnChange
          animationIn="bounceIn"
          animationOut="bounceOut"
          durationOut={800}>
      <i class="fas fa-dice-d6"></i>
       </AnimateOnChange>}
       <PieChart
                        data={[
                          { title: '', value: 2000-((travel.emission)*1000), color: this.handleColor(travel.emission)},
                          { title: (100*(travel.emission/2)).toFixed(2)+' % of recommended emissions per person per year', value: (travel.emission)*1000 , color: this.handleColor(travel.emission) }
                        ]}
                        x={100} y={100} radius={40} lineWidth={20} totalValue={2000} lengthAngle={-360}
                        />

       */
        return (
            <React.Fragment>
            <div key={"frame"} id="chooseRideContainer" className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="col-sm-12" id="chooseRideText">
                    <span><i id="infoSymbolThreeBig" className="fas fa-check-circle m-2"></i></span>
                    <span id="chooseTextBig">Your result</span>
                    <button id="compare_button" className={this.state.compareButton} onClick={() => {this.handleCompare()}}>{this.state.compareButtonText}</button>
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
//<h2>Distance: {travelList} km</h2>
// <span id="carbonResult">Carbon emission: TON CO2/person</span>

export default TravelResults;
