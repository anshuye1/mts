import React, {Component} from 'react';
import {
    View,
    Keyboard,
    TouchableOpacity,
    AsyncStorage,
    ScrollView, ImageBackground
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {Input,Button,Text} from 'react-native-elements';

import {connect} from 'react-redux';
import {doLogin} from '../../store/actions/login';

import Loading from '../common/Loading';
import LoginHea from './LoginHea';
import Ajax from "../common/Ajax";
import login_css from '../css/login_css';
import ToastShow from "../common/Toast";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: 0,
            ready: true,
            pass: true,
            formData: {
                mobile: '',
                password: ''
            }
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        // alert('Keyboard Shown');
    }

    _keyboardDidHide() {
    }

    isPhone(val) {
        let myreg = /^[1][23456789]\d{9}$/;
        if (!myreg.test(val)) {
            return false;
        } else {
            return true;
        }
    }

    loginFun() {
        let mobile = this.state.formData.mobile;
        let password = this.state.formData.password;
        if (!mobile) {
            ToastShow.toastShort('请输入手机号');
            return false;
        }
        if (!this.isPhone(mobile)) {
            ToastShow.toastShort('请输入正确的手机号');
            return false;
        }
        if (!password) {
            ToastShow.toastShort('请输入密码');
            return false;
        }
        if (password.length < 6) {
            ToastShow.toastShort('密码至少为6位');
            return false;
        }
        this.setState({
            ready: false,
        });
        Ajax.post('/login', this.state.formData)
            .then((response) => {
                if (response.code * 1 === 0) {
                    console.log(response.data.token);
                    this.props.navigation.navigate('Mine');
                } else {
                    ToastShow.toastShort(response.msg)
                }
                this.setState({ready: true});
            }).catch((error) => {
            this.setState({ready: true});
            ToastShow.toastShort('系统错误');
            // console.error(error);
        });
    }

    setVal(data) {
        this.setState({
            formData: {
                mobile: data.mobile,
                password: data.password
            }
        });
        if (data.password) {
            if (data.password_confirm) {
                ToastShow.toastShort('修改密码成功')
            } else {
                ToastShow.toastShort('注册成功')
            }
        }
    }


    static navigationOptions = ({navigation}) => ({
        header: null
    });

    render() {
        const {isFocus, ready, pass, formData} = this.state;
        const {goBack, navigate} = this.props.navigation;
        console.log(this.state.formData);
        return (
            <View style={login_css.container} keyboardShouldPersistTaps={'never'}>
                <ScrollView>
                    <LoginHea goBack={goBack} title={{h1:'登录',h2:'还没有账号，立即',a:{text:'注册',href:'Signup'}}} navigate={navigate}/>

                    <View style={login_css.InputWrap}>
                        <Input
                            underlineColorAndroid='transparent'
                            onFocus={() => this.setState({isFocus: 1})}
                            onChangeText={(text) => this.setState({formData: {...formData, mobile: text}})}
                            placeholder='请输入手机号'
                            value={formData.mobile}
                            placeholderTextColor='#ccc'
                            keyboardType="numeric"
                            inputContainerStyle={login_css.loginInput}
                        />

                        <Input
                            underlineColorAndroid='transparent'
                            onFocus={() => this.setState({isFocus: 2})}
                            onChangeText={(text) => this.setState({formData: {...formData, password: text}})}
                            placeholder='请输入密码'
                            value={formData.password}
                            maxLength={16}
                            placeholderTextColor='#ccc'
                            keyboardType="default"
                            secureTextEntry={pass}
                            inputContainerStyle={login_css.loginInput}
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

                        <Button
                            title="登录"
                            onPress={() => {
                                this.loginFun();
                            }}
                            titleStyle={
                                login_css.btnInner
                            }
                            loading={!ready}
                            buttonStyle={
                                login_css.btn
                            }
                        />
                        <View style={login_css.bottom_wrap}>
                            <TouchableOpacity login={this.props.login} onPress={() => navigate('Signup')}>
                                <Text style={login_css.textColor}>立即注册</Text>
                            </TouchableOpacity>

                            <TouchableOpacity login={this.props.login} onPress={() => navigate('Forget')}>
                                <Text style={login_css.textColor}>忘记密码</Text>
                            </TouchableOpacity>
                        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
