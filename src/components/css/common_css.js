import {StyleSheet,Dimensions,Platform} from 'react-native';

const {width,height} = Dimensions.get('window');


//iphoneX 序列机型的屏幕高宽
//XSM SCREEN_HEIGHTL = 896.000000,SCREEN_WIDTHL = 414.000000  2.1642512077
//XS  SCREEN_HEIGHTL = 812.000000,SCREEN_WIDTHL = 375.000000  2.1653333333
//XR  SCREEN_HEIGHTL = 896.000000,SCREEN_WIDTHL = 414.000000  2.1642512077
//X   SCREEN_HEIGHTL = 812.000000,SCREEN_WIDTHL = 375.000000  2.1653333333

//目前iPhone X序列手机的适配算法：高宽比先转换为字符串，截取前三位，转换为number类型 再乘以100
const isIphoneX = (Platform.OS === 'ios' && (Number(((height/width)+"").substr(0,4)) * 100) === 216);

const common_css = StyleSheet.create({
    container:{
        flex:1,
        marginTop: isIphoneX?0:-20,
        backgroundColor:'#fff',
        borderTopColor: '#1e88f5',
        position:'relative'
    },
    container1:{
        flex:1,
        backgroundColor:'#fff',
        borderTopWidth: 0,
        borderTopColor: '#1e88f5',
    },
    iphoneX:{
        borderTopWidth: 0,
        borderTopColor: '#1e88f5',
    },
    header:{
        width:width,
        height:50,
        backgroundColor:'red',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row'
    },
    heaLeft:{
        flex:1,
        alignItems:'flex-start',
    },
    heaLeftImg:{
        width:20,
        height:20,
        marginLeft:10
    },
    heaContent:{
        flex:2,
    },
    headerText:{
        color:'#fff',
        fontSize:18,
        fontWeight:'600',
        textAlign:'center'
    },
    heaRight:{
        flex:1
    },
    inputBox:{
        flexDirection: 'row',
        alignItems:'center',
        width: width*0.9,
        height: 45,
        borderWidth: 1,
        marginBottom:15,
        borderRadius:8,
        fontSize:16,
        paddingLeft:10,
        borderColor:'#DBDBDB'
    },
    msgBottom: {
        flex: 1
    },
    msgBottomItem:{
        height:62,
        width:width,
        borderBottomColor:'#F0F3F5',
        borderBottomWidth:1,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingLeft:15,
    },
    msgIconImg:{
        width:20,
        height:18,
        marginRight:16
    },
    msgItem:{
        fontSize:14,
        color:'#4A4A4A',
    },
    msgHeaImg:{
        width:25,
        height:25,
        marginLeft: 8,
    },
    userWrap:{
        marginBottom:10,
        flexDirection:'row',
        flex:1,
        alignItems:'flex-end',
    },
    userName:{
        fontSize: 18,
        color: '#4a4a4a',
        lineHeight:20
    },
    userCode:{
        fontSize: 14,
        color: '#fff',
        backgroundColor:'#1e88f5',
        textAlign:'center',
        paddingLeft:3,
        paddingRight:3,
        marginLeft:10,
        borderRadius:4,
        height:20
    },
    userRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,
        paddingRight: 10,
        paddingTop:5
    },
    imgCover:{
        width:width,
        height:height*0.6,
        position:'absolute',
        top:0,
        left:0,
        zIndex:0
    },
    detailBottom:{
        backgroundColor:'#fff',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        padding:15
    },
    //公共类
    rowBet:{
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    rowAround:{
        flexDirection:'row',
        justifyContent: 'space-around'
    },
    rowBetWrap:{
        flexDirection:'row',
        justifyContent: 'space-between',
        flexWrap:'wrap'
    },
    rowStart:{
        flexDirection:'row',
        justifyContent: 'flex-start'
    },
});

export default common_css;
