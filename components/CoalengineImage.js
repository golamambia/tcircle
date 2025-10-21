import React, { useCallback, useEffect, useState } from 'react'
import {Dimensions, Image, Keyboard, StyleSheet, Text, View} from 'react-native'
import theme from '../constants/theme'
import { useFocusEffect } from '@react-navigation/native';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const screenHeightw = Dimensions.get('window').height;
const CoalengineImage = ({logo=false,marginTop=false}) => {
    
  return (
    //style={{marginTop:-screenHeight*0.03}}
    <View style={{alignSelf: "center",marginTop:marginTop?0:screenHeight*0.035}}>
    <View style={styles.coalimg}>
               <Image style={styles.img100} source={require("./../assets/Images/coaleng.png")} resizeMode="contain" />
               </View>
               {/* marginTop:-screenHeight*0.045 */}
               {/* {logo &&
               <View style={{flexDirection:'row',marginTop:6,marginBottom:screenHeight*0.01,}}>
                          <View style={[styles.tataimg,{flex:1.5,marginRight:screenHeight*0.04}]}>
                          <Image style={styles.img100} source={require("./../assets/Images/tata-steel.png")} resizeMode="contain" />
                          </View>
                          <View style={[styles.ibmdimg,{flex:2,marginLeft:screenHeight*0.05}]}>
                          <Image style={styles.img100} source={require("./../assets/Images/ibmdlogo.png")} resizeMode="contain" />
                          </View>
                          </View>} */}
                          </View>
  )
}
const styles=StyleSheet.create({
  //screenHeight*0.03==20 screenHeight*0.01=10
    img100:{height:'100%',width:'100%'},
  // .62coalimg:{width:screenWidth * 0.75,height:screenHeight * 0.30, alignSelf: "center"},
  coalimg:{width:screenWidth*0.55,height:screenHeight * 0.2, alignSelf: "center",
//borderWidth:1,
//borderColor:'red'
  },
  tataimg:{
    width:screenWidth * 0.45,
    height:screenHeight * 0.06,
    //marginLeft:-20 ,
    //alignSelf: "center", 
   // marginTop: screenHeight*0.015
  },
  ibmdimg:{
    width: screenWidth * 0.22, 
    height:screenHeight * 0.05, 
    //alignSelf: "center",
    //right:-15
  },
})
export default CoalengineImage