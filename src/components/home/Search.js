/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {Header,SearchBar,Text,Button} from 'react-native-elements';
import common_css from '../css/common_css';
import Icon from "react-native-vector-icons/Ionicons";

export default class search extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }
    updateSearch = search => {
        this.setState({ search });
    };
    //搜索提交
    searchSubmit(){
        const { navigate,state:{params:{searchSub}} } = this.props.navigation;
        searchSub(this.search);
        navigate('Home');
    };
    render() {
        const { goBack} = this.props.navigation;
        const { search } = this.state;

        return (
            <View style={common_css.container}>
                <Header
                    containerStyle={{
                        backgroundColor:'#fff'
                    }}
                    leftComponent={
                        <Icon name="ios-arrow-round-back" onPress={()=>{goBack()}} size={30}/>
                    }
                    centerComponent={
                        <SearchBar
                            placeholder="输入宝贝关键词/商家名称"
                            onChangeText={this.updateSearch}
                            searchIcon={
                                <Icon
                                    name="ios-search"
                                    size={20}
                                    onPress={
                                        ()=>this.searchSubmit()
                                    }
                                />
                            }
                            border={false}
                            value={search}
                            round={true}
                            lightTheme={true}
                            containerStyle={{
                                width:290,
                                backgroundColor:'#fff',
                                borderTopWidth:0,
                                borderBottomWidth:0,
                                marginBottom:10
                            }}
                            inputContainerStyle={{
                                height:31,
                                marginTop:10,
                                backgroundColor:'#F4F4F4'
                            }}
                            inputStyle={{
                                fontSize:14,
                            }}
                        />
                    }
                    rightComponent={
                        <Text style={{color:'#999'}} onPress={()=>{this.searchSubmit()}}>搜索</Text>
                    }
                />

                <Text style={{fontSize:14,margin:15}}>最近搜索</Text>

                <View style={styles.btnWrap}>
                    <Button
                        title="11211"
                        buttonStyle={styles.btn}
                        titleStyle={styles.btnText}
                        onPress={()=>{
                            this.searchSubmit();
                        }}
                    />
                    <Button title="112211" buttonStyle={styles.btn} titleStyle={styles.btnText}/>
                    <Button title="11211" buttonStyle={styles.btn} titleStyle={styles.btnText}/>
                    <Button title="11121" buttonStyle={styles.btn} titleStyle={styles.btnText}/>
                    <Button title="11121" buttonStyle={styles.btn} titleStyle={styles.btnText}/>
                    <Button title="11121" buttonStyle={styles.btn} titleStyle={styles.btnText}/>
                    <Button title="11121" buttonStyle={styles.btn} titleStyle={styles.btnText}/>
                    <Button title="11121" buttonStyle={styles.btn} titleStyle={styles.btnText}/>
                </View>

                <Text style={{fontSize:14,margin:15}}>搜索发现</Text>
                <View style={styles.btnWrap}>
                    <Button
                        title="11211"
                        buttonStyle={styles.btn}
                        titleStyle={styles.btnText}
                        onPress={()=>{
                            this.setState({
                                search:'11211'
                            },()=>{
                                this.searchSubmit();
                            })
                        }}
                    />
                    <Button title="112211" buttonStyle={styles.btn} titleStyle={styles.btnText}/>
                    <Button title="11211" buttonStyle={styles.btn} titleStyle={styles.btnText}/>
                    <Button title="11121" buttonStyle={styles.btn} titleStyle={styles.btnText}/>
                    <Button title="11121" buttonStyle={styles.btn} titleStyle={styles.btnText}/>
                    <Button title="11121" buttonStyle={styles.btn} titleStyle={styles.btnText}/>
                    <Button title="11121" buttonStyle={styles.btn} titleStyle={styles.btnText}/>
                    <Button title="11121" buttonStyle={styles.btn} titleStyle={styles.btnText}/>
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    btnWrap: {
        justifyContent: 'flex-start',
        flexDirection:'row',
        alignItems: 'flex-start',
        flexWrap:'wrap'
    },
    btn:{
        alignItems: 'flex-start',
        borderRadius:15,
        margin:10,
        paddingRight:15,
        paddingLeft:15,
        backgroundColor:'#F8F8F8'
    },
    btnText:{
        color:'#666',
        fontSize: 13
    }
});
