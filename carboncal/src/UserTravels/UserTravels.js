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
         })
      }
  
    componentDidMount(){
        console.log(this.state.directions)
        this.props.model.addObserver(this);
        this.setState({
          savedTravels: this.props.model.savedTravels,
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
        console.log(totalEmission);
    }
    
    render() { 
       
        let userTravelList = null;
        userTravelList = this.state.savedTravels.map((travel,index) =>(
             <div id={travel.id + "savedTravels"} className="container h-100">
                    
                        <div id="full_badge" className="badge badge-dark">
                        <div className="row justify-content-end">
                        <i id="delete_button"onClick={()=> this.props.model.removeSavedTravel(travel)} className="far fa-times-circle"></i>
                        </div>
                        <div className="row">
                        <span className="m-3">{travel.date}</span>
                        <span id="destinationResult" className="m-3">{travel.startPoint}</span>
                        <i id="rightArrow" className="fas fa-arrow-right m-2"></i>
                        <span id="destinationResult" className="m-3">{travel.endPoint}</span>
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
            {userTravelList}
            {this.calculateTotalEmission()}
            {/*<DragSortableList items= placeholder={placeholder} onSort={onSort} dropBackTransitionDuration={0.3} type="vertical"/>*/}
            </div>
            </div>
            </React.Fragment>
        
          );
          
    }
   
}
 
export default UserList;