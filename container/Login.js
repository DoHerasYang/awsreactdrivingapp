import React,{ useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableHighlight,
    Alert,
    ActivityIndicator} from 'react-native';
import { Auth } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import config from '../aws-exports';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-community/async-storage';


Amplify.configure(config)

export let current_username = null;

export default class Login extends React.Component {

    state = {
        username: '',
        password: '',
        auth_label: false,
        app_load: false,
        indicator_label: false,
        intensity_value: 0,
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
        current_username = this.state.username;
        const {username,password} = this.state;
        this.setState({
            intensity_value: 78,
            indicator_label: true,
        })
        try {
            await this.StoreData(this.state.username);
            await Auth.signIn(username,password)
                .then((user)=>{
                    this.props.navigation.navigate('AuthLoad')
                    this.setState({
                        intensity_value: 0,
                        indicator_label: false,
                    })
                    this.setState({
                        password: '',
                    })
                })
        }catch (e) {
            this.setState({
                intensity_value: 0,
                username: '',
                password: '',
                indicator_label: false,
            });
            alert(e.message);
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Sticker</Text>
                <View style={styles.inputView}>
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
                <View style={styles.inputView}>
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
                    onPress={() => navigate('ForgetPassword')}>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[!this.state.auth_label&&styles.loginBtn,
                        this.state.auth_label&&styles.disable_Btn]}
                    onPress={this.handleSubmit.bind(this)}
                    activeOpacity={0.3}
                    disabled={this.state.auth_label}>
                    <Text style={styles.loginText}>LOG IN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('Signup')}>
                    <Text style={styles.loginText}>Sign up</Text>
                </TouchableOpacity>
                <BlurView
                    intensity={this.state.intensity_value}
                    tint={"dark"}
                    style={[this.state.indicator_label&&StyleSheet.absoluteFill,styles.nonBlurredContent]}>
                    <Text style={[styles.hide_loadingStyle,this.state.indicator_label&&styles.loading_textStyle]}>Loading...</Text>
                    <ActivityIndicator animating={this.state.indicator_label} size="large"/>
                </BlurView>
            </View>
        )
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
    disable_Btn:{
        backgroundColor: "#c49191",
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:10
    },
    loginText:{
        color:"white"
    },
    nonBlurredContent: {
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
    },
    hide_loadingStyle:{
        color: "transparent",
    },
    loading_textStyle:{
        fontSize: 25,
        marginBottom: 10,
        color: "#ffffff",
        fontWeight: "400",
    },
});