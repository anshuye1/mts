/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ActivityIndicator, Platform, StyleSheet, View,TouchableHighlight} from 'react-native';
import {Image,Text} from "react-native-elements";
import common_css from "../css/common_css";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

export default class Mine extends Component {
    static navigationOptions = {
        header: null
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={()=>navigate('Login')}>
                    <Text>登录</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
