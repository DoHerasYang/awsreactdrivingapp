import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Screens
import UserScreen from "./user/UserScreen";

// User Pages
const Tab = createMaterialTopTabNavigator();

function SettingScreen(){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    )
}

export default class MainPage extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    tabBarPosition='bottom'
                    animationEnable={true}
                    lazy={true}
                    swipeEnabled={true}
                    tabBarOptions={{
                        activeTintColor: 'tomato',
                        tabStyle:{
                            borderWidth: 1,
                            borderBottomColor: '#ccccc2',
                            borderLeftColor: '#ccccc2',
                            borderTopColor: '#ccccc2',
                            borderRightColor: '#ccccc2',
                        },
                        inactiveColor: 'gray',
                        showIcon: true,
                        labelStyle: {
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginTop: -7,
                            left: 'auto',
                            right: 3,
                        },
                        indicatorStyle: {
                            height: 0,
                        },
                        // style: { backgroundColor: '#f16f69' },
                    }}
                    screenOptions= {({route}) => ({
                        tabBarIcon:({ focused, color}) => {
                            let iconName;
                            if (route.name === 'Home') {
                                iconName = focused
                                    ? 'ios-home'
                                    : 'ios-information-circle-outline';
                            } else if (route.name === 'Setting') {
                                iconName = focused
                                    ? 'ios-list-box'
                                    : 'ios-list';
                            }
                            return <Ionicons name={iconName} size={18.5} color={color} />;
                        }
                    })}
                >
                    <Tab.Screen name="Home" component={UserScreen} />
                    <Tab.Screen name="Setting" component={SettingScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5059ae',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        padding: 10,
        color: '#fff'
    }
})