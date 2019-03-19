import { Component } from 'react';
class TravelTypes extends Component {
    constructor(){
    super();
    this.state = {
        types :[
        {
            id: "smallCarButton",
            image: "fas fa-car-side",
            value: "smallCar",
            text: "Small Car",
            color:"#EF9494",
        },
        {
            id: "mediumCarButton",
            image: "fas fa-shuttle-van",
            value: "mediumCar",
            text: "Medium Car",
            color:"#7FC3AA"
        },
        {
            id: "largeCarButton",
            image: "fas fa-truck-moving",
            value: "largeCar",
            text: "Large Car",
            color:"#C3B5EF"
        },
        {
            id: "planeButton",
            image: "fas fa-plane",
            value: "plane",
            text: "Plane",
            color:"#F5C573"
        },
        {
            id: "trainButton",
            image: "fas fa-subway",
            value: "train",
            text: "Train",
            color:"#FBB6F5"
        },
        {
            id: "shipButton",
            image: "fas fa-ship",
            value: "ship",
            text: "Ship",
            color:"#BBE1F8"
        }]
    }
}


}
const travelTypesInstance = new TravelTypes();
export default travelTypesInstance;
