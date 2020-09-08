import React from 'react'
import {StyleSheet, Switch, Text, TouchableOpacity, View, Alert} from 'react-native';

import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { Auth } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import config from '../../aws-exports';

Amplify.configure(config)

// The Interface Class for the Preference
export default class HomeScreen extends React.Component {
    state = {
        notification_value: false,
        weather_value: false,
        traffic_value: false,
        report_value: 'daily',
        textual_value: false,
        graphical_value: false,
    }

    // Array for the name of the states
    State_Keys = ['notification_value','weather_value','traffic_value','report_value','textual_value','graphical_value']

    // Switch Function
    // toggleSwitch = (tag,value) => {
    //     this.setState({[tag]: value});
    // }
    
    constructor() {
        super();
        this.Initialize_Keys();
    }

    Initialize_Keys = async () =>{
        AsyncStorage.getAllKeys((err,keys)=>{
            AsyncStorage.multiGet(keys,(error,stores)=>{
                stores.map((result,i,store)=>{
                    let key = store[i][0];
                    let value = store[i][1];
                    // Judge the value of the
                    if ( this.State_Keys.indexOf(key) > -1){
                        // Convert the Value type
                        if( value === 'true'){
                            value = (value === 'true');
                        }
                        if( value === 'false'){
                            value = !(value === 'false');
                        }
                        this.setState({
                            [key]:value,
                        });
                    }
                })
            })
        })
    }

    // Store the User Preference
     Async_Store = async(key,value) => {
        AsyncStorage.getItem(key,(err,result)=>{
            if (result === null){
                AsyncStorage.setItem(key,value);
            }else{
                AsyncStorage.removeItem(key);
                AsyncStorage.setItem(key,value);
            }
        });
    }

     toggleSwitch(tag,value){
        this.setState({[tag]: value});
        // local storage for each users Preference
        let store_value = (typeof(value)==='boolean')? value.toString() : value;
        this.Async_Store(tag,store_value);
    }

     async Log_out(){
          // log out the current user
         await Auth.signOut();
         this.props.navigation.navigate('Login');
    }

    // View
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.interfaceStyle}>
                    <Text style={styles.textLogo}>Preference</Text>
                    <View style={styles.columnStyle}>
                        <View style={styles.textcolumnStyle}>
                            <Text style={styles.textStyle}>Notification</Text>
                        </View>
                        <Switch
                            style={styles.switchStyle}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={"#f4f3f4"}
                            onValueChange={(value) => this.toggleSwitch("notification_value",value)}
                            ios_backgroundColor="#3e3e3e"
                            value={this.state.notification_value}/>
                    </View>
                    <View style={styles.columnStyle}>
                        <View style={styles.textcolumnStyle}>
                            <Text style={styles.textStyle}>Weather Alert</Text>
                        </View>
                        <Switch
                            style={styles.switchStyle}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={"#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => this.toggleSwitch("weather_value",value)}
                            value={this.state.weather_value}/>
                    </View>
                    <View style={styles.columnStyle}>
                        <View style={styles.textcolumnStyle}>
                            <Text style={styles.textStyle}>Traffic Alert</Text>
                        </View>
                        <Switch
                            style={styles.switchStyle}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={"#f4f3f4"}
                            onValueChange={(value) => this.toggleSwitch("traffic_value",value)}
                            value={this.state.traffic_value}
                            ios_backgroundColor="#3e3e3e"/>
                    </View>
                    <View style={styles.sec_columnStyle}>
                        <Text style={styles.textSecondLogo}>Report Preference</Text>
                    </View>
                    <View style={styles.multicolumnStyle}>
                        {/*<Text style={styles.radioTextStyle}>Daily</Text>*/}
                        {/*<View style={styles.borderStyle}>*/}
                        {/*    <RadioButton*/}
                        {/*        value="false"*/}
                        {/*        status={this.state.report_value===false? 'checked':"unchecked"}*/}
                        {/*        OnPress={() => this.toggleButton()}*/}
                        {/*        color='#ff1a75'/>*/}
                        {/*</View>*/}
                        <RadioButton.Group
                            onValueChange={(value)=>this.toggleSwitch("report_value",value)}
                            value={this.state.report_value}
                            color='#ff1a75'>
                            <RadioButton.Item label="         Daily" value="daily" status={this.state.report_value==='daily'? 'checked':"unchecked"} />
                            <RadioButton.Item label="         Weekly" value="weekly" status={this.state.report_value==='weekly'? 'checked':"unchecked"}/>
                        </RadioButton.Group>
                        {/*<Text style={styles.radioTextStyle}>Weekly</Text>*/}
                        {/*<View style={styles.borderStyle}>*/}
                        {/*    <RadioButton*/}
                        {/*        value="weekly"*/}
                        {/*        status = {this.state.report_value===true? 'checked':"unchecked"}*/}
                        {/*        OnPress = {(value) => this.toggleSwitch("report_value",value)}*/}
                        {/*        color='#ff1a75'/>*/}
                        {/*</View>*/}
                    </View>
                    <View style={styles.columnStyle}>
                        <View style={styles.textcolumnStyle}>
                            <Text style={styles.radioTextStyle}>Textual Feedback Reports</Text>
                        </View>
                        <Switch
                            style={styles.switchStyle}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={"#f4f3f4"}
                            onValueChange={(value) => this.toggleSwitch("textual_value",value)}
                            value={this.state.textual_value}
                            ios_backgroundColor="#3e3e3e"/>
                    </View>
                    <View style={styles.columnStyle}>
                        <View style={styles.textcolumnStyle}>
                            <Text style={styles.radioTextStyle}>Graphical Feedback Reports</Text>
                        </View>
                        <Switch
                            style={styles.switchStyle}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={"#f4f3f4"}
                            onValueChange={(value) => this.toggleSwitch("graphical_value",value)}
                            value={this.state.graphical_value}
                            ios_backgroundColor="#3e3e3e"/>
                    </View>
                    <TouchableOpacity
                        style={styles.logout_TouchStyle}
                        onPress={()=>this.Log_out()}>
                        <Text style={styles.logout_textStyle}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#faf5e5",
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLogo:{
        fontWeight: 'bold',
        fontSize: 30,
        padding: 6,
        color: '#000000',
        marginTop: 25,
        marginBottom: 10,
        textAlign: 'center',
    },
    textSecondLogo:{
        marginTop: 13,
        fontWeight: '500',
        color: '#000000',
        fontSize: 19,
    },
    interfaceStyle:{
        width: '80%',
        alignItems: 'center',
    },
    columnStyle:{
        flexDirection: 'row',
        height: 38,
        marginBottom: 10,
        // backgroundColor: '#ffe5b3',
        width: 350,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    sec_columnStyle:{
        height: 38,
        marginBottom: 10,
        // backgroundColor: '#ffe5b3',
        width: 350,
        alignItems: 'center',
    },
    multicolumnStyle:{
        height: 50,
        flexDirection: 'row',
        marginBottom: 10,
        // backgroundColor: '#ffe5b3',
        width: 350,
        justifyContent: 'center',
        borderWidth: 0.5,
    },
    textcolumnStyle:{
        width: 200,
    },
    textStyle: {
        alignItems: 'center',
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 18,
        padding: 5,
        color: '#000000',
        width: 180,
    },
    switchStyle:{
        marginLeft: 80,
    },
    radioTextStyle:{
        padding: 10,
        fontSize: 14,
    },
    borderStyle:{
        width: 35,
        height: 35,
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth: 0.3,
        borderRadius: 35,
    },
    logout_TouchStyle:{
        width:"70%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:48,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
    },
    logout_textStyle:{
        fontWeight: "500",
        fontSize: 17,
    },
})