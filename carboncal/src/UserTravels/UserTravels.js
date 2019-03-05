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
                    <div id="itemBlock"className="d-block p-2 text-white">
                        <div className="badge badge-pill badge-dark">
                            <span id="destinationResult" className="badge badge-primary badge m-3">{travel.startPoint}</span>
                            <i className="fas fa-arrow-right m-2"></i>
                            <span id="destinationResult" className="badge badge-primary badge m-3">{travel.endPoint}</span>
                        </div>
                        <span id="carbonListItems" className="round round-lg">{travel.emission}</span>
                        <span className={travel.image}></span>
                        <i onClick={()=> this.props.model.removeSavedTravel(travel)} class="far fa-times-circle"></i>
                     
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
            <TopBar/>
            <DragSortableList items={userTravelList} placeholder={placeholder} onSort={onSort} dropBackTransitionDuration={0.3} type="vertical"/>
            </React.Fragment>
          );
          
    }
   
}
 
export default UserList;