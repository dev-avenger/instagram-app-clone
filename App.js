
import React, {Component} from 'react';

import {View,Text} from 'react-native';

import firebase from 'firebase/app';

import {Provider}  from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk))


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQA6cte_aMxPPvsmRpudjVg-kkrXQiEU8",
  authDomain: "instagram-dev-cfa93.firebaseapp.com",
  projectId: "instagram-dev-cfa93",
  storageBucket: "instagram-dev-cfa93.appspot.com",
  messagingSenderId: "790257548989",
  appId: "1:790257548989:web:2ab256070b3e1c6e0a41d4",
  measurementId: "G-GKKG18PM9E"
};

firebase.initializeApp(firebaseConfig);

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
// import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';

const Stack = createStackNavigator();


export class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      loaded:false,
      loggedIn:false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn:false,
          loaded:true
        })
      }
      else{
        this.setState({
          loggedIn:true,
          loaded:true
        })
      }
    })
  }
  render() {
    const {loggedIn,loaded} = this.state;
    if(!loaded){
      return(
        <View style={{flex:1,justifyContent:'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    return(
        <Provider store={store}>
          <MainScreen/>
        </Provider>
    )
  }
}

export default App

