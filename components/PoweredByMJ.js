import React, { useCallback, useEffect, useState } from 'react'
import {Keyboard, StyleSheet, Text, View} from 'react-native'
import theme from '../constants/theme'
import { useFocusEffect } from '@react-navigation/native';

const PoweredByMJ = ({backgroundColor=true}) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    
      useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardVisible(true);
            //console.log('keyboardDidShowF');
          },
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false);
            //console.log('keyboardDidHideF');
          },
        );
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);
  return (
    <View style={{
      backgroundColor:backgroundColor?'white':'',
      position:'absolute1',bottom:10,right:0,left:0,paddingTop:4}}>
        {/* <Text style={styles.textPowerby}>Powered By © Mjunction Services Ltd.</Text> */}
    </View>
  )
}
const styles=StyleSheet.create({
    textPowerby:{
           
        fontSize:theme.fontSizes.fontSize14,lineHeight:17,
        fontWeight:400,fontFamily:theme.fonts.regular,
        textAlign:'center',color:'#595858',
        //marginBottom:11
    },
})
export default PoweredByMJ