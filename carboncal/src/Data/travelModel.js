
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
    this.numberOfTravelers = 1;
    this.savedTravels = []; //fylls med objekt från API:t
    this.routeResult = "";
    this.list = [];
    }

    setUserTravel(userTravelObject){
        //alert(userTravelObject.travelType);
        this.routeResult = this.getRoute(userTravelObject.startPoint,userTravelObject.endPoint);
       // this.getCarbon();
        this.notifyObservers();
    }

    getUserTravel() {
      return this.routeResult;
    }

    getCarbon = () =>{
      this.routeResult.then(data => {

          let startLat = data.resourceSets[0].resources[0].bbox[0];
          let startLng = data.resourceSets[0].resources[0].bbox[1];
          let endLat = data.resourceSets[0].resources[0].bbox[2];
          let endLng = data.resourceSets[0].resources[0].bbox[3];
        const carbonUrl = `http://api.commutegreener.com/api/co2/emissions?startLat=`+ startLat + `&startLng=` + startLng + `&endLat=` + endLat + `&endLng=` + endLng + `&format=json`;
        console.log(fetch(carbonUrl,{method: "GET",mode:"no-cors",headers: {
          "Content-Type": "application/json",
      },}).then(this.processResponse));
        //console.log(data.resourceSets[0].resources[0].bbox[0])
      })
      /*setTimeout(function(){
      const startLat = this.state.startLat;
      const startLng = this.state.startLng;
      const endLat = this.state.endLat;
      const endLng = this.state.endLng;
      const carbonUrl = `http://api.commutegreener.com/api/co2/emissions?startLat=`+ startLat + `&startLng=` + startLng + `&endLat=` + endLat + `&endLng=` + endLng + `&format=json`;
      console.log(fetch(carbonUrl,{mode:"no-cors"}).then(this.processResponse));
    },3000)*/
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