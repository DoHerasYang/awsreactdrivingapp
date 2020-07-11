import Amplify from '@aws-amplify/core'
import config from '../aws-exports'
import React,{useState,useEffect,Component} from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, Button } from 'react-native';

// Configure the Amplify Section
Amplify.configure(config)

export default class Signup extends React.Component {
    render(){
        return (
            <View Style={sign_up_styles.container}>
                <Text> Sign Up Page</Text>
                <TextInput>
                </TextInput>
            </View>
    )};
}

const sign_up_styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#290066',
        alignItems: 'center',
        justifyContent: 'center',
    },
});



