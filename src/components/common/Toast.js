import React, {Component} from 'react';
import {
    Platform
} from 'react-native';
import Toast from 'react-native-root-toast';//导入组件

export default class ToastShow extends Component {
    static toastShort = (content) => {
        if (this.toast !== undefined) {
            Toast.hide(this.toast);
        }
        this.toast = Toast.show(content.toString(), {
            duration: Toast.durations.SHORT,
            position: Platform.OS === 'android' ? Toast.positions.CENTER : Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });
    };
    static toastLong = (content) => {
        if (this.toast !== undefined) {
            Toast.hide(this.toast);
        }
        this.toast = Toast.show(content.toString(), {
            duration: Toast.durations.LONG,
            position: Platform.OS === 'android' ? Toast.positions.CENTER : Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });
    };
}