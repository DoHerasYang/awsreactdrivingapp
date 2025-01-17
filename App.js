import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
// import { createStackNavigator } from 'react-navigation-stack'; 4.x version
import {createStackNavigator} from "@react-navigation/stack";
import { createSwitchNavigator, createAppContainer} from "react-navigation";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

// import the Pages containers
import WelcomePages from "./container/Welcome";
import Login from "./container/Login";
import Signup from './container/Signup';
import UserInfo from "./container/user/UserInfo";
import ForgetPassword from './container/ForgetPasswordScreen';
import AuthLoadScreen from "./container/AuthLoad";

// User Pages
import UserScreen from "./container/user/UserScreen";
import SettingPage from "./container/user/SettingScreen";
import ReportScreen from "./container/user/ReportScreen";
import GEO_Function from "./container/function/GEO_Function";

// import the icons
import { Ionicons } from '@expo/vector-icons';

// AWS Configs
import Amplify from '@aws-amplify/core';
import config from './aws-exports';
Amplify.configure(config);

// // Create the Stack for Auth and Login or Sing up Function Pages
// const AuthStackNavigator = createStackNavigator({
//     Initial:{
//         screen: Login,
//         navigationOptions:()=> ({
//             title:'Welcome to this App',
//             headerShown: false,
//         }),
//     },
//     Signup:{
//         screen: Signup,
//     },
//     ForgetPassword:{
//         screen: ForgetPassword,
//     },
//     AuthLoad:{
//         screen: AuthLoadScreen,
//         navigationOptions:()=> ({
//             headerShown: false,
//         }),
//     }
// });
//
// const AppStackNavigator = createStackNavigator({
//     MainPage:{
//         screen: MainPage,
//     },
//     User:{
//         screen: UserScreen,
//     },
// })
//
// // Create the User Home Screen for the Main Page
// // The Configuration for the Bottom Tabs -> configuration and option
//
// // Application nav Stack
// const appNav = createSwitchNavigator({
//         AuthLoad: AuthLoadScreen,
//         Auth: AuthStackNavigator,
//         App: AppStackNavigator,
//     },
//     {
//         initialRouteName: 'Auth',
//     }
// );
//
// // AppContainer
// const AppContainer = createAppContainer(appNav)
//
// export default class App extends React.Component{
//     render() {
//         return <AppContainer />;
//     }
// };

//Configure the tabs for stack
const Tab = createMaterialTopTabNavigator();

function UserTabs(){
    return(
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
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginTop: -5,
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
                    } else if (route.name === 'Preference') {
                        iconName = focused
                            ? 'ios-list-box'
                            : 'ios-list';
                    }
                    return <Ionicons name={iconName} size={20} color={color} />;
                }
            })}>
            <Tab.Screen name="Home" component={UserScreen} />
            <Tab.Screen name="Preference" component={SettingPage} />
        </Tab.Navigator>
    )
}

const Stack = createStackNavigator();

function MyAppStack({initialRouteName}){
    return (
        <Stack.Navigator
            initialRouteName={initialRouteName}>
            <Stack.Screen
                name="WelcomePages"
                component={WelcomePages}
                options={{ headerShown: false, }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    title: 'My home',
                    headerShown: false, }}
            />
            <Stack.Screen
                name='ForgetPassword'
                component={ForgetPassword}
                options={{
                    title:'',
                    headerStyle:{
                        backgroundColor: '#290066',
                        shadowColor: 'transparent',
                        shadowRadius: 0,
                        shadowOffset: {
                            height: 0,
                        }
                    },
                    headerTintColor: 'white',
                }}
            />
            <Stack.Screen
                name='Signup'
                component={Signup}
                options={{
                    title:'',
                    headerStyle:{
                        backgroundColor: '#290066',
                        shadowColor: 'transparent',
                        shadowRadius: 0,
                        shadowOffset: {
                            height: 0,
                        }
                    },
                    headerBackTitle: 'Back',
                    headerTintColor: 'white',
                }}
            />
            <Stack.Screen
                name='AuthLoad'
                component={AuthLoadScreen}
                options={{
                    headerShown: false,
                    title:'',
                    headerStyle:{
                        backgroundColor: '#290066',
                        shadowColor: 'transparent',
                        shadowRadius: 0,
                        shadowOffset: {
                            height: 0,
                        }
                    },
                    headerTintColor: 'white',
                }}
            />
            <Stack.Screen
                name='UserInfo'
                component={UserInfo}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='UserTabs'
                component={UserTabs}
                options={{
                    title:'',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Report'
                component={ReportScreen}
                options={{
                    title:'My Report',
                    headerShown: true,
                    headerBackTitle: 'Back',
                    headerStyle:{
                        backgroundColor: '#290066',
                        shadowColor: 'transparent',
                        shadowRadius: 0,
                        shadowOffset: {
                            height: 0,
                        }
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle:{
                        fontWeight: 'bold',
                    }
                }}
            />
            <Stack.Screen
                name='GEO'
                component={GEO_Function}
                options={{
                    title:'',
                    headerStyle:{
                        backgroundColor: '#290066',
                        shadowColor: 'transparent',
                        shadowRadius: 0,
                        shadowOffset: {
                            height: 0,
                        }
                    },
                    headerTintColor: 'white',
                }}
            />
        </Stack.Navigator>
    );
}

export default function App() {

    const [AppStatus, setAppStatus] = React.useState({check_status: null});

    React.useEffect(()=>{
        let status;
        async function Obtain_AppStatus(){
            try{
                status = await AsyncStorage.getItem('AppStatus');
            }catch (e) {
               console.log(e);
            }
            setAppStatus({check_status : status});
        }
        Obtain_AppStatus();
    })

    if (AppStatus.check_status === "false"){
        return (
            <NavigationContainer>
                <MyAppStack
                    initialRouteName={"Login"}/>
            </NavigationContainer>
        );
    }else{
        return(
            <NavigationContainer>
                <MyAppStack
                    initialRouteName={"WelcomePages"}/>
            </NavigationContainer>
        );
    }
}