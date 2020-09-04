import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Platform,
    TouchableOpacity,
    Image,
    Dimensions,
    ActivityIndicator,
} from 'react-native';

import {
    Container,
    Item,
    Input
} from 'native-base';

// Import the icons
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const tips = [
    ["You have used your phone when driving",0],
    ["You were driving fast near a school",0],
    ["Great, You have improved acceleration and braking",2],
]


// The Class to provide the tips for user
// Obtain from the remote server

function column_iconItem(sid){
    let icon_stack = [];
    let icon_label = tips[sid][1];

    if (icon_label === 1){
        icon_stack.push(<FontAwesome5 key={sid} name="smile" style={{marginRight:3}} size={32} color="black" />);
    }else if(icon_label===2){
        icon_stack.push(<FontAwesome5 key={sid} name="smile-beam" style={{marginRight:3}} size={32} color="black" />);
    }else{
        icon_stack.push(<Entypo key={sid} name="emoji-sad" style={{marginRight:3}} size={32} color="black" />);
    }
    return icon_stack
}

function column_TextItem(sid) {
    return(
        <Text key={sid} style={styles.text_Style}>{tips[sid][0]}</Text>
    )
}

export function obtain_tips(){
    return(
        <View style={styles.container}>
            <Container style={styles.container}>
                <Item style={styles.item_Style} underline={false}>
                    {column_iconItem(0)}
                    {column_TextItem(0)}
                </Item>
                <Item style={styles.item_BelowStyle} underline={false}>
                    {column_iconItem(1)}
                    {column_TextItem(1)}
                </Item>
                <Item style={styles.item_BelowStyle} underline={false} last>
                    {column_iconItem(2)}
                    {column_TextItem(2)}
                </Item>
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column',
        left: Dimensions.get('window').width*0.05*0.15,
        backgroundColor: 'transparent',
    },
    item_Style:{
        // backgroundColor: "#ffe5e5",
        alignItems: 'center',
        borderColor: 'transparent',
        height: Dimensions.get('window').height*0.3*0.333,
    },
    item_BelowStyle:{
        alignItems: 'center',
        borderColor: 'transparent',
        height: Dimensions.get('window').height*0.3*0.333,
    },
    text_Style:{
        fontSize: 13.5,
        fontWeight: "500",
    },
    text_warnStyle:{
        fontSize: 13.5,
        color: "red",
        fontWeight: "600",
    }
})