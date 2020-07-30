import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer} from "react-navigation";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';

// import the Pages containers
import Login from "./container/Login";
import Signup from './container/Signup';
import ForgetPassword from './container/ForgetPasswordScreen';
import AuthLoad from "./container/AuthLoad";

// User Pages
import MainPage from "./container/MainPage";
import SettingPage from "./container/SettingPage";

// import the icons
import { Ionicons } from '@expo/vector-icons';

// AWS Configs
import Amplify from '@aws-amplify/core';
import config from './aws-exports';
import {exp} from "react-native-reanimated";
Amplify.configure(config);


// Create the Stack for Auth and Login or Sing up Function Pages
const AuthStackNavigator = createStackNavigator({
    Initial:{
        screen: Login,
        navigationOptions:()=> ({
            title:'Welcome to this App',
            headerShown: false,
        }),
    },
    Signup:{
        screen: Signup,
    },
    ForgetPassword:{
        screen: ForgetPassword,
    },
    AuthLoad:{
        screen: AuthLoad,
        navigationOptions:()=> ({
            title:'Welcome to this App',
            headerShown: false,
        }),
    },
    MainPage:{
        screen: MainPage,
    }
});

// Create the User Home Screen for the Main Page
// The Configuration for the Bottom Tabs -> configuration and option

const bottom_tabs = {
    Main: {
        screen: MainPage,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) =>(
                <Ionicons style={{ fontSize: 26, color: tintColor }} name="ios-home" />
            ),
        },
    },
    Setting:{
        screen: SettingPage,
        navigationOptions:{
            tabBarLabel: 'Setting',
            tabBarIcon:({tintColor}) =>(
                <Ionicons style={{ fontSize: 26, color: tintColor }} name="ios-settings" />
            ),
        },
    },
}

// Application nav Stack
const appNav = createSwitchNavigator({
        Auth: AuthStackNavigator,
        AuthLoad: AuthLoad,
        Main: MainPage,
    },
    {
        initialRouteName: 'Auth',
    }
);

// AppContainer
const AppContainer = createAppContainer(appNav)

export default class App extends React.Component{
    render() {
        return <AppContainer />;
    }
};


