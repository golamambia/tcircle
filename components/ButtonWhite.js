import React from 'react'
import {Pressable, View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import theme from '../constants/theme';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const ButtonWhite = ({children, onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonWhite}  onPress={onPress}>
        <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: 'Adani-Regular',
        color:theme.colors.primary ,
    textAlign: 'center', 
    fontWeight: '500',
    fontFamily:theme.fonts.medium, 
    fontSize: theme.fontSizes.medium, 
    //letterSpacing: 1.25, 
    textTransform:'uppercase',
    //lineHeight:19
    },
    buttonWhite:{
      width:'100%',
      //paddingTop: 10,
      paddingVertical:screenHeight*0.012,
    backgroundColor:theme.colors.white,
    borderColor:theme.colors.primary,
    //marginTop:16,
    marginVertical:screenHeight*0.008,
    borderRadius:5,
    borderWidth:1
    }
    
})
export default ButtonWhite