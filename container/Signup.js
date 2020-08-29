import Amplify from '@aws-amplify/core'
import config from '../aws-exports'
import React from 'react';
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
import { Feather } from '@expo/vector-icons';

// Configure the Amplify Section
Amplify.configure(config)

// Phone Country Flag and code
import country_code from "../script/phone_format";

// Default Phone Number
const defaultPhone_format = country_code.filter(
    // obj => obj.name === "United Kingdom"
    obj => obj.name === "China"
)[0].phone_format


export default class Signup extends React.Component {

    //initial_state
    state={
        username: '',
        password: '',
        email: '',
        phone_number: '',
        authCode: '',
    }

    // onChangeText Function
    onChangeText(key, value){
        this.setState({
            [key]:value
            })
    }

    // SignUp Function
    async signUp(){
        const {username, password, email, phone_number} = this.state;
        // Import the Amplify Function
        await Auth.signUp({
            username,
            password,
            attributes:{email,phone_number}
        })
            .then(()=>{
                console.log('Sign Up Successfully!')
                Alert.alert('Please Enter the SMS Code You have received.')
            })
            .catch( error =>{
                console.log('Error! ',error.message)
                Alert.alert('Error! ',error.message)
            })
    }
    // Verify the Phone Number and redirect the user to the Home Screen
    async confirmSignUp(){
        const { username, authCode } = this.state
        await Auth.confirmSignUp(username, authCode)
            .then(() => {
                this.props.navigation.navigate('Login')
                console.log('Successfully Confirm the AWS Auth Signup Function')
            })
            .catch(error =>{
                console.log('Error! ',error.message)
                Alert.alert('Error! ',error.message)
            })
    }

    // Fail to Signup Function
    async re_Signup(){
        const {username} = this.state;
        await Auth.resendSignUp(username)
            .then(()=> console.log('Confirmation-Code resent Successfully'))
            .catch(error =>{
                console.log('Error! ',error.message)
                Alert.alert('Error! ',error.message)})
    }


    render(){
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar/>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.keyboard}
                    enabled>
                    <View style={styles.container}>
                        <Container style={styles.infoContainer}>
                            <Item style={styles.itemStyle}>
                                <AntDesign name="user" style={styles.iconStyle}/>
                                <TextInput
                                    placeholder='Username'
                                    placeholderTextColor='#adb4bc'
                                    returnKeyType='next'
                                    keyboardType={'email-address'}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={(value) => this.onChangeText('username',value)}
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
                                    onChangeText={(value) => this.onChangeText('password',value)}
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
                                    onChangeText={value=> this.onChangeText('email',value)}
                                    style={styles.inputStyle} />
                            </Item>
                            <Item style={styles.itemStyle}>
                                <Feather name='smartphone' style={styles.iconStyle} />
                                <TextInput
                                    placeholder='Phone Number'
                                    placeholderTextColor='#adb4bc'
                                    keyboardType={'phone-pad'}
                                    returnKeyType='next'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    value={this.state.phone_number}
                                    // We should reset this phone format
                                    onChangeText={(value) => {
                                        if (this.state.phone_number===''){
                                            this.onChangeText('phone_number',defaultPhone_format + '0' + value)}
                                        else {
                                            this.onChangeText('phone_number',value)
                                        }
                                        }}
                                    style={styles.inputStyle} />
                                <TouchableOpacity
                                    style={styles.resend_buttonStyle}
                                    onPress={()=>this.re_Signup()}>
                                    <Text style={styles.resend_buttonTextStyle}>
                                        Resend
                                    </Text>
                                </TouchableOpacity>
                            </Item>
                            <TouchableOpacity
                                onPress={()=>this.signUp()}
                                style={styles.button_inStyle}>
                                <Text style={styles.buttonTextStyle}>
                                    SignUp
                                </Text>
                            </TouchableOpacity>
                            <Item style={styles.itemStyle} rounded>
                                <TextInput
                                    placeholder='Input Verification Code'
                                    placeholderTextColor='#adb4bc'
                                    keyboardType={'email-address'}
                                    returnKeyType='next'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={value=> this.onChangeText('authCode',value)}
                                    style={styles.ver_inputStyle} />
                            </Item>
                            </Container>
                        </View>
                        <TouchableOpacity
                            onPress={()=>this.confirmSignUp()}
                            style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                Confirm  SignUp
                            </Text>
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
        height: 400,
        bottom: 25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#290066',
    },
    itemStyle:{
        marginTop: 0,
        width: 300,
        marginBottom: 45,
    },
    inputStyle:{
        flex: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        width: "50%",
    },
    ver_inputStyle:{
        flex: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        width: '50%',
        height: 45,
        textAlign:'center',
    },
    iconStyle: {
        color: '#fff',
        fontSize: 30,
        marginRight: 15,
        marginBottom: 0,
    },
    // Button Styles
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fb5b5a',
        padding: 10,
        width: 220,
        marginTop: 6,
        marginBottom: 35,
        borderRadius: 10,
    },
    resend_buttonStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fb5b5a',
        borderRadius: 8,
        padding: 3,
    },
    button_inStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fb5b5a',
        padding: 10,
        width: 220,
        marginTop: -9,
        borderRadius: 10,
        marginBottom: 35,
    },
    // Text Styles
    buttonTextStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff",
    },
    resend_buttonTextStyle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    }
});