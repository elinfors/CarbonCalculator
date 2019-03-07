import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import './UserTravels.css';
import DragSortableList from 'react-drag-sortable'

class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            savedTravels: this.props.model.savedTravels,
        }
        }

    update(){
        this.setState({
          savedTravels: this.props.model.savedTravels,
         })
      }
  
      componentDidMount(){
        this.props.model.addObserver(this);
        this.setState({
          savedTravels: this.props.model.savedTravels,
         })
      }
    
    render() { 
        let userTravelList = null;
        userTravelList = this.state.savedTravels.map((travel,index) =>(
            {content: <div id={travel.id + "savedTravels"} className="container h-100">
                    
                        <div id="full_badge"className="badge badge-dark">
                        <div className="row justify-content-end">
                        <i id="delete_button"onClick={()=> this.props.model.removeSavedTravel(travel)} className="far fa-times-circle"></i>
                        </div>
                        <div className="row">
                        <span><i className={travel.image} id="travelIcon"style={{backgroundColor: travel.color, borderColor: travel.color, width: "70px", height:"70px", lineHeight: "2.8"}}></i></span>
                            
                            <span id="destinationResult" className="m-3">{travel.startPoint}</span>
                            <i className="fas fa-arrow-right m-2"></i>
                            <span id="destinationResult" className="m-3">{travel.endPoint}</span>
                            
                        <span id="carbonListItems" className="round round-lg">{travel.emission}</span>
                        </div>
                        </div>
                   
            </div>
        }
        
     
          
                   
               
            
        ));
     
        var placeholder = (
            <div className="placeholderContent">PLACEHOLDER</div>
        );
        var onSort = function(sortedList, dropEvent) {
            console.log("sortedList", sortedList, dropEvent);
         }
       
        
        
        return (
            <React.Fragment>
            <TopBar currentSavedTravels={this.props.model.savedTravels.length}></TopBar>
            <div id="item_block_container" className="container h-100">
            <div className="d-block p-2 text-white">
            <DragSortableList items={userTravelList} placeholder={placeholder} onSort={onSort} dropBackTransitionDuration={0.3} type="vertical"/>
            </div>
            </div>
            </React.Fragment>
          );
          
    }
   
}
 
export default UserList;