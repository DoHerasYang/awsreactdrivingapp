import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Platform,
    Dimensions,
    Button,
    TouchableOpacity,
} from 'react-native';

import MapView,{ Marker, MapViewAnimated} from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export default class GEO_Function extends React.Component{

    // Configure the default state
    state = {
        initialMap: null,
        location:{
            coords:{
                latitude: 0,
                longitude: 0,
            }
        },
    };


    componentDidMount() {
        this._getLocationAsync();
    }

    _handleMapRegionChange = (mapRegion) => {
        this.setState({mapRegion});
    };

    _handleLocationUpdate = (loc) =>{
        this.setState({
            location:{
                ...this.state.location,
                coords:{
                    ...this.state.location.coords,
                    ...loc.nativeEvent.coordinate,
                },
            },
        });
    };

    // Obtain the current Region
    _getLocationAsync = async() => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
                this.setState({
                    logLocation : "Permission to access location was denied",
                    location,
                });
        }
        let initialMap = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        this.setState({
            initialMap,
        });
    }

    render(){
        if(this.state.initialMap){
            let current_latitude = this.state.initialMap.coords.latitude;
            let current_longitude = this.state.initialMap.coords.longitude;
            return(
                <View style={styles.container}>
                    <View style={styles.container}>
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={{
                                // latitude: 34.56602,
                                // longitude: 110.09207,
                                latitude: current_latitude,
                                longitude: current_longitude,
                                latitudeDelta: 10,
                                longitudeDelta: 10,
                            }}
                            onPress={this._handleLocationUpdate}
                            onRegionChangeComplete={this._handleMapRegionChange}>
                            <Marker
                                coordinate={this.state.location.coords}
                                draggable
                                onDragEnd={this._handleLocationUpdate}/>
                        </MapView>
                        <View style={styles.overContainer}>
                            <TouchableOpacity
                                activeOpacity={0.1}>
                                <Text>Start Tracking</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        } else {
            // if we haven't loaded show a waiting placeholder
            return (
                <View style={styles.container}>
                    <Text>Waiting...</Text>
                </View>
            )
        }
    }
}

// Styles for this function
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overContainer:{
        position:'absolute',
        top: '80%',
        width:"40%",
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: 25,
        borderColor: '#000000',
        borderWidth: 1,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        padding: 2,
    },
    mapStyle:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})
