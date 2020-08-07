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
Amplify.configure(config)

export default class UserScreen extends React.Component{

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
                    style: Platform.OS==='ios'? 'destructive':'positive'
                },
                { cancelable: false}
            ]
        )
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
                    style: Platform.OS==='ios'? 'destructive':'positive'
                }
            ],
            { cancelable: false}
        )
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