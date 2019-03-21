import React, { Component } from 'react';
import fire from './Fire'
import firebase from 'firebase';
import SearchTravel from '../SearchTravel/SearchTravel';
import LoginPage from './LoginPage';
import modelInstance from '../Data/travelModel';
class HandleLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            userID: ""
        }
    }
    
    componentDidMount(){
        this.authListener(); 
    }
    
    componentWillMount(){
       // this.authListener(); 
            /*firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function() {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                return firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });*/
    }

    authListener(){
        
        fire.auth().onAuthStateChanged((user) => {
            console.log(user + " användare utloggad?");
            if(user){
            this.setState({ user,userID: user.uid });
            modelInstance.user = this.state;
            firebase.database().ref('usersTravelList').set({
                users: user.uid
            })

        //Hämtar användarens data från databasen
        firebase.firestore().collection("usersTravelLists").doc(user.uid).get().then(function(doc){
            if (doc.exists) {
                modelInstance.savedTravels = doc.data().savedTravels;
                modelInstance.notifyObservers();
                console.log("Document data:", doc.data().savedTravels);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        } else{
            this.setState({ user: null });
            localStorage.removeItem('user');
            console.log("remove");
        }
        
            console.log(user);
           /* if (user){
                this.setState({ user,userID: user.uid });
                modelInstance.user = this.state;
                console.log(modelInstance.user);
                localStorage.setItem('user', JSON.stringify(user.uid));
            }*/
           
        }); 
       
        
    }

    render() { 
        
        
        return ( 
            this.state.user ? <SearchTravel model = {modelInstance}/>: <LoginPage/>
        )
    }
}
 
export default HandleLogin;


