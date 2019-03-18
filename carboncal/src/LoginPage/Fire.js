import firebase from 'firebase' 
  
  // Initialize Firebase
const config = {
    apiKey: "AIzaSyC3Ikc89Qryg1mhUTTF-IjWMYpHR5xiSLY",
    authDomain: "carbon-calculator-d4d9b.firebaseapp.com",
    databaseURL: "https://carbon-calculator-d4d9b.firebaseio.com",
    projectId: "carbon-calculator-d4d9b",
    storageBucket: "carbon-calculator-d4d9b.appspot.com",
    messagingSenderId: "759789839116"
  };
  const fire = firebase.initializeApp(config);
  export default fire;
