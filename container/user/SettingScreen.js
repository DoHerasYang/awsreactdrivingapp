import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Switch,
    Button,
} from 'react-native';
import {
    Container,
    Item,
    Input} from 'native-base';
import { RadioButton } from 'react-native-paper';


export default class HomeScreen extends React.Component {

    state = {
        userId: '',
        notification_value: false,
        weather_value: false,
        traffic_value: false,
        report_value: "daily",
        textual_value: false,
        graphical_value: false,
    }

    toggleSwitch = (tag,value) => {
        this.setState({[tag]: value})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.interfaceStyle}>
                    <Text style={styles.textLogo}>Preference</Text>
                    <View style={styles.columnStyle}>
                        <Text style={styles.textStyle}>Notification</Text>
                        <Switch
                            style={styles.switchStyle}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={"#f4f3f4"}
                            onValueChange={(value) => this.toggleSwitch("notification_value",value)}
                            ios_backgroundColor="#3e3e3e"
                            value={this.state.notification_value}/>
                    </View>
                    <View style={styles.columnStyle}>
                        <Text style={styles.textStyle}>Weather Alert</Text>
                        <Switch
                            style={styles.switchStyle}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={"#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => this.toggleSwitch("weather_value",value)}
                            value={this.state.weather_value}/>
                    </View>
                    <View style={styles.columnStyle}>
                        <Text style={styles.textStyle}>Traffic Alert</Text>
                        <Switch
                            style={styles.switchStyle}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={"#f4f3f4"}
                            onValueChange={(value) => this.toggleSwitch("traffic_value",value)}
                            value={this.state.traffic_value}
                            ios_backgroundColor="#3e3e3e"/>
                    </View>
                    <View style={styles.columnStyle}>
                        <Text style={styles.textSecondLogo}>Report Preference</Text>
                    </View>
                    <View style={styles.columnStyle}>
                        <Text style={styles.radioTextStyle}>Daily</Text>
                        <View style={styles.borderStyle}>
                            <RadioButton
                                value="weekly"
                                status={this.state.report_value==='weekly'? 'checked':"unchecked"}
                                OnPress={(value)=>this.toggleSwitch("report_value",value)}
                                color='#ff1a75'/>
                        </View>
                        {/*<RadioButton.Group*/}
                        {/*    onValueChange={(value)=>this.toggleSwitch("report_value",value)}*/}
                        {/*    value={this.state.report_value}*/}
                        {/*    color='#ff1a75'*/}
                        {/*    style={styles.radioStyle}>*/}
                        {/*    <RadioButton.Item label="Daily" value="daily" status={this.state.report_value==='daily'? 'checked':"unchecked"} />*/}
                        {/*    <RadioButton.Item label="Weekly" value="weekly" status={this.state.report_value==='daily'? 'checked':"unchecked"}/>*/}
                        {/*</RadioButton.Group>*/}
                        <Text style={styles.radioTextStyle}>Weekly</Text>
                        <View style={styles.borderStyle}>
                            <RadioButton
                                value="daily"
                                status={this.state.report_value==='daily'? 'checked':"unchecked"}
                                OnPress={(value)=>this.toggleSwitch("report_value",value)}
                                color='#ff1a75'/>
                        </View>
                    </View>
                    <View style={styles.columnStyle}>
                        <View style={styles.borderStyle}>
                            <RadioButton
                                value="daily"
                                status={this.state.report_value==='daily'? 'checked':"unchecked"}
                                OnPress={(value)=>this.toggleSwitch("report_value",value)}
                                color='#ff1a75'/>
                        </View>
                        <Text style={styles.radioTextStyle}>Textual Feedback Reports</Text>
                    </View>
                    <View style={styles.columnStyle}>
                        <Switch
                            style={styles.switchStyle}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={"#f4f3f4"}
                            onValueChange={(value) => this.toggleSwitch("traffic_value",value)}
                            value={this.state.traffic_value}
                            ios_backgroundColor="#3e3e3e"/>
                        <Text style={styles.radioTextStyle}>Textual Feedback Reports</Text>
                    </View>
                    <View style={styles.columnStyle}>
                        <Switch
                            style={styles.switchStyle}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={"#f4f3f4"}
                            onValueChange={(value) => this.toggleSwitch("traffic_value",value)}
                            value={this.state.traffic_value}
                            ios_backgroundColor="#3e3e3e"/>
                        <Text style={styles.radioTextStyle}>Graphical Feedback Reports</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLogo:{
        fontWeight: 'bold',
        fontSize: 30,
        padding: 6,
        color: '#000000',
        marginBottom: 40,
        textAlign: 'center',
    },
    textSecondLogo:{
        marginTop: 10,
        fontWeight: '500',
        color: '#000000',
        textAlign: 'center',
        fontSize: 19,
    },
    interfaceStyle:{
        width: '80%',
        alignItems: 'center',
    },
    columnStyle:{
        flexDirection: 'row',
        height: 38,
        marginBottom: 10,
        backgroundColor: '#ffe5b3',
    },
    textStyle: {
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 5,
        color: '#000000',
        width: 180,
    },
    switchStyle:{
        alignItems: 'center',
        marginLeft: 100,
    },
    radioTextStyle:{
        padding: 10,
    },
    borderStyle:{
        width: 35,
        height: 35,
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth: 0.3,
        borderRadius: 35,
    },
})