import React, { Component } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

const {width,height} = Dimensions.get('window');

export default class Loading extends  Component{
    render(){
        return (
            <View style={styles.loadingWrap}>
                <ActivityIndicator size="large" style={styles.loading} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingWrap:{
        width:width,
        height:height,
        position:'absolute',
        top:0,
        left:0,
        zIndex:10,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.01)'
    },
    loading:{
    }
});

