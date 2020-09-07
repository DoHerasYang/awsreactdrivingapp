import React from 'react'
import {
    Image,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
    Alert,
    Dimensions,
} from 'react-native';

const {width,height} = Dimensions.get('window');

export default class ReportScreen extends React.Component{


    _navigation = () =>{
        this.props.navigation.navigate('UserTabs');
    }

    render() {
        return(
            <View style={styles.container}>
                <Image
                    style={styles.topImage_Style}
                    source={require("../../assets/report_back1.jpg")}/>
                <View style={styles.background}>
                    <Text style={styles.text_header1Style}>Last Driving Report</Text>
                    <Text style={styles.text_header2Style}>General:</Text>
                    <Text style={styles.text_content1Style}>You drove 10.363 kilometres in 23 minutes 14 seconds during the last trip.</Text>
                    <Text style={styles.text_header2Style}>Performance:</Text>
                    <Text style={styles.text_content1Style}>Your overall performance was good, 4 (out of 5).</Text>
                    <Text style={styles.text_content1Style}>You made some improvement in braking. Well Done</Text>
                    <Text style={styles.text_content1Style}>You have made progress in distraction, from 63 to 80. </Text>
                    <Text style={styles.text_header2Style}>Tips:</Text>
                    <Text style={styles.text_content1Style}>However, You still have a lot of work to do.</Text>
                </View>
                <TouchableOpacity
                    onPress={this._navigation}
                    style={styles.button_Style}>
                    <Text>I UnderStand</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    background:{
        width: width,
        borderWidth: 0.4,
        top: height*0.02,
        justifyContent: 'center',
        alignContent: "center",
        backgroundColor: "#ffffe5",
    },
    topImage_Style:{
        width: width,
        height: height*0.23,
        resizeMode: 'stretch',
    },
    text_header1Style:{
        fontSize: 25,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: "600",
        marginBottom: 13,
    },
    text_header2Style:{
        fontSize: 20,
        left: 3,
        fontWeight: "400",
        marginBottom: 10,
    },
    text_content1Style:{
        fontSize: 14,
        left: 3,
        fontWeight: "300",
        marginBottom: 10,
    },
    button_Style:{
        marginTop: 43,
        width: "70%",
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent:"center",
        marginBottom: 20,
        borderWidth: 2,
    },
})
