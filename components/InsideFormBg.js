import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import HeaderGradient from './HeaderGradient';
import PoweredByMJ from './PoweredByMJ';
import theme from '../constants/theme';
import NetworkUtils from '../store/hook/NetworkUtills';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionData } from '../constants/common';
import { useFocusEffect } from '@react-navigation/native';

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const InsideFormBg = ({children, headerText='', paddingHorizontal = true, back = false, refreshIcon = false, onRefreshIcon = ()=>{},bellIcon=false,onBellIcon = ()=>{},exit=false,onExit=()=>{}}) => {
  const isConnected = NetworkUtils();
  
  useFocusEffect(
    React.useCallback(() => {
      //console.log('InsideFormBg hit');
      AsyncStorage.getItem(SessionData.AUTH_TOKEN).then(token => {
        //console.log('token sidebar', token);
        if (!token) {
          //navigation.navigate('SignIn');
        }
      });
    }, [])
  );
  return (
    <View style={{marginTop: screenHeight*0.05,height : "100%",position:'relative'}}>
       <HeaderGradient headerText={headerText} refreshIcon={refreshIcon} back={back}  onRefreshIcon={onRefreshIcon} bellIcon={bellIcon} onBellIcon={onBellIcon} exit={exit} onExit={onExit} />
      {/* <ImageBackground className={height} source={bgImage} resizeMode="stretch"> refresh-cw*/}
          <View  style={[{paddingHorizontal: paddingHorizontal?theme.paddingHorizontal:0,},styles.container]}>
              {children}
              {/* <View style={{
                    backgroundColor:'white',
                    position:'absolute',bottom:screenHeight*0.14,right:0,left:0,}}>
                      <Text style={styles.textPowerby}>Powered By © Mjunction Services Ltd.</Text>
                  </View> */}
          </View>
          
          
      {/* </ImageBackground> */}
    </View>
  )
}

export default InsideFormBg

const styles = StyleSheet.create({
  textPowerby:{
           
    fontSize:theme.fontSizes.fontSize14,lineHeight:17,
    fontWeight:400,fontFamily:theme.fonts.regular,
    textAlign:'center',color:'#595858',
    //marginBottom:11
},
  container : {
    flex:1,
    backgroundColor:'#F9F9F9'//'#F9F9F9'
    //shadowColor: '#171717',
   // shadowOffset: {width: -2, height: 2},
    //shadowOpacity: 0.2,
    //shadowRadius: 3,
    //elevation:10,
    
     //paddingBottom: screenHeight*0.02
  }
})