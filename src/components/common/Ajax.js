// const urlStartDefault = 'http://app.jdmohe.com';//正式
const urlStartDefault = 'http://122.112.254.222/api';//测试
import {SaveToken} from "./common";

export default class Ajax{
    static get = (url,data) => {
        return new Promise((resolve,reject)=>{
            fetch(urlStartDefault+url,{
                method:'GET',
                headers:{
                    'Accept': 'application/json',//告诉服务器，我们能接受json格式的返回类型，
                    'Content-Type': 'application/json',//告诉服务器，我们提交的数据类型
                },
                body: JSON.stringify(data),//(把你想提交得数据序列化为json字符串类型，然后提交)body中的数据就是我们需要向服务器提交的数据,比如用户名,密码等
            }).then((resones)=>{
                return resones.json();
            }).then((result)=>{
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
        });
    };


    static post = (url,data) => {
        console.warn(urlStartDefault+url,data,1010);
        return new Promise((resolve,reject)=>{
            fetch(urlStartDefault+url,{
                method:'POST',
                headers:{
                    'Accept': 'application/json',//告诉服务器，我们能接受json格式的返回类型，
                    'Content-Type': 'application/json',//告诉服务器，我们提交的数据类型
                },
                body: JSON.stringify(data),//(把你想提交得数据序列化为json字符串类型，然后提交)body中的数据就是我们需要向服务器提交的数据,比如用户名,密码等
            }).then((resones)=>{
                return resones.json();
            }).then((result)=>{
                if(result.data&&result.data.token){
                    SaveToken(result.data.token)
                }
                if(result.result == 404){
                    if(result.msg){
                        reject(result.msg);
                    }else{
                        reject('系统繁忙');
                    }
                }
                console.warn(result,1111);
                resolve(result)
            }).catch((err)=>{
                console.warn(err,9090);
                reject(err)
            })
        });
    }
}
