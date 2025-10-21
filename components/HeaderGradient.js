import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { navigationRef } from '../navigation/NavigationService';

const HeaderGradient = ({headerText,
  refreshIcon = false,
  isOpen = false,
  setIsOpen = ()=>{},
  onRefreshIcon = ()=>{},
 
  pageName='',
  back = false,
  bellIcon=false,
  onBellIcon = ()=>{},
exit=false,
onExit = ()=>{},
}) => {
    const splitText = headerText.split('/n');
    const navigation = useNavigation();
  function shortifyText(text){
    if(text){
      if(text.length > 35)
      return text.substring(0,33) + "...";
    return text;
  }
    }
   
    function goBack() {
      //console.log(navigation.getState());
      
      if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
      } else {
        navigationRef.navigate("Dashboard");
      }
    }

  return (
    <View style={{flexDirection:'row',backgroundColor:theme.colors.primary,position:'relative',paddingVertical:splitText[1]?6:16}}>
        <View style={{flex: 1}}>
        
        {back && (
          <View >
        <Pressable style={{zIndex:9,position:'absolute',left:11,paddingVertical:splitText[1]?12:0 }} className="ml-2" onPress={() => exit?onExit(true):goBack()}>
              <MaterialIcons name={'arrow-back-ios-new'} size={20} color="white" /> 
            </Pressable>
            </View>
            )}
          <Text style={styles.text}>
            {shortifyText(splitText[0])}
          </Text>
          {splitText[1] &&
          <Text style={styles.subtext}>
            {shortifyText(splitText[1])}
          </Text>
  }
          {refreshIcon && (
            <View style={{zIndex:9,position:'absolute',right:bellIcon?45:15,paddingVertical:splitText[1]?10:0 }}>
            <Pressable onPress={() => {
              setIsOpen(true)
              onRefreshIcon()
              }}>
              <Feather name={'refresh-cw'} size={20} color="white" />
            </Pressable>
            </View>
          )}
{bellIcon && (
            <View style={{zIndex:9,position:'absolute',right:15,paddingVertical:splitText[1]?10:0 }}>
            <Pressable onPress={() => {
              setIsOpen(true)
              onBellIcon()
              }}>
              <FontAwesome5 name={'bell'} size={20} color="white" />
            </Pressable>
            </View>
          )}
          
        </View>
        
      </View>
                  
              
  )
}

export default HeaderGradient

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',           
    textAlign: 'center',       
    fontFamily: theme.fonts.semiBold,           
    fontWeight: '600',       
    fontSize: 18,             
    lineHeight: 18,
    //paddingVertical:12 
    paddingTop:4          
  },
  subtext: {
    color: '#FFFFFF',           
    textAlign: 'center',       
    fontFamily: theme.fonts.semiBold,           
    fontWeight: '600',       
    fontSize: 18,             
    lineHeight: 22,
    paddingTop:4        
  },
})