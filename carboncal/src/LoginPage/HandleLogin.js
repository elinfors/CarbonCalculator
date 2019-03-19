import React, { Component } from 'react';
import fire from './Fire'
import { Link } from 'react-router-dom';
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
        firebase.auth().onAuthStateChanged(userData => {
            this.setState({user: userData})
        })
    }

    authListener(){
        fire.auth().onAuthStateChanged((user) => {
            firebase.database().ref('usersTravelList').set({
                users: user.uid
        })
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
        
            console.log(user);
            if (user){
                this.setState({ user,userID: user.uid });
                modelInstance.user = this.state;
                console.log(modelInstance.user);
                //localStorage.setItem('user', user.uid);
            }else{
                this.setState({ user: null });
                //localStorage.removeItem('user');
            }
        }); 
        
    }

    render() { 
        
        
        return ( 
            this.state.user ? <SearchTravel model = {modelInstance}/>: <LoginPage/>
        )
    }
}
 
export default HandleLogin;


