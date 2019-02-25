

const BASE_URL = "http://dev.virtualearth.net/REST/V1/Routes/driving?"
const httpOptions = {
  headers: { "X-Mashape-Key": "AlJeTIGD1dCPM4-OE_z9xDQohB4ll2vpaaEYv72_48tSOt--Jy_oY5UaFftaiXKp"}
};

class TravelModel{

    constructor(){
      this.travelType = {
              smallCar:2,
              mediumCar:3,
              largeCar:4,
              plane:5,
              train:6,
              ship:7
      };
    //super();
    this.numberOfTravelers = 1;

    }


    getRoute(startPosition,endPosition) {
        const url = `${BASE_URL}wp.0=`+ startPosition + `&wp.1=` + endPosition + `&optmz=distance&key=AlJeTIGD1dCPM4-OE_z9xDQohB4ll2vpaaEYv72_48tSOt--Jy_oY5UaFftaiXKp`;
        console.log(url);
        return fetch(url).then(this.processResponse).then(result =>{console.log(result.resourceSets[0].resources[0].bbox)});
      }

      processResponse(response) {
        if (response.ok) {
          return response.json();
        }
        throw response;
      }

}

const travelInstance = new TravelModel();
export default travelInstance;

//console.log(travelInstance.getRoute("tornvägen 3, täby","storgatan 309, täby"));