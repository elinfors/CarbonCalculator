import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
/*
const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];
static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';
*/
/*
const data = [
    {name: <span><i class="fas fa-globe-europe"></i></span>, pv: 40, amt: 2400,},
    {name: 'Average Travels', pv: 50, amt: 2400,},
    {name: 'Recomended', pv: 70, amt: 2400,}
  ];
*/

class BarChartTravel extends Component {
    constructor(props) {
        super(props);
        this.getTypeEmission = this.getTypeEmission.bind(this)
        this.state = {
          smallCar:0,
          mediumCar:0,
          largeCar:0,
          plane:0,
          train:0
        }
    }

    update(){
      this.getTypeEmission();
    }

    componentDidMount(){
      this.props.model.addObserver(this);
      this.getTypeEmission();
    }
  
    getTypeEmission(){
  
      let smallCarEmission, mediumCarEmission, largeCarEmission, planeEmission, trainEmission;
      smallCarEmission = mediumCarEmission = largeCarEmission = planeEmission = trainEmission = 0;
      let travels = this.props.savedTravels;

      for (var i in travels){
          if(travels[i].travelType == "smallCar"){
              smallCarEmission += travels[i].emission; 
          }
          else if(travels[i].travelType == "mediumCar"){
              mediumCarEmission += travels[i].emission;
          }
          else if(travels[i].travelType == "largeCar"){
              largeCarEmission += travels[i].emission;
          }
          else if(travels[i].travelType == "plane"){
              planeEmission += travels[i].emission;
          }
          else if(travels[i].travelType == "train"){
              trainEmission += travels[i].emission;
          }
      }
      this.setState({
        smallCar: smallCarEmission,
        mediumCar: mediumCarEmission,
        largeCar: largeCarEmission,
        plane: planeEmission,
        train: trainEmission
      })
    }
  
    setData(){
      let data = [
      {name: 'Small Car', pv: 1000*this.state.smallCar, amt: 2400,},
      {name: 'Medium', pv: 1000*this.state.mediuCarm, amt: 2400,},
      {name: 'Large Car', pv: 1000*this.state.largeCar, amt: 2400,},
      {name: 'Plane', pv: 1000*this.state.plane, amt: 2400,},
      {name: 'Train', pv: 1000*this.state.train, amt: 2400,}
    ];
      return data
    }   
  

  render() {
   //console.log("HÄÄÄR"+this.state.smallCar);
    return (
      <BarChart
        width={500}
        height={300}
       /* data={this.setData(this.state.typeEmission.smallCar,
                          this.state.typeEmission.mediumCar,
                          this.state.typeEmission.largear)}
                          */
        data = {this.setData()}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
       
        <XAxis dataKey="name" />
        <YAxis/>
        {/*<Tooltip content="hej"/>*/}
        {/*<Legend />*/}
        <Bar dataKey="vv" fill="#8884d8" />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    );
  }
}

export default BarChartTravel;
