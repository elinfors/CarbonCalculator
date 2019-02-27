
import ObservableModel from "./ObservableModel"
import carbonCalculator from "./carbonCalculator"
const BASE_URL = "http://dev.virtualearth.net/REST/V1/Routes/driving?"
const httpOptions = {
  headers: { "X-Mashape-Key": "AlJeTIGD1dCPM4-OE_z9xDQohB4ll2vpaaEYv72_48tSOt--Jy_oY5UaFftaiXKp"}
}

class TravelModel extends ObservableModel {

    constructor(){
    super();
    this.numberOfTravelers = 1;
    this.savedTravels = []; //fylls med objekt från API:t
    this.allResults = [];
    }

    setUserTravel(userTravelObject){
        this.getRoute(userTravelObject.startPoint,userTravelObject.endPoint).then(distance => {
          userTravelObject["distance"] = distance.resourceSets[0].resources[0].travelDistance;
          userTravelObject["travelID"] = distance.resourceSets[0].resources[0].id;
          userTravelObject["key"] = distance.resourceSets[0].resources[0].id;
          userTravelObject["emission"] = carbonCalculator.calculateCarbonEmission(distance.resourceSets[0].resources[0].travelDistance,userTravelObject.travelType,userTravelObject.numberOfTravelers);
          this.allResults.push(userTravelObject);
          this.notifyObservers();
        });
      
    }

    getRoute(startPosition,endPosition) {
        const url = `${BASE_URL}wp.0=`+ startPosition + `&wp.1=` + endPosition + `&optmz=distance&key=AlJeTIGD1dCPM4-OE_z9xDQohB4ll2vpaaEYv72_48tSOt--Jy_oY5UaFftaiXKp`;
        console.log(url);
        console.log("Testar URL");
        return fetch(url).then(this.processResponse);
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

    saveTravel(travel){
        this.savedTravels.push(travel);
        this.notifyObservers();
      }

    removeSavedTravel(travel){
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

    removeResult(travel){
          let results = this.allResults;
          for (var i in results){
              if (travel.id === results[i].id){
                  results.splice(i,1);
              }
          }
          this.notifyObservers();
      }

    getAllResults(){
        return this.allResults;
      }

}

const modelInstance = new TravelModel();
export default modelInstance;

//console.log(travelInstance.getRoute("tornvägen 3, täby","storgatan 309, täby"));