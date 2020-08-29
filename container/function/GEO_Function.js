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

import MapView, {
    Marker,
    MapViewAnimated,
    AnimatedRegion,
    Polyline,} from 'react-native-maps';

import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import {obtain_Date} from "./Date_Function";
import {Mutation_GEO} from "./User_GraphQL";

import {Username} from "../user/UserScreen";
import {uuid} from "../user/UserScreen";


import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


export default class GEO_Function extends React.Component{

    // Configure the default state
    state = {
        initialMap: null,
        mapRegion: null,
        logLocation: null,
        location:{
            coords:{
                latitude: 0,
                longitude: 0,
            }
        },
        current_UserLocation:{
            coordinate:{}
        },
        start_tracking: false,
        date: obtain_Date(),
        routeCoordinates:[],
        distanceTraveled: 0,
        preLocation: null,
        coordinate: new AnimatedRegion({
            latitude: '',
            longitude: '',
            latitudeDelta: '',
            longitudeDelta: '',
        }),
        hour: Number(0),
        minute: Number(0),
        second: Number(0),
    };

    componentDidMount() {
        this._getLocationAsync();
    }


    // Tracking Background Function
    _trackingBackgroundFunction(){
        this.onChangeStatus("start_tracking",true);
        this._watchPosition();
    }

    // Zoom Button Function
    _zoomInDelta(){
        let lat_Delta = this.state.mapRegion.latitudeDelta;
        let lon_Delta = this.state.mapRegion.longitudeDelta;
        let cur_lat = this.state.mapRegion.latitude;
        let cur_lon = this.state.mapRegion.longitude;

        if(lat_Delta > 0.01 && lat_Delta<0.1){
            this.setState({
                mapRegion:{
                    latitude: cur_lat,
                    longitude: cur_lon,
                    latitudeDelta: (lat_Delta-0.003),
                    longitudeDelta: (lon_Delta-0.003),
                }
            })
        }else if (lat_Delta > 0.1){
            this.setState({
                mapRegion:{
                    latitude: cur_lat,
                    longitude: cur_lon,
                    latitudeDelta: (lat_Delta-0.005),
                    longitudeDelta: (lon_Delta-0.005),
                }
            })
        }else if (lat_Delta > 0.001 && lat_Delta<=0.01 ){
            this.setState({
                mapRegion:{
                    latitude: cur_lat,
                    longitude: cur_lon,
                    latitudeDelta: (lat_Delta-0.0005),
                    longitudeDelta: (lon_Delta-0.0005),
                }
            })
        }
    }

    _zoomOutDelta(){
        let lat_Delta = this.state.mapRegion.latitudeDelta;
        let lon_Delta = this.state.mapRegion.longitudeDelta;
        let cur_lat = this.state.mapRegion.latitude;
        let cur_lon = this.state.mapRegion.longitude;

        if(lat_Delta > 0.001 && lat_Delta<0.1){
            this.setState({
                mapRegion:{
                    latitude: cur_lat,
                    longitude: cur_lon,
                    latitudeDelta: (lat_Delta+0.005),
                    longitudeDelta: (lon_Delta+0.005),
                }
            })
        }else if (lat_Delta > 0.1){
            this.setState({
                mapRegion:{
                    latitude: cur_lat,
                    longitude: cur_lon,
                    latitudeDelta: (lat_Delta+0.05),
                    longitudeDelta: (lon_Delta+0.05),
                }
            })
        }

    }

    _watchPosition = () =>{
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                const { routeCoordinates, distanceTraveled} = this.state;
                const { latitude, longitude, speed } = position.coords;
                const newPosition_Coordinate = {
                    latitude,
                    longitude,
                };
                // Update the Current Position
                this.setState({
                    latitude,
                    longitude,
                    routeCoordinates: routeCoordinates.concat([newPosition_Coordinate]),
                    distanceTraveled:
                        distanceTraveled + (this.calculateDistanceTravelled(newPosition_Coordinate))/1000,
                    preLocation: newPosition_Coordinate,
                });
                const info = {
                    userid: uuid,
                    name: Username,
                    geodetailedinfo:{
                        date: this.state.date,
                        lat: latitude,
                        lon: longitude,
                        speed: speed,
                        distance: this.state.distanceTraveled,
                    }
                };
                Mutation_GEO(info);
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                distanceFilter: 10,
                maximumAge: 1000,
            });
    }

    // Update when the current user location change
    _updateUserPosition = (value) =>{
        this.setState({
            current_UserLocation:{
                coordinate: value.nativeEvent.coordinate,
            }
        })
    }

    // Focus on the current user region
    _focusUserPosition = () =>{
        this.setState({
            mapRegion:{
                latitude: this.state.current_UserLocation.coordinate.latitude,
                longitude: this.state.current_UserLocation.coordinate.longitude,
                latitudeDelta: this.state.mapRegion.latitudeDelta,
                longitudeDelta: this.state.mapRegion.latitudeDelta,
            }
        })
    }

    // Calculate the Travelled Distance
    calculateDistanceTravelled = (newCoordinate) =>{
        const { preLocation } = this.state;
        if(preLocation){
            return getDistance(preLocation,newCoordinate);
        }else {
            return Number(0)
        }
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
        // Initial Map Region
        let initialMap = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest})
        this.setState({
            initialMap,
            preLocation:{
                latitude: initialMap.coords.latitude,
                longitude: initialMap.coords.longitude,
            },
        });

        // Initial Marker Initial position
        // let location = {
        //     coords:{
        //         latitude: initialMap.coords.latitude,
        //         longitude: initialMap.coords.longitude,
        //     }
        // }
        // this.setState({
        //     location,
        // }
    }

    // Refresh the Time
    Display_Time(){
        if(this.state.second < 59 && this.state.minute <= 59){
            this.setState((pre) => {
                return{
                    second: pre.second+1,
                }
            })
        }else if(this.state.minute<59 && this.state.second===59){
            this.setState((pre) =>{
                return{
                    second: 0,
                    minute: pre.minute+1,
                }
            })
        }else if(this.state.minute===59 && this.state.second===59){
            this.setState((pre) =>{
                return{
                    hour: pre.hour+1,
                    minute: 0,
                    second: 0,
                }
            })
        }
    }

    onChangeStatus(tag,value){
        this.setState({
            [tag]:value,
        });
        this.interval = setInterval(() => this.Display_Time(), 1000);
    }

    _closeStatus(tag,value){
        this.setState({
            [tag]:value,
        });
        navigator.geolocation.clearWatch(this.watchID);
        clearInterval(this.interval);
        this._clearWatchStop();
    }

    _clearWatchStop(){
        this.setState({
            hour: Number(0),
            minute: Number(0),
            second: Number(0),
        })
    }


    // Interface
    // Initialize when user enter in this interface
    Initial_Map(){
        let latitude = this.state.initialMap.coords.latitude;
        let longitude = this.state.initialMap.coords.longitude;
        return(
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.00423,
                            longitudeDelta: 0.00423,
                        }}
                        onPress={this._handleLocationUpdate}
                        onUserLocationChange={this._updateUserPosition}
                        userLocationUpdateInterval={10000}
                        onRegionChangeComplete={this._handleMapRegionChange}
                        followsUserLocation={true}
                        showsUserLocation={true}
                        region={this.state.mapRegion}>
                        {/*<Marker*/}
                        {/*    coordinate={this.state.location.coords}*/}
                        {/*    draggable*/}
                        {/*    onDragEnd={this._handleLocationUpdate}/>*/}
                    </MapView>
                    <View style={styles.overContainer}>
                        <TouchableOpacity
                            onPress={()=> this._trackingBackgroundFunction()}
                            style={styles.buttonStyle}>
                            <Text>Start Tracking</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={styles.sideContainer}>
                    <TouchableOpacity
                        onPress={()=>this._focusUserPosition()}>
                        <Ionicons name="md-locate" size={33} color="black" style={{marginBottom:25}} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this._zoomInDelta()}>
                        <FontAwesome name="plus-square" size={30} color="black" style={{marginBottom:25}} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this._zoomOutDelta()}>
                        <FontAwesome name="minus-square" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    Tracking_Map(){
        return(
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={{
                            latitude: this.state.initialMap.coords.latitude,
                            longitude: this.state.initialMap.coords.longitude,
                            latitudeDelta: 0.00423,
                            longitudeDelta: 0.00423,
                        }}
                        onPress={this._handleLocationUpdate}
                        onRegionChangeComplete={this._handleMapRegionChange}
                        onUserLocationChange={this._updateUserPosition}
                        userLocationUpdateInterval={10000}
                        followsUserLocation={true}
                        showsUserLocation={true}
                        region={this.state.mapRegion}>
                        <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5}/>
                    </MapView>
                    <View style={styles.TipContainer}>
                        <TouchableOpacity  disabled={true}>
                            <Text style={styles.Tip_headingTextStyle}>{this.state.date}</Text>
                            <View style={{flexDirection:"row"}}>
                                <Text>Travelled Distance:</Text>
                                <Text style={{marginLeft:10}}>{this.state.distanceTraveled} KM</Text>
                            </View>
                            <View style={{flexDirection:"row"}}>
                                <Text>Travelled Time:</Text>
                                <Text style={{marginLeft:10}}>{this.state.hour}:{this.state.minute}:{this.state.second}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.overContainer}>
                        <TouchableOpacity
                            onPress={()=>this._closeStatus("start_tracking",false)}
                            style={styles.buttonStyle}>
                            <Text>Stop Tracking</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.sideContainer}>
                        <TouchableOpacity
                            onPress={()=>this._focusUserPosition()}>
                            <Ionicons name="md-locate" size={33} color="black" style={{marginBottom:25}} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>this._zoomInDelta()}>
                            <FontAwesome name="plus-square" size={30} color="black" style={{marginBottom:25}} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>this._zoomOutDelta()}>
                            <FontAwesome name="minus-square" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render(){
        if(this.state.initialMap && !this.state.start_tracking){
            return(
                this.Initial_Map()
            )
        }else if(this.state.initialMap && this.state.start_tracking) {
            return(
                this.Tracking_Map()
            )
        }else{
            // if we haven't loaded show a waiting placeholder
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )
        }
    }
}

// Styles for this function
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    mainContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overContainer:{
        position:'absolute',
        top: '80%',
        alignItems:"center",
        justifyContent:"center",
    },
    TipContainer:{
        position: 'absolute',
        width: 200,
        height: 120,
        backgroundColor: "rgba(255,255,255,0.7)",
        left: "3%",
        top: '3%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sideContainer:{
        position:'absolute',
        top: '60%',
        right: 20,
        alignItems:"center",
        justifyContent:"space-between",
        marginVertical: 30,
    },
    mapStyle:{
        alignSelf: 'stretch',
        ...StyleSheet.absoluteFillObject
    },
    buttonStyle:{
        width: 130,
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: 25,
        borderColor: '#000000',
        borderWidth: 0.9,
        height: 40,
        alignItems:"center",
        justifyContent:"center",
    },
    Tip_headingTextStyle:{
        fontSize: 17,
        fontWeight: "400",
        marginBottom: 5,
    },
})
