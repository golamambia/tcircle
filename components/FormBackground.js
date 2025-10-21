import { StyleSheet, Text, View, ImageBackground, Dimensions, Image } from 'react-native'
import React from 'react'
import NetworkUtils from '../store/hook/NetworkUtills';

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const FormBackground = ({children, isModalOpen, bgImage=""}) => {
  const isConnected = NetworkUtils();
  return (
    <View style={styles.container}>
      
      {/* <ImageBackground className="min-h-screen w-screen" source={bgImage}> */}
      {/* <View className="flex-1 h-full justify-center w-full items-center" >
        <Image source={require("./../assets/Images/rc-logo.png")} resizeMode="cover" /> */}
         
      
         
              {children}
          {/* </View> */}
      {/* </ImageBackground> */}
    </View>
  )
}

export default FormBackground

const styles = StyleSheet.create({
  container : {
    flex: 1,
    // marginTop:3, //screenHeight*0.06,
    paddingHorizontal: screenWidth*0.045,
    backgroundColor: '#F9F9F9',//'#EBFCFE',
    //paddingBottom: screenHeight*0.02
    
  },
})