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
            console.log(user);
            if (user){
                this.setState({ user });
                localStorage.setItem('user', user.uid);
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


