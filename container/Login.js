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
    Dimensions,
    Animated,
    Easing,
    ActivityIndicator} from 'react-native';

import { Auth } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import config from '../aws-exports';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-community/async-storage';

Amplify.configure(config)

export let current_username = null;
const { width, height} = Dimensions.get('window');

export default class Login extends React.Component {

    state = {
        fadeInOpacity: new Animated.Value(0),
        buttonfadeInOpacity: new Animated.Value(0),
        buttonHeightY: new Animated.Value(height),
        activityLabel: true,
        username: "",
        password: "",
        auth_label: false,
        indicator_label: false,
        intensity_value: 0,
        checkStatus: false,
        continueLabel: true,
    };

    // Constructor
    constructor(props) {
        super(props);
        this.FadeInAnimated();
    }

    // Initial the Initial Interface
    FadeInAnimated(){
        let pictureAnimated = Animated.timing(
            this.state.fadeInOpacity,
            {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: false,
            }
        );
        let buttonOpacityAnimated = Animated.timing(
            this.state.buttonfadeInOpacity,
            {
                toValue: 0.78,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: false,
            }
        );
        let buttonHeightAnimated = Animated.timing(
            this.state.buttonHeightY,
            {
                toValue: height-200-100-50-20-20-20-10-10-10-5-5-3-2-1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: false,
            }
        );
        Animated.parallel([
            pictureAnimated,
            buttonOpacityAnimated,
            buttonHeightAnimated
        ]).start();
    }

    // Function to navigate or render the new Component

    _ClickNavigation = () => {
        this.props.navigation.navigate("Signup");
    }

    _ClickRendering = () => {
        this.setState({
            activityLabel : false,
        })
    }

    renderNavigationScreen(){
        return(
            <View style={navigationStyles.container}>
                <Animated.Image
                    style={{resizeMode: "cover", opacity: this.state.fadeInOpacity, height: 230, width: 330, top: height*0.25, left: 20}}
                    source={require("../assets/splash_white.png")}/>
                <Animated.View style={[navigationStyles.bottomView_Style,{ opacity:this.state.buttonfadeInOpacity, top:this.state.buttonHeightY}]}>
                    <Text style={navigationStyles.hintText_Style}>Don't Have Account?</Text>
                    <TouchableOpacity style={navigationStyles.touchOpacity1_Style}
                        onPress={this._ClickNavigation}>
                        <Text style={navigationStyles.touchOpacity1_TextStyle}>Sign Up Now</Text>
                    </TouchableOpacity>
                    <Text style={navigationStyles.hintText_Style}>Already Have Account?</Text>
                    <TouchableOpacity style={[navigationStyles.touchOpacity2_Style]}
                        onPress={this._ClickRendering}>
                        <Text style={navigationStyles.touchOpacity1_TextStyle}>Sign In Now</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )
    }

    // Store the Local data for current user
    async StoreData (username) {
        try{
            const preUser = await AsyncStorage.getItem('CurrentUser');
            if ( preUser !== username ){
                await AsyncStorage.clear();
                await AsyncStorage.setItem('CurrentUser', username);
                await AsyncStorage.setItem('default', '1');
                await AsyncStorage.setItem('AppStatus',"false");
            }
            // await AsyncStorage.setItem('default', '0');
            // await AsyncStorage.removeItem('default');
            // await AsyncStorage.setItem('default', '0');
        } catch(e){
            console.log(e);
        }
    }

    async handleSubmit(event){

        if(this.state.username.length === 0 || this.state.password.length === 0) {
            this.setState({
                checkStatus: true,
                continueLabel: false,
            });
        }else{
            current_username = this.state.username;
            const {username,password} = this.state;
            try {
                this.setState({
                    intensity_value: 78,
                    indicator_label: true,
                });
                await this.StoreData(this.state.username);
                await Auth.signIn(username,password)
                    .then((user)=>{
                        this.props.navigation.navigate('AuthLoad')
                        this.setState({
                            intensity_value: 0,
                            indicator_label: false,
                            password: '',
                        })
                    })
            }catch (e) {
                this.setState({
                    intensity_value: 0,
                    password: '',
                    indicator_label: false,
                });
                alert(e.message);
            }
        }
    }

    // Check the Format of the Username
    _CheckUsernameStatus(){
        if(this.state.username.length === 0 && this.state.checkStatus){
            return(
                this.state.checkStatus? <Text style={{color:"red",marginTop: -20,marginBottom:20}}>Invalid Username</Text>:<Text style={{marginTop: -20,marginBottom:20}}> </Text>
            )
        }
    }

    _CheckPasswordStatus(){
        if(this.state.password.length === 0 && this.state.checkStatus ){
            return(
                this.state.checkStatus? <Text style={{color:"red",marginTop: -20,marginBottom:20}}>Invalid Password</Text>:<Text style={{marginTop: -20,marginBottom:20}}> </Text>
            )
        }
    }

    // optimization page performance
    shouldComponentUpdate(nextProps, nextState, nextContext) {

        if(this.state.auth_label !== nextState.auth_label){
            return false
        }
        return true
    }

    // Class render function
    render() {
        const {navigate} = this.props.navigation;
        if(this.state.activityLabel){
            return(
                this.renderNavigationScreen()
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>DrivingBeacon</Text>
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
                {this._CheckUsernameStatus()}
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
                {this._CheckPasswordStatus()}
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
        fontSize: 37,
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
        fontWeight: "400",
        fontSize: 13,
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:27,
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
        color:"white",
        fontWeight: "400",
        fontSize: 13,
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

const navigationStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#290066',
    },
    bottomView_Style:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        top: height*0.39,
        marginTop: 30,
    },
    hintText_Style:{
        fontSize: 13,
        fontWeight: "600",
        color: "white",
        marginBottom: 10,
    },
    touchOpacity1_Style:{
        width: "70%",
        height: 40,
        borderRadius: 20,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent:"center",
        marginBottom: 20,
    },
    touchOpacity1_TextStyle:{
        fontSize: 15,
        fontWeight: "300",
        textShadowColor: "#fb5b5a",
        textShadowOffset: {width: -1, height:1},
    },
    touchOpacity2_Style:{
        width: "70%",
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fb5b5a',
        alignItems: 'center',
        justifyContent:"center",
        marginBottom: 20,
    }
})