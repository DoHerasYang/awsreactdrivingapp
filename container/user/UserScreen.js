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
} from 'react-native';

import {obtain_Weather} from "../function/Weather_Info";
import {obtain_WeatherJson} from "../function/Weather_Info";
import {obtain_tips} from "../function/Tips_Funtion";
import {Query_UserName} from "../function/User_GraphQL";
import {current_username} from "../Login";

import { Auth } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import config from '../../aws-exports';
import AsyncStorage from "@react-native-community/async-storage";
import {LinearGradient} from "expo-linear-gradient";


Amplify.configure(config)

export default class UserScreen extends React.Component{

    state ={
        user_profile: null,
        user_name: null,
        temperature: null,
        city_name: null,
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
        })
    }

    obtain_Name = async() =>{
        const gqldata = await Query_UserName();
        this.setState({
            user_profile: gqldata,
        });
        this.state.user_profile.map((pet,index)=>(
            this.setState({
                user_name: pet.firstname+' '+pet.lastname,
            })
        ))
    }

    async componentDidMount(){
        this.obtain_Name();
        this.obtain_temp();
        AsyncStorage.getItem('default',(error,result)=>{
            if(result === 1){
                Alert.alert(
                    "Alert",
                    "Allow access to your GEO location",
                    [
                        {
                            text: "No",
                            onPress:()=> this.reconfirm_function(),
                            style: Platform.OS==="ios"? "cancel":"negative"
                        },
                        {
                            text: "Yes",
                            style: Platform.OS==='ios'? 'destructive':'positive',
                            onPress:()=>this.Async_Store(),
                        }
                    ],
                    { cancelable: false}
                )
            }
        })
    }

    GEO_Navigation(){
        this.props.navigation.navigate(
            'GEO',
            {
                screen: 'GEO_Function',
            });
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
                        <Text style={styles.username_Style}>     {this.state.temperature}°C    {this.state.city_name}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.report_buttonStyle}>
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