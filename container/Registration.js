import Amplify from '@aws-amplify/core'
import config from './aws-exports'
import React,{useState,useEffect,Component} from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { DataStore } from '@aws-amplify/datastore'
import { Message } from './src/models'
import Image from "react-native-web/dist/exports/Image";

// Configure the Amplify Section
Amplify.configure(config)
const initialState = {color: 'black', title: "" }

function App(){
  const [formState, updateFormState] = React.useState(initialState)
  const [messages, updateMessages] = React.useState([])

  useEffect(() => {
    fetchMessages()
    const subscription = DataStore.observe(Message).subscribe(()=> fetchMessages())
    return () => subscription.unsubscribe()
  })

  // Update the Change of the content
  function onChangeText(key,value){
    updateFormState({ ...formState, [key]:value})
  }
  // Fetch the Message from the AWS data
  async function fetchMessages(){
    const messages = await(DataStore.query(Message))
    updateMessages(messages)
  }

  // Create Message flow
  async function createMessage(){
    if(!formState.title) return
    await DataStore.save(new Message({...formState}))
    updateFormState(initialState)
  }

  // Real Interface of the Application
  return (
    <View style={styles.container}>
      <ImageBackground source={require("./assets/Registration_bak.jpg")} style={styles.BK_Image}>
        <View style={heading_sheet.model}>
          <Text style={heading_sheet.heading}>Registration</Text>
        </View>
        <TextInput
          onChangeText= {v =>onChangeText('title',v)}
          placeholder='Title'
          value={formState.title}
          style={input}
        />
        <TextInput
          onChangeText= {v =>onChangeText("color",v)}
          placeholder='FirstName'
          value={formState.color}
          style={input}
        />

        <Button onPress={createMessage} title='Register'/>
        {
          messages.map(message=>(
            <View key={message.id} style={{...messageStyle, backgroundColor: message.color}}>
              <View style={messageBg}>
                <Text style={messageTitle}>{message.title}</Text>
              </View>
            </View>
        ))
        }
      </ImageBackground>
  </View>
  );
}

const input = {
  marginBottom: 10,
  padding: 7, 
  backgroundColor: '#ddd',
}

const messageBg={
  backgroundColor:'white',
}

const messageStyle={
  padding: 20,
  marginTop: 7,
  borderRadius: 4,
}
const messageTitle={
  margin: 0,
  padding: 9,
  fontsize: 20,
}

const heading_sheet = StyleSheet.create({
  model:{
    left: 0,
    right: 0,
    alignItems:'center',
    justifyContent: 'center',
    margin: 5,
  },
  heading:{
    fontWeight: "normal",
    fontSize: 35,
    margin: 30,
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 12,
    backgroundColor: "#CCCCCC",
    alignItems: 'center',
    justifyContent: 'center',
  },
  BK_Image:{
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
  },
  Button_Fold:{
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default App

//TODO: IN IOS WE should configure the info.plist: App Transport Security Settings --> Allow Arbitrary Loads --> YES
//