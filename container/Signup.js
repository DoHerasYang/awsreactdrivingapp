import Amplify from '@aws-amplify/core'
import config from '../aws-exports'
import React,{useState,useEffect,Component} from 'react';
import { Auth } from 'aws-amplify';
import {
    Container,
    Item,
    Input} from 'native-base'
import {
    TouchableOpacity,
    ImageBackground,
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
    Modal,
    FlatList,
    Animated,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';

// Configure the Amplify Section
Amplify.configure(config)

export default class Signup extends React.Component {

    //initial_state
    state={
        username: '',
        password: '',
        email: '',
        authCode: '',
    }

    // onChangeText Function
    onChangeText(key,value){
        this.setState({
            [key]:value
            })
    }

    //

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar/>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.keyboard}
                    enabled>
                    <TouchableOpacity style={styles.keyboard} onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <Container style={styles.infoContainer}>
                                <Item style={styles.itemStyle}>
                                    <AntDesign name="user" style={styles.iconStyle}/>
                                    <TextInput
                                        placeholder='Username'
                                        placeholderTextColor='#adb4bc'
                                        keyboardType={'email-address'}
                                        returnKeyType='next'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        // onSubmitEditing={}
                                        onChangText={value=> this.onChangeText('username',value)}
                                        style={styles.inputStyle} />
                                </Item>
                                <Item style={styles.itemStyle}>
                                    <MaterialCommunityIcons name="textbox-password" style={styles.iconStyle}/>
                                    <TextInput
                                        placeholder='Password'
                                        placeholderTextColor='#adb4bc'
                                        keyboardType={'email-address'}
                                        returnKeyType='next'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        // onSubmitEditing={}
                                        onChangText={value=> this.onChangeText('password',value)}
                                        style={styles.inputStyle} />
                                </Item>
                                <Item style={styles.itemStyle}>
                                    <Zocial name="email" style={styles.iconStyle}/>
                                    <TextInput
                                        placeholder='Email'
                                        placeholderTextColor='#adb4bc'
                                        keyboardType={'email-address'}
                                        returnKeyType='next'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        // onSubmitEditing={}
                                        onChangText={value=> this.onChangeText('email',value)}
                                        style={styles.inputStyle} />
                                </Item>
                            </Container>
                        </View>
                        <TouchableOpacity
                            onPress={()=>this.signUp()}
                            style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                SignUp
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
    )};
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#290066',
        alignItems: 'center',
        justifyContent: 'center',
    },
    keyboard:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#290066',
        flexDirection: 'column',
    },
    inputView:{
        width: 280,
        backgroundColor:"#d9d9d9",
        borderRadius:25,
        height:50,
        marginBottom:40,
        // justifyContent:"flex-start",
        padding:20,
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 370,
        bottom: 25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#290066',
    },
    itemStyle:{
        width: 300,
        marginBottom: 50,
    },
    inputStyle:{
        flex: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        width: "50%",
    },
    iconStyle: {
        color: '#fff',
        fontSize: 30,
        marginRight: 15,
        marginBottom: 0,
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fb5b5a',
        padding: 14,
        width: 230,
        marginBottom: 80,
        borderRadius: 10,
    },
    buttonTextStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff"
    }
});



