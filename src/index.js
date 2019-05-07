/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';


import { createStackNavigator, createBottomTabNavigator,createAppContainer } from 'react-navigation';
import {
    Easing,
    Animated,
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import Community from './components/home/Home';
import Search from './components/home/Search';
import Detail from './components/home/Detail';
import Chat from './components/chat/Chat';
import Mine from './components/mine/Mine';
import Task from './components/task/Task';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import Forget from './components/login/Forget';

const BottomTab = createBottomTabNavigator({
    Community: {
        screen: Community,
        navigationOptions: {
            tabBarLabel: '社区',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-aperture" size={25} color={tintColor} />
            ),
        },
    },
    Task: {
        screen: Task,
        navigationOptions: {
            tabBarLabel: '消息',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-videocam" size={25} color={tintColor} />
            ),
        },
    },
    Chat: {
        screen: Chat,
        navigationOptions: {
            tabBarLabel: '消息',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-chatbubbles" size={25} color={tintColor} />
            ),
        },
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-person" size={25} color={tintColor} />
            ),
        },
    }
}, {
    tabBarOptions: {
        activeTintColor: '#ff4466',
        inactiveTintColor: '#B4C3CC',
        labelStyle: {
            fontSize: 12,
            marginBottom: 5,
        },
        style: {
            borderTopWidth: 1,
            borderTopColor: '#c3c3c3',
            height: 50,
            backgroundColor: '#fff'
        },
    }

});

const App = createStackNavigator({
    Home: {
        screen: BottomTab,
        navigationOptions: {
            header: null
        }
    },
    Search,
    Login,
    Task,
    Signup,
    Forget,
    Detail,
}, {
    headerMode: 'screen',
    // headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
        gesturesEnabled: false,
    },
    transitionConfig: () => ({
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            const width = layout.initWidth;
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [width, 0, 0],
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });

            return { opacity, transform: [{ translateX }] };
        },
    }),
});
const MyApp = createAppContainer(App);
export default MyApp
