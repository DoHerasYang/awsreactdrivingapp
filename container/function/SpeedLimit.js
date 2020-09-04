// The JavaScript Class to obtain the Speed limit for different street
// The Current API Provider is OpenStreet

export async function API_Obtain(lat,lon) {
    let API = "https://nominatim.openstreetmap.org/reverse?format=json&lat="+lat.toString()+"&lon="+lon.toString();
    let response = await fetch(API);
    return await response.json()
}

export async function Speed_Obtain(osm_id) {
    let API = "http://overpass-api.de/api/interpreter?data=[out:json];way"+ "(" + osm_id + ");out;";
    let response =  await fetch(API);
    return await response.json()
}

export async function SpeedLimit_Obtain (lat,lon) {
    // Obtain the response from the previous function
    let responseJson = await API_Obtain(lat,lon);
    let osm_id = responseJson["osm_id"];
    // Check if the OSM_ID is null or other things
    if(osm_id !== null){
        let speedResponse = await Speed_Obtain(osm_id);
        if(speedResponse.elements[0].tags.hasOwnProperty('maxspeed')){
            return speedResponse["elements"][0]["tags"]["maxspeed"];
        }else{
            return Number(-1);
        }
    }else{
        console.log("Error, Unexpected arguments in Obtaining the speed")
        return Number(-1);
    }
}
