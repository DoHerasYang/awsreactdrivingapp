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
} from 'react-native';

import {obtain_Weather} from "../function/Weather_Info";
import {obtain_WeatherJson} from "../function/Weather_Info";

import { Auth } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import config from '../../aws-exports';
import AsyncStorage from "@react-native-community/async-storage";

Amplify.configure(config)

export default class UserScreen extends React.Component{

    state ={
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
            temperature : current_temperature["main"].temp,
            city_name: current_temperature["name"]
        })
    }


    componentWillMount(){
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
        return(
            <View style={styles.container}>
                <Image
                    style={styles.tabBar_Style}
                    source={require("../../assets/TabBar.png")}>
                </Image>
                <View style={styles.header_Style}>
                    <Text style={styles.header_textStyle}>Welcome</Text>
                    <Text style={styles.username_Style}>My name</Text>
                    <Text style={styles.username_Style}>{this.state.temperature} °C    {this.state.city_name}</Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={()=>this.GEO_Navigation()}>
                    <Text>Start Navigation</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

// The Styles Sheet
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    tabBar_Style:{
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.27,
        resizeMode: 'stretch',
    },
    header_Style:{
        marginTop: 20,
        alignItems: 'center',
    },
    header_textStyle:{
        fontSize: 20,
        fontWeight: "500",
    },
    username_Style:{
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
    buttonStyle:{
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
        backgroundColor: "#DDDDDD",
    },
    textStyle:{
        fontSize: 10,
        fontWeight: '500',
        color: '#000000',
    },
})