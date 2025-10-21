import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const RewardsConnectFullLogo = ({belowText}) => {
  return (
   
    <View className="w-[100%] mb-[10%]">
     <View className="w-[100%] flex items-center justify-center">
        {/*  */}
    </View>
    {belowText && <Text className="text-sm text-center w-full text[#111] font-bold mt-2" style={styles.fontFamily}>{belowText}</Text>}
  </View>
  )
}

export default RewardsConnectFullLogo

const styles = StyleSheet.create({
    logo: {
        width: screenWidth*0.4,
        height: screenHeight*0.06,
      },
      fontFamily: {
        fontFamily: 'Adani-Regular',
        color: "#111",
        letterSpacing:0.3,
        fontSize:16
      },
})