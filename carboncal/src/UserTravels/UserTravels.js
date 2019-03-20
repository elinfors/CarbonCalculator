import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import './UserTravels.css';
import DragSortableList from 'react-drag-sortable'
import { ReactBingmaps } from 'react-bingmaps';
import BarChartTravel from '../Charts/barChart';
import Tooltip from "react-simple-tooltip"


class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            savedTravels: this.props.model.savedTravels,
            directions: {
            wayPoints:[{address : ""},{address : ""}]},
            requestOptions: {maxRoutes:2,
            routeMode:"driving"},
            showResult:false,
            totalEmission: 0
            
            }

        }

    update(){

        this.setState({
          savedTravels: this.props.model.savedTravels,
          totalEmission: this.calculateTotalEmission(),
          NumberOfGlobes: this.calculateNumberOfGlobes(),
          restGlobes: this.getRestofGlobes(this.calculateNumberOfGlobes()),
         // typeEmission: this.getTypeEmission(this.state.savedTravels),
         })
      }

    componentDidMount(){
        console.log(this.state.directions)
        this.props.model.addObserver(this);
        this.setState({
          savedTravels: this.props.model.savedTravels,
          totalEmission: this.calculateTotalEmission(),
          NumberOfGlobes: this.calculateNumberOfGlobes(),
          restGlobes: this.getRestofGlobes(this.calculateNumberOfGlobes()),
         // typeEmission: this.getTypeEmission(this.state.savedTravels)
         })
      }

    handleMap(travel){
        this.state.showResult === false ?
        this.setState({
            directions: {
                wayPoints:[{address : travel.startPoint},{address : travel.endPoint}]
            },
            center: [travel.longitud,travel.latitud],
            showResult:true
           }):
        this.setState({
            showResult:false
           })
    }

    calculateTotalEmission(){
        let totalEmission = 0;
        this.state.savedTravels.map(travel =>(
            totalEmission += travel.emission
        ))
        return totalEmission;
        //console.log(this.totalEmission);
    }

    calculateNumberOfGlobes(){
        let totalEmission = 0;
        this.state.savedTravels.map(travel =>(
            totalEmission += travel.emission
        ))
        let NumberOfGlobes = totalEmission/2;

        return NumberOfGlobes;
    }

    getRestofGlobes(NumberOfGlobes){
        let rest = NumberOfGlobes - Math.floor(NumberOfGlobes)

        return(rest.toFixed(1));
    }

    createGlobes(NumberOfGlobes, rest){
        let globes = []

        for (var j = 1; j < NumberOfGlobes; j++){
            globes.push(<span id="globespan" ><i style= {{fontSize: '100px'}} className="fas fa-globe-americas"></i></span>)
        }
        if(rest > 0){
            let size = (100*rest);
            globes.push(<span id="globespan"><i style= {{fontSize: size+'px'}} className="fas fa-globe-americas"></i></span>)
        }
        return globes;
    }



    render() {
        let userTravelList = null;

        userTravelList = this.state.savedTravels.map((travel,index) =>(

                    <div id={travel.id + "savedTravels"}>
                        <div className="container" id="full_badge">
                            <div className="col-sm-12" id="itemListRow">
                                <span className="badge badge-secondary m-2">{travel.date}</span>
                                <i className="d-flex justify-content-end m-1" onClick={()=>this.props.model.removeSavedTravel(travel)} className="far fa-times-circle"></i>
                            </div>
                            <div id="destinationResultContainer"className="col-sm-12 justify-content-between">
                                <span className="m-2">
                                    <span className="mr-3">
                                    <i className={travel.image}></i>
                                    </span>
                                    <span id="destinationResult" className="">{travel.startPoint}</span>
                                    <span className=""><i id="rightArrow" className="fas fa-arrow-right"></i></span>
                                    <span id="destinationResult" className="">{travel.endPoint}</span>
                                </span>
                              
                            </div>
                            <div id="userTravelContainer" className="col-sm-12">
                             
                                <span id="carbonListItems" className="">{(travel.emission*1000).toFixed()}</span>
                                <br/>
                                <span id="carbonText"> KG CO2/person</span>

                               
                               
                            </div>
                            <div id="buttonRow"className="row justify-content-between">
                            
                                <button id="mapButton" className="btn btn-info m-2" onClick={() => this.handleMap(travel)}>
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span className="">Map</span>
                                </button>
                            </div>
                          
                            
                            
                            
                            {this.state.showResult?
                                <div id="mapContainer"className="col-sm-12" >
                                <div id="mapTwo">
                                        <ReactBingmaps
                                        className = "customClass"
                                        bingmapKey = "AlJeTIGD1dCPM4-OE_z9xDQohB4ll2vpaaEYv72_48tSOt--Jy_oY5UaFftaiXKp"
                                        center = {this.state.directions}
                                        directions =  {this.state.directions}
                                        requestOptions = {this.state.requestOptions}
                                        >
                                        </ReactBingmaps>
                                </div>
                                </div>:null}

            </div>
            </div>

        ));

        /*var placeholder = (
            <div className="placeholderContent">PLACEHOLDER</div>
        );
        var onSort = function(sortedList, dropEvent) {
            console.log("sortedList", sortedList, dropEvent)
         }*/



        return (

            <React.Fragment>
            <TopBar currentSavedTravels={this.props.model.savedTravels.length}></TopBar>
            <div id="item_block_container" className="container h-100">
                <div className="d-block p-2 text-white">
                    <div className="container h-100">
                        <div className="row">
                            <div className="col-sm-6">
                                {userTravelList}

            {/*<DragSortableList items= placeholder={placeholder} onSort={onSort} dropBackTransitionDuration={0.3} type="vertical"/>*/}
                            </div>
                            <div className="col-sm-6">
                                <div id="totalEmissionHeader" className="col-sm-12">
                                    <span id="totalEmissionHeaderText">Total C02 emission for this year</span>
                                    {/*{(this.state.totalEmission*1000).toFixed()}
                                    {(this.state.restGlobes)}*/}
                                   {/*} {Math.floor(this.state.NumberOfGlobes)}
                                    {this.state.restGlobes}*/}
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="row globes">
                                            <h2>You need {parseFloat(this.state.NumberOfGlobes).toFixed(1)} globes</h2>
                                        </div>
                                        <div className="row globes">
                                            {this.createGlobes(this.state.NumberOfGlobes, this.state.restGlobes)}
                                        </div>
                                        <div className="row globes">
                                            <BarChartTravel savedTravels = {this.state.savedTravels} model = {this.props.model}/>
                                        </div> 
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>

          );

    }
    }

export default UserList;
