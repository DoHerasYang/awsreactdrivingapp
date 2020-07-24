import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer} from "react-navigation";

// import the Pages containers
import Login from "./container/Login";
import Signup from './container/Signup';

// Create the Stack for Auth and Login or Sing up Function Pages
const AuthStackNavigator = createStackNavigator({
    Initial:{
        screen: Login,
        navigationOptions:()=> ({
            title:'Welcome to this App',
        }),
    },
    Signup:{
        screen: Signup,
    },
});

// Application nav Stack
const appNav = createSwitchNavigator({
    Auth: AuthStackNavigator,
});

// AppContainer
const AppContainer = createAppContainer(appNav);

export default class App extends React.Component{
    render() {
        return <AppContainer />;
    }
}