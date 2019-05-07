import React, { Component } from 'react'
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    AsyncStorage,
    Text,
    TouchableOpacity
} from 'react-native'
import Swiper from 'react-native-swiper';
import ToastShow from "./Toast";

const { width, height } = Dimensions.get('window');//获取手机的宽和高

const styles =StyleSheet.create( {
    wrapper: {

    },
    container: {
        flex: 1,//必写
        backgroundColor:'#fff'
    },
    image: {
        width,//等于width:width
        height,
    }
});

export default class Welcome extends Component {
    constructor(){
        super();
        this.state = {
            ready:false
        }
    }

    openApp(){
        AsyncStorage.getItem('isFirst',(error,result)=>{

            if (result == 'false') {
                console.log('不是第一次打开');
                this.props.navigation.navigate('SkuList');

            } else  {

                console.log('第一次打开');

                this.setState({
                    ready:true
                })

                // 存储
                AsyncStorage.setItem('isFirst','false',(error)=>{
                    if (error) {
                        ToastShow.toastShort(error);
                    }
                });

                this.timer=setTimeout(()=>{
                    this.props.navigation.navigate('SkuList');//7秒后进入底部导航主页
                },7000)
            }
        });
    }

    //加载计时器
    componentDidMount(){
        this.openApp();
    }
    //卸载计时器
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);//同时为真的才执行卸载
    }
    render () {
        const {ready} = this.state;

        return (
            <View style={styles.container}>
                {ready?
                    <Swiper style={styles.wrapper}
                            showsButtons={false}       //为false时不显示控制按钮
                            paginationStyle={{      //小圆点位置
                                bottom: 80
                            }}
                            loop={false}        //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
                            autoplay={true}          //自动轮播
                            autoplayTimeout={2}      //每隔2秒切换
                    >

                        <Image style={styles.image} source={require('../img/ydye1.png')}/>
                        <Image style={styles.image} source={require('../img/ydye2.png')}/>
                        <View style={{flex:1,position:'relative',alignItems:'center'}}>
                            <Image style={styles.image} source={require('../img/ydye3.png')}/>
                            <TouchableOpacity
                                onPress={()=>{this.props.navigation.navigate('SkuList');}}
                                style={{position:'absolute',width:182,height:44,backgroundColor:'#1e88f5',bottom:30,borderRadius:4}}
                            >
                                <Text style={{lineHeight:44,color:'#fff',textAlign:'center',fontSize:16}}>立即体验</Text>
                            </TouchableOpacity>
                        </View>

                    </Swiper>
                    :
                    <TouchableOpacity
                        style={{flex:1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center',backgroundColor: '#1e88f3'}}
                        onPress={()=>{this.props.navigation.navigate('SkuList');}}
                    >
                        <Image source={require('../img/logo11.png')} />
                        <Text style={{fontSize:20,color:'#fff',lineHeight:40,marginTop:10}}>欢迎来到JD魔盒</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}
