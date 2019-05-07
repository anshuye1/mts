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
    TouchableOpacity,
    ScrollView,
    FlatList,
    ActivityIndicator, Dimensions,
} from 'react-native';
import {Header,SearchBar,Button,Image,Text} from 'react-native-elements';
import common_css from '../css/common_css';
import Icon from "react-native-vector-icons/Ionicons";
import Ajax from "../common/Ajax";
import ToastShow from "../common/Toast";
import Loading from "../common/Loading";
import ListFoot from "../common/ListFoot";
import {GetToken} from "../common/common";

export default class Community extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            ready:true,
            showFoot:0,//显示第八加载
            formData:{//存储请求条件
                token:'',//登录token
                order:0,
                page:1,//第一页
                limit:10,//每页10条
                keywords:''
            },
            data:[],
            total_num:10
        };
    }
    componentDidMount(){
        this.getToken();
    }
    //得到token
    getToken (){
        console.warn(1111);
        GetToken().then((value) => {
            this.setState({
                formData:{
                    ...this.state.formData,
                    token:value
                }
            },()=>{
                console.warn(1111);
                this.fetchData();
            })
        }).catch(err=>{
            console.warn(err);
        })
    }
    //更新搜索
    updateSearch = search => {
        this.setState({
            formData:{
                ...this.state.formData,
                keywords:search
            }
        });
    };
    //搜索
    searchSub(val){
        this.setState({
            formData:{
                ...this.state.formData,
                keywords:val
            }
        },()=>{
            this.initFun();
        });
    };
    //初始化参数
    initFun(){
        this.setState({//初始化参数
            formData:{
                ...this.state.formData,
                page:1,
            },
            ready:false,
            showFoot:0,
        },()=>{
            this.fetchData();
        })
    };
    //切换人气
    tabFun(type){
        this.setState({//初始化参数
            formData:{
                ...this.state.formData,
                order:type
            },
        },()=>{
            this.initFun();
        })
    };
    //请求数据
    fetchData = () => {
        const {formData} = this.state;
        Ajax.post('/social-post-list',formData)
            .then((response) => {
                if(response.code===0){
                   this.setState({
                       data:response.data.list,
                       total_num:response.data.total_num
                   });
                   if(response.data.total_num>=this.state.page*this.state.limit){
                       this.setState({
                           showFoot:1
                       })
                   }
                }else{
                    if(response.msg){
                        ToastShow.toastShort(response.msg+'31231');
                    }else{
                        ToastShow.toastShort('服务器响应超时');
                    }
                }
                this.setState({ ready: true, refreshing: false });
            }).catch((error) => {
            this.setState({
                ready: true,
                refreshing: false
            });
            console.log(error);
        });
    };
    //下拉刷新
    _onRefresh(){
        this.setState({//初始化参数
            refreshing: true,
        },()=>{
            this.initFun();
        })
    }
    //下拉加载
    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot*1 !== 0 ){
            return ;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        let total = Math.ceil(this.state.total_num/this.state.formData.limit);
        if(this.state.formData.page>=total){
            return ;
        }
        this.state.formData.page++;
        //底部显示正在加载更多数据
        this.setState({showFoot:2});
        //获取数据，在componentDidMount()已经请求过数据了
        if (this.state.formData.page>1)
        {
            this.fetchData();//只调用ajax
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        const { formData:{keywords,order},ready,data,refreshing,showFoot } = this.state;
        let users =
            [
                {
                name: 'brynn',
                    display_url: 'http://newmjx.cn-sh2.ufileos.com/f69b20fd94b49c44f56b9242e349f770.JPG?iopcmd=thumbnail&type=5&height=850&width=0&scale=1'
            },

                {
                    name: 'brynn',
                    display_url: 'http://newmjx.cn-sh2.ufileos.com/b43354110e0ac44d38629ac30eb2c0ba.JPG?iopcmd=thumbnail&type=5&height=850&width=0&scale=1'
                },
                {
                    name: 'brynn',
                    display_url: 'http://newmjx.cn-sh2.ufileos.com/2620d5ffb2a3e8e9b4696814e9dc76a5.png?iopcmd=thumbnail&type=5&height=850&width=0&scale=1'
                },
                {
                    name: 'brynn',
                    display_url: 'http://newmjx.cn-sh2.ufileos.com/33c016f16fd283a9623370dd42a47a74.jpg?iopcmd=thumbnail&type=5&height=850&width=0&scale=1'
                }
            ];
        users = users.concat(users);

        return (
            <View style={common_css.container}>
                <Header
                    containerStyle={{
                        backgroundColor:'#fff',
                        borderBottomWidth:0
                    }}
                    leftComponent={
                        <SearchBar
                            placeholder="输入宝贝关键词/商家名称"
                            onChangeText={this.updateSearch}
                            searchIcon={
                                <Icon
                                    name="ios-search"
                                    size={20}
                                    onPress={
                                        (val)=>{
                                            console.warn(val,12334)
                                        }
                                    }
                                />
                            }
                            onFocus={()=>navigate('Search',{searchSub:this.searchSub.bind(this)})}
                            readonly
                            border={false}
                            value={keywords}
                            round={true}
                            lightTheme={true}
                            containerStyle={{
                                width:300,
                                backgroundColor:'#fff',
                                borderTopWidth:0,
                                borderBottomWidth:0,
                            }}
                            inputContainerStyle={{
                                height:31,
                                backgroundColor:'#F4F4F4'
                            }}
                            inputStyle={{
                                fontSize:14,
                            }}
                        />
                    }
                    rightComponent={
                        <Icon name="ios-menu" size={30}/>
                    }
                />

                <View style={styles.btnWrap}>
                    <Button
                        title="全部"
                        type="clear"
                        buttonStyle={styles.btn}
                        titleStyle={[styles.btnText,order===0?styles.btnText1:{}]}
                        onPress={()=>{this.tabFun(0)}}
                    />
                    <Button
                        title="人气"
                        type="clear"
                        buttonStyle={styles.btn}
                        titleStyle={[styles.btnText,order===1?styles.btnText1:{}]}
                        onPress={()=>{this.tabFun(1)}}
                    />
                    <Button
                        title="优质"
                        type="clear"
                        buttonStyle={styles.btn}
                        titleStyle={[styles.btnText,order===2?styles.btnText1:{}]}
                        onPress={()=>{this.tabFun(2)}}
                    />
                    <Button
                        title="推荐"
                        type="clear"
                        buttonStyle={styles.btn}
                        titleStyle={[styles.btnText,order===3?styles.btnText1:{}]}
                        onPress={()=>{this.tabFun(3)}}
                    />
                </View>

                {ready ?
                    <FlatList
                        data={users}
                        refreshing={refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        keyExtractor={(item,index)=>index.toString()}
                        onEndReachedThreshold={1}
                        numColumns ={2}
                        style={styles.listWrap}
                        onEndReached={this._onEndReached.bind(this)}
                        ListFooterComponent={()=>ListFoot.RenderFooter(showFoot)}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={()=>navigate('Detail')}
                                >
                                    <View style={styles.itemWrap}>
                                        <Image
                                            style={styles.image}
                                            source={{ uri: item.display_url }}
                                            PlaceholderContent={<ActivityIndicator />}
                                        />
                                        <View style={{flexDirection:'row',justifyContent: 'space-between',marginTop: 8}}>
                                            <View style={{flexDirection:'row',justifyContent: 'flex-start'}}>
                                                <Image
                                                    style={{width:20,height:20,borderRadius: 10,marginRight:8}}
                                                    source={{ uri: item.display_url }}
                                                    PlaceholderContent={<ActivityIndicator />}
                                                />
                                                <Text style={{lineHeight:20}}>{item.name}</Text>
                                            </View>
                                            <Text style={{lineHeight:20}}>5.5 <Text style={{color:'#999',fontSize:12}}>W</Text>   </Text>
                                        </View>
                                        <Text style={{color:'#999',fontSize:12,marginTop:6,height:34,lineHeight:15}}>
                                            嘻嘻，最近公司组织健身活动选了好久还是…
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }} />
                    :null
                }

                {ready ?
                    null
                    :
                    <Loading />
                }
            </View>
        );
    }
}
const {width,height} = Dimensions.get('window');
const paddingItem = 15;
const imgWidth = width*0.5 - paddingItem - paddingItem/2;

const styles = StyleSheet.create({
    btnWrap: {
        justifyContent: 'flex-start',
        flexDirection:'row',
        alignItems: 'flex-end',
        flexWrap:'wrap',
        paddingLeft:paddingItem,
        paddingRight:paddingItem,
        marginBottom: paddingItem
    },
    btn:{
        alignItems: 'flex-start',
        marginRight:10,
        paddingRight:5,
        paddingLeft:5,
    },
    btnText:{
        color:'#666',
        fontSize: 16
    },
    btnText1:{
        fontSize:18,
        fontWeight:'bold',
        color:'#212121'
    },
    listWrap:{
        flex:1,
        flexWrap: 'wrap',
        marginLeft:paddingItem
    },
    itemWrap:{
        width:imgWidth,
        flexDirection:'column',
        marginBottom:paddingItem,
        marginRight:paddingItem
    },
    image:{
        width:imgWidth,
        height:205,
        borderRadius:4
    }
});
