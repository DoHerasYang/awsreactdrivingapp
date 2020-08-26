import React from 'react';
import * as Location from 'expo-location';

export async function obtain_Location(){

    let { status } = await Location.getPermissionsAsync();
    if(status!=="granted"){
        console.log("Permission to access location was denied")
    }
    let location =  await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest})
    return location
}

export async function obtain_WeatherJson(){
    // Obtain the location
    let location = obtain_Location();
    let temp_lat = (await location).coords.latitude;
    let temp_lon = (await location).coords.longitude;

    // Obtain the weather API
    let api = 'https://api.openweathermap.org/data/2.5/weather?lat='
        + temp_lat
        + '&lon='
        + temp_lon
        + '&units=metric'
        + '&appid=b1025cc84dbf31dcd3956ee3a86b6c6e';

    let response = await fetch(api);
    return await response.json()
}


export async function obtain_Weather(){
    let result = await obtain_API();
    return result["main"].temp
}