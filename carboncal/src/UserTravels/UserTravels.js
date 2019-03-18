import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import './UserTravels.css';
import DragSortableList from 'react-drag-sortable'
import { ReactBingmaps } from 'react-bingmaps';

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
          totalEmission: this.calculateTotalEmission()
         })
      }
  
    componentDidMount(){
        console.log(this.state.directions)
        this.props.model.addObserver(this);
        this.setState({
          savedTravels: this.props.model.savedTravels,
          totalEmission: this.calculateTotalEmission(),
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
      
    
      
    
    render() { 
       
        let userTravelList = null;
       
        userTravelList = this.state.savedTravels.map((travel,index) =>(
           
                    <div id={travel.id + "savedTravels"}>
                        <div id="full_badge">
                            <div className="col-sm-12" id="itemListRow">
                                <span className="m-2">{travel.date}</span>
                                <span className="m-2">
                                    <span id="destinationResult" className="">{travel.startPoint}</span>
                                    <span className=""><i id="rightArrow" className="fas fa-arrow-right"></i></span>
                                    <span id="destinationResult" className="">{travel.endPoint}</span>
                                </span>
                                <span><i id="delete_button"onClick={()=> this.props.model.removeSavedTravel(travel)} className="m-2 far fa-times-circle"></i></span>
                            </div>
                            <div className="col-sm-12">
                                <span><i className={travel.image} id="travelIconInUserTravel"style={{backgroundColor: travel.color, borderColor: travel.color, width: "70px", height:"70px", lineHeight: "3.5"}}></i></span>
                                <span id="carbonListItems" className="round round-lg">{travel.emission}</span>
                                <button className="btn btn-info justify-content-center" onClick={() => this.handleMap(travel)}>
                                    <i class="fas fa-th-list mr-2">Show Map</i>
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
            {this.state.totalEmission}
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