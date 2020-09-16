import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Platform,
    TouchableOpacity,
    Image,
    Dimensions,
    ActivityIndicator,
    DeviceEventEmitter,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

import {obtain_WeatherJson} from "../function/Weather_Info";
import {obtain_tips} from "../function/Tips_Funtion";
import {Query_UserName} from "../function/User_GraphQL";

import { Auth } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import config from '../../aws-exports';
import AsyncStorage from "@react-native-community/async-storage";

import {current_username} from "../Login";
export let uuid = null;

Amplify.configure(config)

// Global Variables for application
export let Username = null;
let notification_content = null;

const weather_condition = [
    "Mist",
    "Haze",
    "Dust",
    "Fog",
    "Tornado",
    "Squall",
    "Snow",
    "Rain",
    "Thunderstorm",
    "Drizzle",
];


export default class UserScreen extends React.Component{

    state ={
        user_profile: null,
        user_name: null,
        temperature: null,
        city_name: null,
        uuid: null,
        currentweather: null,
    }

    // The function to reconfirm the user preference
    reconfirm_function(){
        Alert.alert(
            "Alert",
            "This App needs to record your GEO Location for accurate recording the data, Allow access to your GEO location ",
            [
                {
                    text: "No",
                    onPress:()=> this.Log_out(),
                    style: Platform.OS==="ios"? "cancel":"negative"

                },
                {
                    text: "Yes",
                    style: Platform.OS==='ios'? 'destructive':'positive',
                    onPress:()=>this.Async_Store(),
                },
                { cancelable: false}
            ]
        )
    }

    Async_Store = async() => {
        await AsyncStorage.removeItem('default');
        await AsyncStorage.setItem('default','0');
    }

    async Log_out(){
        // log out the current user
        await Auth.signOut();
        this.props.navigation.navigate(
            'Login',
            {
                screen: 'Login',
            });
    }

    obtain_temp = async() =>{
        let current_temperature = await obtain_WeatherJson();
        this.setState({
            temperature : current_temperature["main"].temp.toFixed(1),
            city_name: current_temperature["name"],
        });
    }

    obtain_Name = async() =>{
        const gqldata = await Query_UserName(current_username);
        this.setState({
            user_profile: gqldata,
        });
        this.state.user_profile.map((user,index) =>(
            this.setState({
                user_name: user.firstname+' '+user.lastname,
                uuid: user.id,
            })
        ))
        uuid = this.state.uuid;
        Username  = this.state.user_name;
    }

    async componentDidMount(){
        await this.obtain_Name();
        await this.obtain_temp();
        await this._registerForPushNotifications();
        this.timer = setTimeout(()=>{
            this.Weather_Alert();
            },
            1000000,
        );
        AsyncStorage.getItem('default',(error,result)=>{
            if(result === 1){
                Alert.alert(
                    "Alert",
                    "Allow access to your GEO location and track your position",
                    [
                        {
                            text: "No",
                            onPress:() => this.reconfirm_function(),
                            style: Platform.OS==="ios"? "cancel":"negative"
                        },
                        {
                            text: "Yes",
                            style: Platform.OS==='ios'? 'destructive':'positive',
                            onPress:() => this.Async_Store(),
                        }
                    ],
                    { cancelable: false}
                )
            }
        });
    }

    // Notification Part of this Application
    // Obtain the Permission of the application for notification
     async _allowsNotificationsAsync(){
        return await Notifications.requestPermissionsAsync({
            android:{},
            ios:{
                allowAnnouncements: true,
                allowBadge: true,
                allowAlert: true,
            }
        })
    }

    // Obtain the Expo Notification Tokens
    _registerForPushNotifications = async() => {
        // Check the Notification status
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let currentStatus = existingStatus;
        if (!existingStatus.granted) {
            await this._allowsNotificationsAsync();
            currentStatus = await Notifications.getPermissionsAsync();
            if (!currentStatus.granted) {
                return Promise.resolve();
            }
        }
        // Add a New Listener
        if (await AsyncStorage.getItem("weather_value")){
            this.weather_listener = DeviceEventEmitter.addListener("WeatherAlert", () => {
                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: true,
                        shouldSetBadge: true,
                    }),
                });
                Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Bad weather Alert',
                        body: notification_content,
                    },
                    trigger: null,
                });
            });
        }
    }

    // Weather Alert Condition Function
    Weather_Alert = async() =>{
        let current_weather = await obtain_WeatherJson();
        if(current_weather["weather"][0]["id"] === this.state.currentweather["weather"][0]["id"]){
            return Promise.resolve();
        }else{
            this.setState({
                current_weather: current_weather,
            });
        }
        if(current_weather["visibility"] < 1000){
            notification_content = "The Visibility of Road is less than 1KM ";
            DeviceEventEmitter.emit("WeatherAlert");
        }
        if(current_weather["wind"]["speed"]>20){
            notification_content = "Strong Wind Alert ";
            DeviceEventEmitter.emit("WeatherAlert");
        }
        if(current_weather["weather"][0]["main"] in weather_condition){
            notification_content = "Alert: " + current_weather["weather"][0]["description"];
            DeviceEventEmitter.emit("WeatherAlert");
        }
    }

    GEO_Navigation(){
        this.props.navigation.navigate(
            'GEO',
            {
                screen: 'GEO_Function',
            });
    }

    // Improve the Optimization of the Application
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.currentweather !== nextState.currentweather || this.state.uuid !== nextState.uuid){
            return false;
        }
        return true;
    }

    // Deal with the listener
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.weather_listener && DeviceEventEmitter.removeSubscription(this.weather_listener);
    }

    render() {
        if(this.state.temperature&&this.state.user_name){
            return(
                <View style={styles.container}>
                    <Image
                        style={styles.tabBar_Style}
                        source={require("../../assets/TabBar.png")}>
                    </Image>
                    <View style={styles.header_Style}>
                        <Text style={styles.header_textStyle}>WELCOME</Text>
                        <Text style={styles.username_Style}>{this.state.user_name}</Text>
                        <Text style={styles.username_Style}>{this.state.temperature}°C    {this.state.city_name}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.report_buttonStyle}
                        onPress={()=>this.props.navigation.navigate("Report")}>
                        <Text>View the Detailed Report</Text>
                    </TouchableOpacity>
                    <View style={styles.tip_Style}>
                        {obtain_tips()}
                    </View>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={()=>this.GEO_Navigation()}>
                        <Text>Start New Navigation</Text>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return(
                <View style={styles.container}>
                    <Image
                        style={styles.tabBar_Style}
                        source={require("../../assets/TabBar.png")}>
                    </Image>
                    <View
                        style={styles.activity_Style}>
                        <ActivityIndicator size="large"/>
                    </View>
                </View>
            )
        }
    }
}

// The Styles Sheet
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#faf5e5",
    },
    tabBar_Style:{
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.25,
        resizeMode: 'stretch',
    },
    header_Style:{
        marginTop: 5,
        alignItems: 'center',
    },
    header_textStyle:{
        fontSize: 20,
        fontWeight: "500",
    },
    username_Style:{
        fontSize: 16,
        marginTop: 15,
        textAlign: 'center',
    },
    report_buttonStyle:{
        alignItems: 'center',
        marginTop: 18,
        padding: 10,
        backgroundColor: "#DDDDDD",
        borderRadius:25,
    },
    buttonStyle:{
        alignItems: 'center',
        marginTop: 15,
        padding: 10,
        backgroundColor: "#DDDDDD",
        borderRadius: 25,
    },
    tip_Style:{
        borderWidth: 0.4,
        marginLeft: Dimensions.get('window').width*0.005,
        marginRight: Dimensions.get('window').width*0.005,
        width: Dimensions.get('window').width*0.99,
        borderStyle: 'dashed',
        height: Dimensions.get('window').height*0.3,
        marginTop: 15,
    },
    textStyle:{
        fontSize: 10,
        fontWeight: '500',
        color: '#000000',
    },
    activity_Style:{
        position: "absolute",
        top: Dimensions.get('window').height*0.5,
        left: Dimensions.get('window').width*0.5,
        right: Dimensions.get('window').width*0.5,
        bottom: Dimensions.get('window').height*0.5,
    },
})