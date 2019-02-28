import React, { Component } from 'react';
class TravelTypes extends Component {
    constructor(){
    super();
    this.state = {
        types :[
        {
            id: "smallCarButton",
            image: "fas fa-car-side",
            value: "smallCar",
            text: "Small Car"
        },
        {
            id: "smallCarButton",
            image: "fas fa-shuttle-van",
            value: "mediumCar",
            text: "Medium Car"
        },
        {
            id: "largeCarButton",
            image: "fas fa-truck-moving",
            value: "largeCar",
            text: "Large Car"
        },
        {
            id: "planeButton",
            image: "fas fa-plane",
            value: "plane",
            text: "Plane"
        },
        {
            id: "trainButton",
            image: "fas fa-subway",
            value: "train",
            text: "Train"
        },
        {
            id: "shipButton",
            image: "fas fa-ship",
            value: "ship",
            text: "Ship"
        }]
    }
}


}
const travelTypesInstance = new TravelTypes();
export default travelTypesInstance;
