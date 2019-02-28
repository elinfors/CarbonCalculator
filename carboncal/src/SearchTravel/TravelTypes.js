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
            text: "Small Car",
            color:"#EF9494"
        },
        {
            id: "smallCarButton",
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


{/*
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>

*/}