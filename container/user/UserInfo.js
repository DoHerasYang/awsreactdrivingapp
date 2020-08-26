import React, {Component} from 'react';

import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {Container, Content, DatePicker, Form, Icon, Item, Label, Picker, Input} from 'native-base';

import Amplify from '@aws-amplify/core';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

import { API, graphqlOperation} from 'aws-amplify';
import AsyncStorage from '@react-native-community/async-storage';
import {createUserinfo} from "../../src/graphql/mutations";

const height = Dimensions.get("window");

export default class UserInfo extends Component{

    // Class State for Storing the Remote Data
    state = {
        account: "",
        title: "",
        firstname: "",
        lastname: "",
        agegroup: "",
        ethnicity: "",
        postcode: "",
        date_of_birth: new Date().toLocaleString(),
        email: "",
        driving_period: "",
        commuting_behavior: "",
        screenHeight: height,
    }

    constructor() {
        super();
        this.Fetch_LocalUser();
    }

    // Control the Scroll Function
    onContentSizeChange = (contentWidth,contentHeight) =>{
        this.setState({screenHeight: contentHeight})
    }

    Obtain_CurrentData(){
        let date = new Date();
        let year = date.getFullYear();
        let month = (date.getMonth()+1);
        let day = date.getDate();
        return new Date(year, month, day);
    }

    Transform_Date(date){
        let year = date.getFullYear().toString();
        let month = (date.getMonth()+1).toString();
        let day = date.getDate().toString();
        return year+'-'+month+'-'+day
    }

    async Fetch_LocalUser(){
        await AsyncStorage.getItem('CurrentUser')
            .then(value => this.setState({account: value}))
    }

    async Submit_Info(){
        let info = {
            account: this.state.account,
            title: this.state.title,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            agegroup: this.state.agegroup,
            ethnicity: this.state.ethnicity,
            postcode: this.state.postcode,
            date_of_birth: this.state.date_of_birth,
            email: this.state.email,
            driving_period: this.state.driving_period,
            commuting_behavior: this.state.commuting_behavior,
        }
        try{
            await API.graphql(graphqlOperation(createUserinfo,{input:info}));
            console.log("Successfully");
            this.props.navigation.navigate("UserTabs");
        }catch (e) {
            console.log(e)
        }
    }

    render() {
        const scrollEnabled = this.state.screenHeight > height;
        return(
            <SafeAreaView>
                <StatusBar barStyle="light-content" backgroundColor="#ffffff"/>
                    <ScrollView
                        Style={{flex:1}}
                        scrollEnabled={scrollEnabled}
                        onContentSizeChange={this.onContentSizeChange}
                        contentContainerStyle={style_ScrollView.container}>
                        <Container style={style_ScrollView.container_Info}>
                            <Content>
                                {/*header*/}
                                <View style={style_ScrollView.header_View}>
                                    <Text style={style_ScrollView.header_Text}>Create Your New Profile</Text>
                                </View>
                                <Form style={style_ScrollView.form_Style}>
                                    <Item picker style={style_ScrollView.picker_ItemStyle}>
                                        <Form style={style_ScrollView.sec_ItemStyle}>
                                            <Label style={{marginTop:20}}>Title</Label>
                                        </Form>
                                        <Picker
                                            placeholder="Title"
                                            placeholderStyle={{ textAlign:"center", fontSize: 15, fontWeight: "400"}}
                                            iosIcon={<Icon name="arrow-down"/>}
                                            mode="dropdown"
                                            style={{ height: 40, width:120, marginBottom:-20}}
                                            selectedValue={this.state.title}
                                            onValueChange={(value)=>this.setState({title:value})}>
                                            <Picker.Item label="Mr." value="Mr"/>
                                            <Picker.Item label="Ms." value="Ms"/>
                                            <Picker.Item label="Mrs." value="Mrs"/>
                                        </Picker>
                                    </Item>
                                    {/*firstname*/}
                                    <Item style={style_ScrollView.input_ItemStyle}>
                                        <Form style={style_ScrollView.sec_TextStyle}>
                                            <Label style={{marginTop:19}}>First Name</Label>
                                        </Form>
                                        <Input
                                            style={style_ScrollView.input_Style}
                                            placeholder='First Name'
                                            placeholderStyle={{ fontSize: 15, fontWeight: "200"}}
                                            keyboardType="default"
                                            textContentType="name"
                                            autoCorrect={false}
                                            onChangeText={value=> this.setState({firstname:value})}/>
                                    </Item>
                                    {/*lastname*/}
                                    <Item style={style_ScrollView.input_ItemStyle}>
                                        <Form style={style_ScrollView.sec_TextStyle}>
                                            <Label style={{marginTop:19}}>Last Name</Label>
                                        </Form>
                                        <Input
                                            style={style_ScrollView.input_Style}
                                            placeholder='Last Name'
                                            placeholderStyle={{ fontSize: 15, fontWeight: "200"}}
                                            keyboardType="default"
                                            autoCorrect={false}
                                            autoCapitalize='none'
                                            textContentType="name"
                                            onChangeText={value=> this.setState({lastname:value})}/>
                                    </Item>
                                    {/*ageGroup*/}
                                    <Item style={style_ScrollView.input_ItemStyle}>
                                        <Form style={style_ScrollView.sec_ItemStyle}>
                                            <Label style={{marginTop:19}}>Age Group</Label>
                                        </Form>
                                        <Picker
                                            placeholder="Age Group"
                                            placeholderStyle={{ textAlign:"center", fontSize: 15, fontWeight: "400"}}
                                            iosIcon={<Icon name="arrow-down"/>}
                                            mode="dropdown"
                                            style={{ height: 40, width:120, marginBottom:-20}}
                                            selectedValue={this.state.agegroup}
                                            onValueChange={(value)=>this.setState({agegroup:value})}>
                                            <Picker.Item label="18-25" value="18-25"/>
                                            <Picker.Item label="26-35" value="26-35"/>
                                            <Picker.Item label="36-45" value="36-45"/>
                                            <Picker.Item label="46-55" value="46-55"/>
                                            <Picker.Item label="56-65" value="56-65"/>
                                            <Picker.Item label="65+" value="65+"/>
                                        </Picker>
                                    </Item>
                                    {/*PostCode*/}
                                    <Item style={style_ScrollView.input_ItemStyle} inlineLabel>
                                        <Form style={style_ScrollView.sec_TextStyle}>
                                            <Label style={{marginTop:20}}>PostCode</Label>
                                        </Form>
                                        <Input
                                            style={style_ScrollView.input_Style}
                                            placeholder='PostCode'
                                            autoCapitalize='none'
                                            placeholderStyle={{ fontSize: 15, fontWeight: "400"}}
                                            keyboardType="default"
                                            autoCorrect={false}
                                            onChangeText={value=> this.setState({postcode:value})}/>
                                    </Item>
                                    {/*Date Picker*/}
                                    <Item style={style_ScrollView.input_ItemStyle}>
                                        <Form style={style_ScrollView.sec_DateStyle}>
                                            <Form style={{marginLeft:5,marginRight:35,alignItems:'center',}}>
                                                <Label style={{marginTop:20}}>Date Of Birth</Label>
                                            </Form>
                                            <Form style={{marginTop:10}}>
                                                <DatePicker
                                                    defaultDate={new Date(2018, 4, 4)}
                                                    maximumDate={this.Obtain_CurrentData()}
                                                    locale={"en"}
                                                    placeHolderText="Select BirthDay"
                                                    modalTransparent={false}
                                                    animationType={"slide"}
                                                    onDateChange={(value)=>this.setState({date_of_birth:(this.Transform_Date(value))})}/>
                                            </Form>
                                        </Form>
                                    </Item>
                                    {/*Email*/}
                                    <Item style={style_ScrollView.input_ItemStyle} inlineLabel>
                                        <Form style={style_ScrollView.sec_TextStyle}>
                                            <Label style={{marginTop:20}}>Email</Label>
                                        </Form>
                                        <Input
                                            style={style_ScrollView.input_Style}
                                            placeholder='Email'
                                            autoCapitalize='none'
                                            placeholderStyle={{ fontSize: 15, fontWeight: "400"}}
                                            keyboardType="email-address"
                                            autoCorrect={false}
                                            onChangeText={value=> this.setState({email:value})}/>
                                    </Item>
                                    {/*Time Of Driving*/}
                                    <Item style={style_ScrollView.input_ItemStyle}>
                                        <Form style={style_ScrollView.sec_ItemStyle}>
                                            <Label style={{marginTop:20}}>Time of Driving</Label>
                                        </Form>
                                        <Picker
                                            placeholder="Time of Driving"
                                            placeholderStyle={{ textAlign:"center", fontSize: 15, fontWeight: "400"}}
                                            iosIcon={<Icon name="arrow-down"/>}
                                            mode="dropdown"
                                            style={{ height: 40, width:140, marginBottom:-20}}
                                            selectedValue={this.state.driving_period}
                                            onValueChange={(value)=>this.setState({driving_period:value})}>
                                            <Picker.Item label="less 1 Year" value="1-"/>
                                            <Picker.Item label="1-4 Years" value="1-4"/>
                                            <Picker.Item label="5-10 Years" value="5-10"/>
                                            <Picker.Item label="More Than 10 Years" value="10+"/>
                                        </Picker>
                                    </Item>
                                    {/*Time Of Commuting*/}
                                    <Item style={style_ScrollView.input_ItemStyle}>
                                        <Form style={style_ScrollView.sec_ItemStyle}>
                                            <Label style={{marginTop:20}}>Commuting</Label>
                                        </Form>
                                        <Picker
                                            placeholder="Commuting Hours"
                                            placeholderStyle={{ textAlign:"center", fontSize: 15, fontWeight: "400"}}
                                            iosIcon={<Icon name="arrow-down"/>}
                                            mode="dropdown"
                                            style={{ height: 40, width:180, marginBottom:-20}}
                                            selectedValue={this.state.commuting_behavior}
                                            onValueChange={(value)=>this.setState({commuting_behavior:value})}>
                                            <Picker.Item label="less 1 Hour" value="1-"/>
                                            <Picker.Item label="1-2 Hours" value="1-2"/>
                                            <Picker.Item label="2-5 Hours" value="2-5"/>
                                            <Picker.Item label="More Than 5 Hours" value="5+"/>
                                        </Picker>
                                    </Item>
                                    <TouchableOpacity
                                        style={style_ScrollView.button_Style}
                                        onPress={()=>this.Submit_Info()}>
                                        <Text>Submit</Text>
                                    </TouchableOpacity>
                                </Form>
                            </Content>
                        </Container>
                    </ScrollView>
            </SafeAreaView>
        );
    }
}

const style_ScrollView = StyleSheet.create({
    container:{
        flexGrow:1,
    },
    container_Info:{
        flexGrow: 1,
    },
    form_Style:{
        alignItems: 'center',
    },
    header_View:{
        marginTop: 20,
        alignItems: 'flex-start',
        alignContent: 'center',
        backgroundColor: '#ffe5b3',
        marginBottom: 40,
    },
    header_Text:{
        fontSize: 28,
        fontWeight: "500",
    },
    picker_ItemStyle:{
        left: 9,
        width: Dimensions.get('window').width*0.9,
    },
    input_ItemStyle:{
        marginTop: 10,
        flexDirection: 'row',
        width: Dimensions.get('window').width*0.9,
    },
    sec_ItemStyle:{
        alignItems: 'center',
        marginRight: 20,
        backgroundColor: '#ffe5b3',
        height: 40,
        width: 115,
    },
    sec_TextStyle:{
        alignItems: 'center',
        marginRight: 32,
        backgroundColor: '#ffe5b3',
        height: 40,
        width: 115,
    },
    sec_DateStyle:{
        flexDirection: 'row',
        width: 200,
        height: 40,
        backgroundColor: '#ffe5b3',
    },
    input_Style:{
        height: 50,
        marginBottom: -15,
    },
    button_Style:{
        backgroundColor: "#c49191",
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:10
    }
})