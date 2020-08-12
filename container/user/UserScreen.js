import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Platform,
} from 'react-native';

import { Auth } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import config from '../../aws-exports';
import AsyncStorage from "@react-native-community/async-storage";

Amplify.configure(config)

export default class UserScreen extends React.Component{

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

    componentWillMount (){
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

    render() {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Sweet Home!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
})