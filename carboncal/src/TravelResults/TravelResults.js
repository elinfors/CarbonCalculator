import React, { Component } from 'react';
import CountUp from 'react-countup';
import './TravelResults.css';
import scrollToComponent from 'react-scroll-to-component';
import SkyLight from 'react-skylight';


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

    handleColor(emission){ //Changes the Piechart color depending on emission
      if(emission > 2 ){
        return "#000000"
      }
      else{
        return  "#f7c5c5"
      }
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
                        
                        
                      <div className="col-sm-12 block">
                        <span class="badge badge-pill badge-secondary">
                          <span className="mr-2"><i className={travel.image} id="travelIcon"style={{backgroundColor: travel.color, borderColor: travel.color}}></i></span>
                          <span className="mr-2"id="distanceResult"><CountUp end={travel.distance} duration={5}/>  KM</span>
                        </span>
                      </div>
                      <div className="col-sm-12">
                          <button type="button" onClick = {()=> {this.simpleDialog.show();this.saveUserTravel(travel.travelID)}} ref={(section) => { this.scrollTo = section; }} className="btn btn-success btn-lg">Add to my travels</button>
                          <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Added to list">
                          </SkyLight>
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
       
       */
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
