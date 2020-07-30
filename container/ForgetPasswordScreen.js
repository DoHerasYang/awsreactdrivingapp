import React from 'react';
import Amplify from '@aws-amplify/core'
import config from '../aws-exports'
import { Auth } from 'aws-amplify';
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

import {
    Container,
    Item,
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import Amplify Configure
Amplify.configure(config)

// ForgetPasswordScreen Class
export default class ForgetPasswordScreen extends React.Component {

    // Initial class state
    state = {
        username:'',
        authCode:'',
        password:'',
    }

    // onChangeText function
    onChangeText(key,value){
        this.setState({
            [key]:value
        })
    }

    // Amplify Reset Function
    async amplifyForgetPassword(){
        const { username } = this.state;
        await Auth.forgotPassword(username)
            .then((data) => console.log("New Code has Sent", data))
            .catch(error=>{
                if(!error.message){
                    console.log('Error!',error)
                    Alert.alert('Error!',error)
                }
                else{
                    console.log('Error!',error.message)
                    Alert.alert('Error!',error.message)
                }
            })
    }

    // Submit the New Password and Code and Redirect the Page Navigation
    async amplifyForgetPasswordSubmit(){
        const {username,password,authCode} = this.state
        await Auth.forgotPasswordSubmit(username, authCode, password)
            .then(()=>{
                this.props.navigation.navigate('Login')
                console.log({username}+' Successfully Change the New Password')
            })
            .catch(error=>{
                console.log('Error!',error)
                Alert.alert('Error!',error)
            })
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <StatusBar/>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    enabled
                    keyboardVerticalOffset={23}>
                    <View style={styles.container}>
                        <Container style={styles.itemContainer}>
                            <View style={styles.container}>
                                <Item style={styles.itemStyle}>
                                    <AntDesign name="user" style={styles.iconStyle}/>
                                    <TextInput
                                        placeholder='Username'
                                        placeholderTextColor='#adb4bc'
                                        keyboardType={'email-address'}
                                        returnKeyType='next'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={(value)=> this.onChangeText('username',value)}
                                        style={styles.inputStyle}/>
                                    <TouchableOpacity
                                        onPress={()=>this.amplifyForgetPassword()}
                                        style={styles.auth_buttonStyle}>
                                        <Text style={styles.auth_TextStyle}>
                                            Send Code
                                        </Text>
                                    </TouchableOpacity>
                                </Item>
                                <Item style={styles.itemStyle}>
                                    <MaterialCommunityIcons name="onepassword" style={styles.iconStyle}/>
                                    <TextInput
                                        placeholder='New Password'
                                        placeholderTextColor='#adb4bc'
                                        keyboardType={'email-address'}
                                        returnKeyType='next'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={(value)=> this.onChangeText('password',value)}
                                        style={styles.inputStyle}/>
                                </Item>
                                <Item style={styles.itemStyle}>
                                    <MaterialCommunityIcons name="message-text" style={styles.iconStyle} />
                                    <TextInput
                                        placeholder='Verification Code'
                                        placeholderTextColor='#adb4bc'
                                        keyboardType={'numeric'}
                                        returnKeyType='done'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={(value)=> this.onChangeText('username',value)}
                                        style={styles.inputStyle}/>
                                </Item>
                                <TouchableOpacity
                                    onPress={()=>this.amplifyForgetPasswordSubmit()}
                                    style={styles.last_buttonStyle}>
                                    <Text style={styles.auth_TextStyle}>
                                        Confirm Reset
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Container>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#290066',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    itemContainer:{
        position: 'relative',
        left: 0,
        right: 0,
        height: 300,
        bottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#290066',
    },
    itemStyle:{
        position: 'relative',
        marginBottom: 40,
        width: 300,
    },
    inputStyle:{
        flex: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        width: "50%",
        textAlign: 'left',
    },
    iconStyle: {
        color: '#fff',
        fontSize: 30,
        marginRight: 15,
        marginBottom: 2,
    },
    auth_buttonStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fb5b5a',
        padding: 3,
        // borderRadius: 10,
    },
    auth_TextStyle:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    last_buttonStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fb5b5a',
        padding: 14,
        width: 230,
        marginTop: -5,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
})

