import travelTypesInstance from './TravelTypes'
import ObservableModel from "./ObservableModel"
import carbonCalculator from "./carbonCalculator"
const BASE_URL = "http://dev.virtualearth.net/REST/V1/Routes/driving?"
//const BASE_URL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&"
const httpOptions = {
  headers: { "X-Mashape-Key": "AlJeTIGD1dCPM4-OE_z9xDQohB4ll2vpaaEYv72_48tSOt--Jy_oY5UaFftaiXKp"}
}

class TravelModel extends ObservableModel {

    constructor(){
    super();
    this.savedTravels = []; //fylls med objekt från API:t
    this.allResults = [];
    this.compareTravels = [];
    this.numberOfTravelers = 1;
    }

    setUserTravel(userTravelObject){
        
        this.getRoute(userTravelObject.startPoint,userTravelObject.endPoint).then(data => {
          let travelData = data.resourceSets[0].resources[0];
          userTravelObject["distance"] = travelData.travelDistance;
          userTravelObject["travelID"] = Math.random().toString(36).substr(2, 9);
          userTravelObject["key"] = travelData.id;
          userTravelObject["longitud"] = travelData.id;
          userTravelObject["latitud"] = travelData.id;
          userTravelObject["emission"] = carbonCalculator.calculateCarbonEmission(travelData.travelDistance,userTravelObject.travelType,userTravelObject.numberOfTravelers);
          this.allResults.push(userTravelObject);
          console.log(userTravelObject);
          this.notifyObservers();
        });
    }

    getRoute(startPosition,endPosition) {
        const url = `${BASE_URL}wp.0=`+ startPosition + `&wp.1=` + endPosition + `&optmz=distance&key=AlJeTIGD1dCPM4-OE_z9xDQohB4ll2vpaaEYv72_48tSOt--Jy_oY5UaFftaiXKp`;
        //const url = `${BASE_URL}origins=`+ startPosition + `&destinations=`+ endPosition + `&key=AIzaSyA8eRwbJyrmHHGkHdBaRi6_tJmRUmAf7Vk`
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
        let date = new Date();
        let month, day = 0
        date.getDate() < 10 ? day = "0" + date.getDate(): day = date.getDate();
        date.getMonth() < 10 ? month = "0" + date.getMonth(): month = date.getMonth();
        travel["date"] = day + " " + month + " " + date.getFullYear();

        console.log(travel["date"])
        this.savedTravels.push(travel);
        this.notifyObservers();
        //console.log(this.savedTravels);
      }

    removeSavedTravel(travel){
          let list = this.savedTravels;
          for (var i in list){
              if (travel.id === list[i].id && travel.travelType === list[i].travelType){
                  list.splice(i,1);
              }
          }
          this.notifyObservers();
      }

    getSavedTravels(){
        return this.savedTravels;
    }

    saveCompare(travel){
      let AllTravelTypeEmission = travelTypesInstance.state.types.map(types =>(
          carbonCalculator.calculateCarbonEmission(travel.distance,types.value,travel.numberOfTravelers)
      ))
      travel["AllTravelTypeEmission"] = AllTravelTypeEmission;
      travel["maxEmission"] = Math.max.apply(null, AllTravelTypeEmission);
      travel["minEmission"] = Math.min.apply(null, AllTravelTypeEmission);
      this.compareTravels.push(travel);      
      this.notifyObservers();
      console.log(this.compareTravels);
    }

    removeComparedTravel(travel){
      let allCompares = this.compareTravels;
      for (let i in allCompares){
          if (travel.id === allCompares[i].id && travel.travelType === allCompares[i].travelType ){
              allCompares.splice(i,1);
          }
      }
      this.notifyObservers();
    }

    getComparedTravels(){
      return this.compareTravels;
    }

    getTotalSavedEmission(){
      let total = 0;
      let travels = this.savedTravels;

      for (var i in travels){
        total += travels[i].emission;
      }
      return total;
    }


    removeResult(travel){
          let results = this.allResults;
          for (let i in results){
              if (travel.id === results[i].id && travel.travelType === results[i].travelType){
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