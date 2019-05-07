import {StyleSheet, Dimensions, Platform} from 'react-native';

const {width,height} = Dimensions.get('window');
let color = '#ff4466';
let paddingItem=25;
const isIphoneX = (Platform.OS === 'ios' && (Number(((height/width)+"").substr(0,4)) * 100) === 216);

const login_css = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: isIphoneX?0:-10,
        backgroundColor: '#fff',
        position: 'relative',
    },
    header:{
        width:267,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        height:200,
        marginBottom:25,
        justifyContent:'space-around'
    },
    footer:{
        width:180,
        height:121,
        position: 'absolute',
        right:0,
        bottom:0,
        zIndex:-1
    },
    text_left:{
        textAlign:'left',
    },
    heaBottom:{
        paddingLeft:paddingItem,
    },
    larger:{
        fontSize:28,
        marginBottom:10,
    },
    InputWrap:{
        width:width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingLeft:paddingItem,
        paddingRight:paddingItem,
    },
    loginInput: {
        borderColor:'#E9E9E9',
        marginBottom:30
    },
    smallBtn:{
        borderRadius:20,
        backgroundColor:'#fff',
        borderColor: color,
        borderWidth:1
    },
    middleBottom: {
        marginTop:10,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    textColor:{
        color:'#9B9B9B'
    },
    bottom_wrap:{
        width:width-paddingItem*2,
        marginTop:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnInner:{
        color:'#fff',
        fontSize:18,
        textAlign:'center'
    },
    btn:{
        width:width-paddingItem*2,
        borderRadius:20,
        height:40,
        backgroundColor:color,
        marginTop:20,
    },
    iconWrap:{
        width:width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 10
    },
    inputWrap:{
        width:width,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop:20
    },
    inputWrapTop:{
        paddingTop:20
    },
    timeBtn:{
        backgroundColor:color,
        color:'#fff',
        lineHeight:45,
        height:45,
        width:140,
        textAlign:'center',
        borderRadius:8,
        fontSize:16,
    },
    timeBtn1:{
        backgroundColor:color,
        color:'#fff',
        lineHeight:45,
        height:45,
        width:140,
        textAlign:'center',
        borderRadius:8,
        fontSize:16,
        opacity:0.6
    },
    hea:{
        width:width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        backgroundColor:color,
        marginBottom:40,
        height:50,
        alignItems:'center'
    },
    backImg:{
        width:22,
        height:22,
        marginTop:15
    },
    eyeImgWrap:{
        position: 'absolute',
        right: 10,
        top: 10
    },
    loginLogo:{
        width: 100,
        height: 67,
        marginTop: 115
    }
});

export default login_css;
