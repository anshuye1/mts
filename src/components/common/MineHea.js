import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

import {Header} from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";

export default class MineHea extends Component {
    constructor(){
        super();
    }
    render () {
        const {goBack} = this.props;
        return (
            <Header
                leftComponent={<Icon name="ios-arrow-round-back" size={25} color={'#fff'} onPress={()=>goBack()}/>}
                centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                containerStyle={{
                    backgroundColor: 'red',
                    justifyContent: 'space-around',
                }}
            />
        )
    }
}
