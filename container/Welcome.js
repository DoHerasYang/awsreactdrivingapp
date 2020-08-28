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

let current_Status = true

export default class WelcomePages extends React.Component{

    state = {
        isReady: false,
    }

    _ShowNavigation(e,state,context){
        if(state.index === 1){
            this.props.navigation.navigate("Login");
        }
    }

    async Check_Status(){
        try{
            const first_Status  = await AsyncStorage.getItem('AppStatus');
            current_Status = first_Status !== "false";
        } catch(e){
            console.log(e);
        }
    }

    render() {
        if(!this.state.isReady){
            return(
                <AppLoading
                    startAsync={this.Check_Status}
                    onFinish={() => {
                        this.setState({
                                isReady: true,
                        });
                    }}
                    onError={console.warn}/>
            )
        }
        return(
            <View style={styles.container}>
                <Swiper
                    showButtons={true}
                    onScrollBeginDrag={(e,state,context) => this._ShowNavigation(e,state,context)}>
                    <View style={styles.slide1_Container}>
                        <ImageBackground source={require("../assets/slide1_background.jpeg")} style={styles.slide1_Background}>
                            <View style={{marginTop: 40,alignItems:'center'}}>
                                <Text style={styles.slide1_Text}>Simple and Friendly</Text>
                                <Text style={styles.slide1_Text}>INTERFACE</Text>
                            </View>
                            <Image source={require("../assets/slide1_1.png")} style={styles.slide1_Image}/>
                        </ImageBackground>
                    </View>
                    <View style={styles.slide2_Container}>
                        <ImageBackground source={require("../assets/slide1_background.jpeg")} style={styles.slide1_Background}>
                            <View style={{marginTop: 40,alignItems:'center'}}>
                                <Text style={styles.slide1_Text}>More Conveniently To Use </Text>
                                <Text style={styles.slide1_Text}>When You Driving</Text>
                            </View>
                            <Image source={require("../assets/slide1_1.png")} style={styles.slide1_Image}/>
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
        marginTop: 15,
        resizeMode: "stretch",
        padding: 3,
        right: 3,
        height: Dimensions.get('window').height*0.63,
        width: Dimensions.get('window').width*0.62,
    },
    slide1_Background:{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: null,
        width: null,
        zIndex: -1,
        position: 'absolute',
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    slide1_Text:{
        marginBottom: 5,
        fontSize: 22,
        fontWeight: "500",
        color: "white",
    },
    slide2_Container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
})
