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
    };

    componentDidMount() {
        this._getLocationAsync();
    }

    // Zoom Button Function
    _zoomInDelta(){
        let lat_Delta = this.state.mapRegion.latitudeDelta;
        let lon_Delta = this.state.mapRegion.longitudeDelta;
        let cur_lat = this.state.mapRegion.latitude;
        let cur_lon = this.state.mapRegion.longitude;

        if(lat_Delta > 0.001 && lat_Delta<0.1){
            this.setState({
                mapRegion:{
                    latitude: cur_lat,
                    longitude: cur_lon,
                    latitudeDelta: (lat_Delta-0.005),
                    longitudeDelta: (lon_Delta-0.005),
                }
            })
        }else if (lat_Delta > 0.1){
            this.setState({
                mapRegion:{
                    latitude: cur_lat,
                    longitude: cur_lon,
                    latitudeDelta: (lat_Delta-0.05),
                    longitudeDelta: (lon_Delta-0.05),
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
        let initialMap = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
        this.setState({
            initialMap,
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
        // })
    }

    render(){
        if(this.state.initialMap){
            let current_latitude = this.state.initialMap.coords.latitude;
            let current_longitude = this.state.initialMap.coords.longitude;
            return(
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <MapView
                            style={styles.mapStyle}
                            provider="google"
                            initialRegion={{
                                latitude: current_latitude,
                                longitude: current_longitude,
                                latitudeDelta: 0.00423,
                                longitudeDelta: 0.00423,
                            }}
                            onPress={this._handleLocationUpdate}
                            onRegionChangeComplete={this._handleMapRegionChange}
                            followsUserLocation={true}
                            showsUserLocation={true}
                            region={this.state.mapRegion}>
                            <Marker
                                coordinate={this.state.location.coords}
                                draggable
                                onDragEnd={this._handleLocationUpdate}/>
                        </MapView>
                        <View style={styles.overContainer}>
                            <TouchableOpacity
                                style={styles.buttonStyle}>
                                <Text>Start Tracking</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={styles.sideContainer}>
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
        } else {
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
})
