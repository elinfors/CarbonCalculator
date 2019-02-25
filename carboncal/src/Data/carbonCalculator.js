class CarbonCalculator{

    constructor(){
      this.state = {
              smallCar: "0.00015812",
              mediumCar:"0.00019028",
              largeCar:"0.000230480",
              plane:"0.000486",
              train:"0.00001",
              ship:"0"
      };
    }
    calculateCarbonEmission(distance,travelType){ 
    return distance * this.state[travelType];
    };
}
const calcInstance = new CarbonCalculator();
export default calcInstance;