import React, { Component } from 'react';
import {
    View,
    ScrollView, ImageBackground, AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import { doLogin } from '../../store/actions/login';

import login_css from '../css/login_css';
import Ajax from "../common/Ajax";
import LoginHea from "./LoginHea";
import ToastShow from '../common/Toast';

import Icon from "react-native-vector-icons/Ionicons";
import {Input,Button} from 'react-native-elements';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            isFocus: 0,
            ready:true,
            formData:{
                mobile:'',
                password:'',
                code:'',
                confirm_password:''
            },
            pass:true,
            pass1:true,
            countdown:60
        };
        this.goLogin = this.goLogin.bind(this);
    }
    //判断手机号
    isPhone (val) {
        let myreg=/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(val)) {
            return false;
        } else {
            return true;
        }
    }
    goLogin(response){
        this.props.login(response.data.token);
        AsyncStorage.setItem('token', response.data.token);
        this.props.navigation.navigate('Mine');
    }
    //注册
    SignupFun(){
        let mobile = this.state.formData.mobile;
        let code = this.state.formData.code;
        let password = this.state.formData.password;
        let confirm_password = this.state.formData.confirm_password;
        if(!mobile){
            ToastShow.toastShort('请输入手机号');
            return false;
        }
        if(!this.isPhone(mobile)){
            ToastShow.toastShort('请输入正确的手机号');
            return false;
        }
        if(!code){
            ToastShow.toastShort('请输入短信验证码');
            return false;
        }
        if(!password){
            ToastShow.toastShort('请输入密码');
            return false;
        }
        if(password.length<6){
            ToastShow.toastShort('密码至少为6位');
            return false;
        }
        if(password!==confirm_password){
            ToastShow.toastShort('两次输入密码不一致');
            return false;
        }
        this.setState({
            ready:false,
        });
        Ajax.post('/register',this.state.formData)
            .then((response)=>{
                console.log(response);
                this.setState({ ready: true });
                if(response.code*1===0){
                    this.goLogin(response)
                }else{
                    ToastShow.toastShort(response.msg)
                }
        }).catch((error) => {
            this.setState({ ready: true });
            // ToastShow.toastShort('系统错误');
            // console.warn(error);
        });
    }
    //时间倒数
    settime(){
        this.t = setInterval(()=>{
            if(this.state.countdown>0){
                this.setState({
                    countdown:this.state.countdown-1
                });
            }else{
                this.setState({
                    countdown:60
                });
                clearInterval(this.t)
            }
        },1000)
    }
    //发送验证码
    sendFun(){
        let mobile = this.state.formData.mobile;
        if(!mobile){
            ToastShow.toastShort('请输入手机号');
            return false;
        }
        if(!this.isPhone(mobile)){
            ToastShow.toastShort('请输入正确的手机号');
            return false;
        }
        this.setState({
            ready:false,
        });
        Ajax.post('/send-sms',{"mobile":mobile,type:1})
        .then((response) => {
            console.log(response);
            if(response.code*1===0){
                ToastShow.toastShort(response.msg)
                this.settime();
            }else{
                this.setState({
                    currentDown:60
                });
                ToastShow.toastShort(response.msg)
            }
            this.setState({
                ready:true,
            });
        }).catch((error) => {
            this.setState({
                currentDown:60,
                ready:true,
            });
            console.warn(error);
            // ToastShow.toastShort('系统错误');
            // console.error(error);
        });
    }
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    componentWillUnmount(){
        if(this.t){
            clearInterval(this.t)
        }
    }

    render(){
        const { isFocus,ready,countdown,pass,pass1 } = this.state;
        const { goBack,navigate } = this.props.navigation;
        return (
            <View style={login_css.container} keyboardShouldPersistTaps={'never'}>
                <ScrollView>
                    <LoginHea goBack={goBack} title={{h1:'注册',h2:'欢迎注册账号'}}/>

                    <View style={login_css.inputWrap}>
                        <Input
                            inputContainerStyle={login_css.loginInput}
                            underlineColorAndroid='transparent'
                            onFocus={()=>this.setState({isFocus: 1})}
                            onChangeText={(text) => this.setState({ text,formData:{...this.state.formData,mobile:text} })}
                            placeholder='请输入手机号'
                            placeholderTextColor='#ccc'
                            keyboardType="numeric"
                        />

                        <Input
                            inputContainerStyle={login_css.loginInput}
                            underlineColorAndroid='transparent'
                            onFocus={()=>this.setState({isFocus: 3})}
                            onChangeText={(text) => this.setState({ text,formData:{...this.state.formData,code:text} })}
                            placeholder='输入验证码'
                            placeholderTextColor='#ccc'
                            rightIcon={
                                <Button
                                    title={countdown<60 ?
                                        `${countdown}s` : '发送验证码'}
                                    buttonStyle={
                                        login_css.smallBtn
                                    }
                                    titleStyle={{
                                        color:'#ff4466',
                                        fontSize:12
                                    }}
                                    onPress={this.sendFun.bind(this)}
                                />
                            }
                        />

                        <Input
                            inputContainerStyle={login_css.loginInput}
                            underlineColorAndroid='transparent'
                            onFocus={()=>this.setState({isFocus: 2})}
                            onChangeText={(text) => this.setState({ text,formData:{...this.state.formData,password:text} })}
                            placeholder='请输入密码'
                            maxLength={16}
                            placeholderTextColor='#ccc'
                            keyboardType="default"
                            secureTextEntry={pass}
                            rightIcon={
                                <Icon
                                    name={pass ? 'ios-eye-off' : 'ios-eye'}
                                    size={30}
                                    color={'#999'}
                                    onPress={() => {
                                        this.setState({pass: !pass})
                                    }}
                                />
                            }
                        />

                        <Input
                            inputContainerStyle={login_css.loginInput}
                            underlineColorAndroid='transparent'
                            onFocus={()=>this.setState({isFocus: 3})}
                            onChangeText={(text) => this.setState({ text,formData:{...this.state.formData,confirm_password:text} })}
                            placeholder='请再次输入密码'
                            maxLength={16}
                            placeholderTextColor='#ccc'
                            keyboardType="default"
                            secureTextEntry={pass1}
                            rightIcon={
                                <Icon
                                    name={pass1 ? 'ios-eye-off' : 'ios-eye'}
                                    size={30}
                                    color={'#999'}
                                    onPress={() => {
                                        this.setState({pass1: !pass1})
                                    }}
                                />
                            }
                        />

                        <Button
                            title="注册"
                            onPress={() => {
                                this.SignupFun();
                            }}
                            titleStyle={
                                login_css.btnInner
                            }
                            loading={!ready}
                            buttonStyle={
                                login_css.btn
                            }
                        />
                    </View>
                </ScrollView>
                <ImageBackground style={login_css.footer} source={require('../img/login1.png')} resizeMode='stretch'/>
            </View>
        )
    }
}



const mapStateToProps = state => ({
    state
})

const mapDispatchToProps = dispatch => ({
    login: (payload) => dispatch(doLogin(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
