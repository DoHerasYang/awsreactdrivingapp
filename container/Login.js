import React,{ useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import config from '../aws-exports';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import AsyncStorage from '@react-native-community/async-storage';
Amplify.configure(config)

export default class Login extends React.Component {

    state = {
        username: '',
        password: '',
    };

    // TODO: Finish the verify function
    // validateForm(input_string){
    //     const reg =  /^[a-z][0-9][A-Za-z0-9]{10}$/;
    //     let tag = input_string.length>0 && reg.test(input_string);
    //     if (tag){
    //
    //     }else{
    //         alert("Wrong Input...")
    //     }
    // }

    // Store the Local data for current user
    async StoreData (username) {
        try{
            const preUser = await AsyncStorage.getItem('CurrentUser');
            if ( preUser !== username ){
                await AsyncStorage.clear();
                await AsyncStorage.setItem('CurrentUser', username);
                await AsyncStorage.setItem('default', '1');
            }
            // await AsyncStorage.setItem('default', '0');
            // await AsyncStorage.removeItem('default');
            // await AsyncStorage.setItem('default', '0');
        } catch(e){
            console.log(e);
        }
    }

    async handleSubmit(event){
        const {username,password} = this.state;
        try {
            const user = await Auth.signIn(username,password);
            await this.StoreData(this.state.username);
            this.setState({username:'',password: ''})
            this.props.navigation.navigate('UserTabs')
        }catch (e) {
            alert(e.message);
        }
    }

    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Sticker</Text>
                <View style={styles.inputView} >
                    <TextInput
                        value={this.state.username}
                        style={styles.inputText}
                        placeholder="Username"
                        placeholderTextColor="#003f5c"
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(username) => this.setState({username})}/>
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        value={this.state.password}
                        secureTextEntry={true}
                        style={styles.inputText}
                        placeholder="Password"
                        keyboardType="default"
                        placeholderTextColor="#003f5c"
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(password) => this.setState({password})}/>
                </View>
                <TouchableOpacity
                    onPress={()=> navigate('ForgetPassword')}>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={this.handleSubmit.bind(this)}
                    activeOpacity = {0.3}>
                    <Text style={styles.loginText}>LOG IN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> navigate('Signup')}>
                    <Text style={styles.loginText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#290066',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
    },
    inputView:{
        width:"80%",
        backgroundColor:"#d9d9d9",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"black"
    },
    forgot:{
        color:"white",
        fontSize:11
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:10
    },
    loginText:{
        color:"white"
    }
});