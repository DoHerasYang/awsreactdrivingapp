import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ImageBackground,
} from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';
import {AppLoading} from "expo";
import {SpeedLimit_Obtain} from "./function/SpeedLimit";


export default class WelcomePages extends React.Component{

    state = {
        isReady: false,
    }

    _Navigation_Jump = (e,state,context) => {
        if(state.index === 1){
            this.props.navigation.navigate("Login");
        }else if (state.index === null){
            console.log("Wrong Index of the Swiper");
            this.props.navigation.navigate("Login");
        }
    }

    async Check_Status(){
        try{
            await AsyncStorage.setItem('AppStatus',"false");
        } catch(e){
            console.log(e);
        }
    }

    // Optimization the performance of the render
    onChangeScreenState = () => {
        this.setState({
            isReady: true,
        });
    }

    render() {
        if(!this.state.isReady){
            return(
                    <AppLoading
                        startAsync={this.Check_Status}
                        onFinish={this.onChangeScreenState}
                        onError={console.warn}/>
            )
        }
        return(
            <View style={styles.container}>
                <Swiper
                    loop={false}
                    showButtons={true}
                    onTouchStart={this._Navigation_Jump}>
                    <View style={styles.slide1_Container}>
                        <ImageBackground source={require("../assets/slide1_background.jpeg")} style={styles.slide_Background}>
                            <Image source={require("../assets/slide1_1.png")} style={styles.slide1_Image}/>
                            <View style={{marginTop: 60, alignItems:'center'}}>
                                <Text style={styles.slide1_Text}>Friendly and Simple Interface</Text>
                                <Text style={styles.slide1_1_Text}> Everybody feels comfortable to use this application...</Text>
                                <Text style={styles.slide1_1_Text}> Even when you are focusing on driving</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.slide2_Container}>
                        <ImageBackground source={require("../assets/slide1_background.jpeg")} style={styles.slide_Background}>
                            <Image source={require("../assets/slide1_1.png")} style={styles.slide1_Image}/>
                            <View style={{marginTop: 60, alignItems:'center'}}>
                                <Text style={styles.slide1_Text}>Friendly and Simple Interface</Text>
                                <Text style={styles.slide1_1_Text}> Everybody feels comfortable to use this application...</Text>
                                <Text style={styles.slide1_1_Text}> Even when you are focusing on driving</Text>
                            </View>
                        </ImageBackground>
                    </View>
                </Swiper>
            </View>
        )
    }
}

// Styles SheetStyle
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    slide1_Container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    slide1_Image:{
        resizeMode: "stretch",
        padding: 3,
        right: 2,
        height: Dimensions.get('window').height*0.55,
        width: Dimensions.get('window').width*0.55,
    },
    slide_Background:{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -1,
        position: 'absolute',
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    slide1_Text:{
        marginBottom: 25,
        fontSize: 20,
        fontWeight: "500",
        color: "#b3ffff",
    },
    slide1_1_Text:{
        fontSize: 12,
        fontWeight: "500",
        color: "#ccffff",
    },
    slide2_Container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
})
