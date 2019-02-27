
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
    this.routeResult = "";
    this.carbonEmission = 0;
    this.allResults = [];
    }

    setUserTravel(userTravelObject){
        //alert(userTravelObject.travelType);
        this.routeResult = this.getRoute(userTravelObject.startPoint,userTravelObject.endPoint);
        console.log(this.routeResult);
        //this.allResults.push(this.routeResult);
        this.getCarbon(userTravelObject.travelType);
        console.log(this.carbonEmission);
        this.notifyObservers();
    }

    getCarbonEmission(){
      return this.carbonEmission;
    }

    getUserTravel() {
      return this.routeResult;
    }

    getCarbon = (travelType) => {
      /*this.routeResult.then(data => {
        let startLat = data.resourceSets[0].resources[0].bbox[0];
        let startLng = data.resourceSets[0].resources[0].bbox[1];
        let endLat = data.resourceSets[0].resources[0].bbox[2];
        let endLng = data.resourceSets[0].resources[0].bbox[3];
        const carbonUrl = `http://api.commutegreener.com/api/co2/emissions?startLat=`+ startLat + `&startLng=` + startLng + `&endLat=` + endLat + `&endLng=` + endLng + `&format=json`;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        console.log(fetch(proxyurl + carbonUrl).then(this.processResponse));
        //console.log(data.resourceSets[0].resources[0].bbox[0])
      })*/
      console.log(travelType);
      this.routeResult.then(data => {
        this.carbonEmission = carbonCalculator.calculateCarbonEmission(data.resourceSets[0].resources[0].travelDistance,travelType);
      })
     
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

      addToResult(travel){
        this.allResults.push(travel);
        this.notifyObservers();
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
        //console.log("getAllResults");
      }

}

const modelInstance = new TravelModel();
export default modelInstance;

//console.log(travelInstance.getRoute("tornvägen 3, täby","storgatan 309, täby"));