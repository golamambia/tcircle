import React from 'react'
import {Pressable, View, Text, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import theme from '../constants/theme';
import useAutoLogout from '../store/hook/useAutoLogout';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const ButtonNormal = ({children, onPress, disabled=false,bgColor,loading=false}) => {
  const { resetTimer } = useAutoLogout(); 
  const isDisabled = () => {
    return disabled?"bg-[#75b2f8]" : "bg-[#0D66CA]"
  }
  const isColor= () => {
    //console.log(bgColor);
    return bgColor?bgColor : "#0D66CA";
  }
  const handlePress = () => {
    //console.log('Button Pressed, Resetting Timer...');
    resetTimer();
    if (onPress) {
      onPress();
    }
  };
  return (
    <TouchableOpacity style={styles.buttonWhite} disabled={disabled} onPress={handlePress}>
        <Text style={styles.buttonText} >{children}</Text>
         {loading && <ActivityIndicator style={{position:'absolute',right:16}} size={'large'} color={"#d2d2d2"}  />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Adani-Regular',
    color: theme.colors.white,
textAlign: 'center', 
fontWeight: '500',
fontFamily: theme.fonts.medium, 
fontSize: theme.fontSizes.medium, 
//letterSpacing: 1.25,
textTransform:'uppercase',
// lineHeight:19
},
buttonWhite:{
  width:'100%',
paddingVertical:screenHeight*0.012,
backgroundColor:theme.colors.primary,
borderColor:theme.colors.primary,
marginVertical:screenHeight*0.008,
borderRadius:5,
borderWidth:1,
position:'relative'
} 
})

export default ButtonNormal