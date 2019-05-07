/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ActivityIndicator, Platform, StyleSheet, View} from 'react-native';
import {Header, Image, SearchBar, Text} from "react-native-elements";
import Ajax from "../common/Ajax";
import ToastShow from "../common/Toast";
import Icon from "react-native-vector-icons/Ionicons";
import common_css from "../css/common_css";


export default class Mine extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            ready:true,
            search:''
        };
    }
    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        let data1 = {
            "id": 1,
            "order_id": 1,
            "model_id": 326,
            "url": "https://item.taobao.com/item.htm?id=588860489784&ali_refid=a3_430406_1007:1103163016:N:aIk9%2FMgNhg%2F2EhxRWkKceLCjm1NXt7SNhBe%2Fvl%2ByCnE%3D:edc5345e6fd70ff35c4ccd0178238065&ali_trackid=1_edc5345e6fd70ff35c4ccd0178238065&spm=a21bo.2017.201874-sales.36",
            "nickname": "小妖精",
            "display_url": "http://newmjx.cn-sh2.ufileos.com/f69b20fd94b49c44f56b9242e349f770.JPG?iopcmd=thumbnail&type=5&height=850&width=0&scale=1",
            "goods_url": "https://img.alicdn.com/imgextra/i3/595412874/O1CN01lYaScH1X6Knf0UucI_!!595412874.jpg_50x50.jpg",
            "goods_name": "夏2019新款女闺蜜装很仙的裙子 法式娃娃领夏季雪纺连衣裙女春秋\r\n夏2019新款女闺蜜装很仙的裙子 法式娃娃领夏季雪纺连衣裙女春秋\r\n",
            "goods_category": "女装",
            "comments": "料子很好",
            "pv": null,
            "is_deleted": 0,
            "created_time": "1554962216",
            "updated_time": "1554962216",
            "comments_list": [
                {
                    "nickname": "乱世狂刀",
                    "display_url": "http://pic1.win4000.com/pic/6/93/33b79614f1.jpg",
                    "comments": "小姐姐拍的真漂亮"
                }
            ],
            "comments_num": 1,
            "pic_url": [
                "https://t1.hddhhn.com/uploads/tu/201904/228/1.jpg",
                "https://t1.hddhhn.com/uploads/tu/201904/230/1.jpg"
            ],
            "video_url": [
                "https://obs-6bbd.obs.cn-east-2.myhuaweicloud.com/1.mp4"
            ]
        };
        this.setState({
            data:data1,
        });

        this.setState({ready:false});
        // const {state:{params:{post_id,model_id}}} = this.props.navigation;
        let post_id=1,model_id=126;
        Ajax.post('/post-detail',{post_id:post_id,model_id:model_id})
            .then((response) => {
                console.log(response);
                if(response.code===0){
                    this.setState({
                        data:response.data,
                    });
                }else{
                    if(response.msg){
                        ToastShow.toastShort(response.msg+'31231');
                    }else{
                        ToastShow.toastShort('服务器响应超时');
                    }
                }
                this.setState({ ready: false });
            }).catch((error) => {
            this.setState({
                ready: false
            });
            console.log(error);
        });
    }

    updateSearch = search => {
        this.setState({ search });
    };
    render() {
        const {data:{display_url},search} = this.state;
        const {goBack} = this.props.navigation;

        return (
            <View style={common_css.container}>
                <Image
                    style={common_css.imgCover}
                    source={{ uri: display_url }}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <View style={{flex:1,flexDirection:'column',justifyContent:'space-between'}}>
                    <Header
                        containerStyle={{
                            backgroundColor:'transparent',
                            borderBottomWidth:0
                        }}
                        leftComponent={<Icon name="ios-arrow-round-back" size={40} color={'#fff'} onPress={()=>goBack()} style={{marginLeft:10}}/>}
                    />
                    <View style={common_css.detailBottom}>
                        <View style={common_css.rowBet}>
                            <View style={common_css.rowStart}>
                                <Image
                                    style={{width:30,height:30,borderRadius: 15,marginRight:8}}
                                    source={{ uri: display_url }}
                                    PlaceholderContent={<ActivityIndicator />}
                                />
                                <Text style={{lineHeight:30,fontSize:21}}>2121211</Text>
                            </View>
                            <Icon name='ios-eye' size={30}> </Icon>
                        </View>

                        <View style={[common_css.rowBet,{borderBottomWidth:1,borderBottomColor:'#eee',paddingTop:15,paddingBottom:15,marginBottom:15}]}>
                            <View style={common_css.rowStart}>
                                <Text style={{color:'#999',marginRight:10}}><Icon name="ios-eye"/>439</Text>
                                <Text style={{color:'#999',marginRight:10}}><Icon name="ios-eye"/>439</Text>
                                <Text style={{color:'#999',marginRight:10}}><Icon name="ios-eye"/>439</Text>
                            </View>
                            <Text style={{color:'#999',marginBottom:15}}>
                                2019-03-12 16:24:5
                            </Text>
                        </View>

                        <Text style={{lineHeight:20,color:'#999'}}>
                            必须说和美甲比还是有bug的，因为贴纸一样大小必然会有的地方大一些有的地方小一些，建议处女座就不要入了，乖乖做美甲好了...像我无所谓哈哈哈，大的地方我就用指甲刀剪一圈就贴合住了，最后用一瓶美甲神器，本来是帮助指甲油速干，使用后就不那么容易掉色，这次指甲贴也心理安慰得涂了一遍，也许可以更贴合呢。
                        </Text>

                        <View style={[common_css.rowBet,{height:40,marginBottom:30,marginTop:15,alignItems:'center'}]}>
                            <SearchBar
                                placeholder="输入宝贝关键词/商家名称"
                                onChangeText={this.updateSearch}
                                searchIcon={
                                    <Icon
                                        name="ios-edit"
                                        size={20}
                                    />
                                }
                                border={false}
                                value={search}
                                round={true}
                                lightTheme={true}
                                containerStyle={{
                                    width:280,
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
                            <Icon name="ios-eye" size={30}> </Icon>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    image:{
        flex:1
    }
});
