import ObservableModel from "./ObservableModel"
import carbonCalculator from "./carbonCalculator"
import travelTypesInstance from './TravelTypes'
import firebase from 'firebase';
import 'firebase/database';
const BING_URL = "http://dev.virtualearth.net/REST/V1/Routes/driving?"
const BASE_URL = "https://distanceto.p.rapidapi.com/get?"
const httpOptions = {
  headers: { "X-Mashape-Key": "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767"}
}

class TravelModel extends ObservableModel {

    constructor(){
    super();
    this.savedTravels = []; //fylls med objekt från API:t
    this.allResults = [];
    this.compareTravels = [];
    this.numberOfTravelers = 1;
    this.user = {};
    }

    setUserTravel(userTravelObject){
        console.log(this.savedTravels);
       // userTravelObject.travelType === "smallCar" || userTravelObject.travelType === "mediumCar" || userTravelObject.travelType === "largeCar" ?
        this.getRoute(userTravelObject.startPoint,userTravelObject.endPoint).then(data => {
          let travelData = data.resourceSets[0].resources[0];
          userTravelObject["distance"] = travelData.travelDistance;
          userTravelObject["travelID"] = Math.random().toString(36).substr(2, 9); //ändra?
          userTravelObject["key"] = travelData.id;
          userTravelObject["longitud"] = travelData.bbox[0];
          userTravelObject["latitud"] = travelData.bbox[1];
          userTravelObject["emission"] = carbonCalculator.calculateCarbonEmission(travelData.travelDistance,userTravelObject.travelType,userTravelObject.numberOfTravelers);
          this.allResults.push(userTravelObject);
          console.log(userTravelObject);
          this.notifyObservers();
        }).catch(error =>{
          return error
        })//:this.getAirports(userTravelObject.startPosition,userTravelObject.endPosition);
    }

    getRoute(startPosition,endPosition) {
        const url = `${BING_URL}wp.0=`+ startPosition + `&wp.1=` + endPosition + `&optmz=distance&key=AlJeTIGD1dCPM4-OE_z9xDQohB4ll2vpaaEYv72_48tSOt--Jy_oY5UaFftaiXKp`;
        //const url = `${BASE_URL}origins=`+ startPosition + `&destinations=`+ endPosition + `&key=AIzaSyA8eRwbJyrmHHGkHdBaRi6_tJmRUmAf7Vk`
        console.log(url);
        console.log("Testar URL");
        return fetch(url).then(this.processResponse);
      }

    getAirports(startPosition,endPosition){
        const route = JSON.stringify([{"t":startPosition},{"t":endPosition}])
        const url = `${BASE_URL}` + route +`car=false&foot=false`;
        return fetch(url, httpOptions).then(this.processResponse).then(data => {
          console.log(data)
        });
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
        travel["date"] = day + "" + month + 1 + "" + date.getFullYear();
        this.savedTravels.push(travel);
        this.notifyObservers();
        console.log(this.user.userID)
        console.log(this.savedTravels);
        //Uppdatera
        firebase.firestore().collection("usersTravelLists/").doc(this.user.userID).set({
          savedTravels: this.savedTravels
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      }

    removeSavedTravel(travel){
          let list = this.savedTravels;
          for (var i in list){
              if (travel.id === list[i].id && travel.travelType === list[i].travelType){
                  list.splice(i,1);
              }
          }
          this.notifyObservers();
          firebase.firestore().collection("usersTravelLists/").doc(this.user.userID).update({
            savedTravels: this.savedTravels
          })
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
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