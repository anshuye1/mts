import React, { Component } from 'react';
import {View,ActivityIndicator,Text,TouchableOpacity,Image,Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
export default class ListFoot extends Component{
    static RenderFooter(foot){
        if (foot === 1) {
            return (
                <View style={{height:60,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:16,marginTop:5,marginBottom:20,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(foot === 2) {
            return (
                <View style={{
                    flexDirection:'row',
                    height:50,
                    justifyContent:'center',
                    alignItems:'center',
                    marginBottom:10,
                }}>
                    <ActivityIndicator />
                    <Text style={{fontSize:16}}>正在加载更多数据...</Text>
                </View>
            );
        } else if(foot === 0){
            return (
                <View>
                    <Text></Text>
                </View>
            );
        }
    }
}