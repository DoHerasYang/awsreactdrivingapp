import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    InteractionManager,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Import AWS Configure
import Amplify from '@aws-amplify/core';
import { Auth } from 'aws-amplify';
import {API,graphqlOperation} from "aws-amplify";
import config from '../aws-exports';
Amplify.configure(config)

export const listUserinfos = /* GraphQL */ `
  query ListUserinfos(
    $filter: ModeluserinfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserinfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        account
        title
        firstname
        lastname
        agegroup
        ethnicity
        postcode
        date_of_birth
        email
        driving_period
        commuting_behavior
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;


// Create the Class
export default class AuthLoad extends React.Component {
    // class state
    state = {
        aws_userToken: null,
        username: null,
        info_label: false,
    }

    // Component Status => Use the componentDidMount function
    async componentDidMount() {
        await this.Obtain_User();
        await this.Check_UserInfo()
            .then(this.loadLogin());
    }

    // Obtain the Username
    async Obtain_User(){
        await AsyncStorage.getItem('CurrentUser')
            .then(value => this.setState({username:value}))
    }

    async Check_UserInfo(){
        try{
            await API.graphql(graphqlOperation(listUserinfos,{
                filter:{
                    account:{
                        eq: this.state.username
                    }
                }
            }))
                .then(this.setState({info_label:true}))
        }catch (e) {
            console.log(e)
        }
    }

    async loadLogin(){
        await Auth.currentAuthenticatedUser()
            .then((user)=>{
                let re_Token = user.getSignInUserSession().getAccessToken().getJwtToken()
                this.setState({aws_userToken: re_Token})
            })
            .catch( (error)=> console.log(error))
        if(this.state.info_label){
            this.props.navigation.navigate(this.state.aws_userToken? 'UserTabs':'Login');
        }else{
            this.props.navigation.navigate(this.state.aws_userToken? 'UserInfo':'Login');
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        )
    }
}

// Styles Sheet
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgba(178,178,178,0.5)',
        alignContent: 'center',
        justifyContent: 'center',
    },
})
