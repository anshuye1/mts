import React, {Component} from 'react';
import {
    View, ImageBackground
} from 'react-native';

import {Header,Text} from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
import login_css from "../css/login_css";

export default class LoginHea extends Component {
    constructor(){
        super();
    }
    render () {
        const {goBack} = this.props;
        return (
            <ImageBackground style={login_css.header} source={require('../img/login.png')} resizeMode='stretch'>
                <Header
                    leftComponent={<Icon name="ios-arrow-round-back" size={30} color={'#333'} onPress={()=>goBack()} style={{marginLeft:10}}/>}
                    centerComponent={{ text: '', style: { color: '#fff' } }}
                    containerStyle={{
                        backgroundColor: 'rgba(0,0,0,0)',
                        justifyContent: 'space-around',
                        borderWidth:0,
                        borderBottomWidth:0,
                    }}
                />
                <View style={login_css.heaBottom}>
                    <Text style={login_css.larger}>{this.props.title.h1}</Text>
                    <View style={{flexDirection: 'row'}} >
                        <Text style={{color:'#999'}}>{this.props.title.h2}</Text>
                        {
                            this.props.title.a ?
                                <Text
                                    style={{color:'#ff4466'}}
                                    onPress={()=>{
                                        let href = this.props.title.a.href;
                                        this.props.navigate(href)
                                    }}
                                    >{this.props.title.a.text}</Text>
                                :null
                        }
                    </View>
                </View>
            </ImageBackground>
        )
    }
}
