
import ObservableModel from "./ObservableModel"
const BASE_URL = "http://dev.virtualearth.net/REST/V1/Routes/driving?"
const httpOptions = {
  headers: { "X-Mashape-Key": "AlJeTIGD1dCPM4-OE_z9xDQohB4ll2vpaaEYv72_48tSOt--Jy_oY5UaFftaiXKp"}
};

class TravelModel extends ObservableModel{

    constructor(){
    super();
      this.travelType = {
              smallCar:2,
              mediumCar:3,
              largeCar:4,
              plane:5,
              train:6,
              ship:7
      };
    this.userTravel = {};

    this.numberOfTravelers = 1;
    this.savedTravels = []; //fylls med objekt från API:t
    this.routeResult = ;

    }

    setUserTravel(userTravelObject){
        alert(userTravelObject.travelType);
        this.getRoute(userTravelObject.startPoint,userTravelObject.endPoint);
        this.notifyObservers();
    }

    getRoute(startPosition,endPosition) {
        const url = `${BASE_URL}wp.0=`+ startPosition + `&wp.1=` + endPosition + `&optmz=distance&key=AlJeTIGD1dCPM4-OE_z9xDQohB4ll2vpaaEYv72_48tSOt--Jy_oY5UaFftaiXKp`;
        console.log(url);
        console.log("Testar URL");
        return fetch(url).then(this.processResponse).then(result =>{console.log(result.resourceSets[0].resources[0].bbox)});
      }

      processResponse(response) {
        if (response.ok) {
          return response.json();
        }
        throw response;
      }

      setNumberOfTravelers(num){
          this.numberOfTravelers = num;
          if(num < 1){
              this.numberOfTravelers = 1
          }
          this.notifyObservers();
      }

      getNumberOfTravelers(){
        return this.numberOfTravelers;
      }

      addTravelToList(travel){
        this.savedTravels.push(travel);
        this.notifyObservers();
      }

      removeTravelFromList(travel){
          let list = this.savedTravels;
          for (var i in list){
              if (travel.id === list[i].id){
                  list.splice(i,1);
              }
          }
          this.notifyObservers();
      }

      getSavedTravels(){
        return this.savedTravels;
      }

}

const modelInstance = new TravelModel();
export default modelInstance;

//console.log(travelInstance.getRoute("tornvägen 3, täby","storgatan 309, täby"));