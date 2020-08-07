import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    InteractionManager,
} from 'react-native';

// Import AWS Configure
import Amplify from '@aws-amplify/core';
import { Auth } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config)

// Create the Class
export default class AuthLoad extends React.Component {
    // class state
    state = {
        aws_userToken: null
    }

    // Component Status => Use the componentDidMount function
    async componentDidMount() {
        await this.loadLogin()
    }

    async loadLogin(){
        await Auth.currentAuthenticatedUser()
            .then((user)=>{
                let re_Token = user.getSignInUserSession().getAccessToken().getJwtToken()
                this.setState({aws_userToken: re_Token})
            })
            .catch( (error)=> console.log(error))
        this.props.navigation.navigate(this.state.aws_userToken? 'UserTabs':'Login');
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
