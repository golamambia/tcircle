import { StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native'
import React from 'react'
import { BellIcon, HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/outline'
import { useSelector } from 'react-redux'

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const DrawerHeaderBtn = ({navigation}) => {
    // const totalCartItems = useSelector(state => state.currentUserDetails.totalCartItems)

  return (
    <View
    style={{
      width:'100%',
      flexDirection: 'row',
      //position:'relative',
      justifyContent:'space-between',
      //right:10,
      marginTop:-4
    }}
    >
      
    
                              <View style={[styles.tataimg]}>
                              <Image style={styles.img100} source={require("./../assets/Images/logo-horizontal.png")} resizeMode="cover" />
                              </View>
                              
                              {/* <View style={[styles.ibmdimg,]}>
                              <Image style={styles.img100} source={require("./../assets/Images/ibmdlogo.png")} resizeMode="contain" />
                              </View> */}
                              
    
  </View>
  )
}

export default DrawerHeaderBtn

const styles = StyleSheet.create({
  img100:{height:'100%',width:'100%'},
  tataimg:{
    width:'100%',
    height:screenHeight * 0.055,
  },
  ibmdimg:{
    width: screenWidth * 0.2, 
    height:screenHeight * 0.035, 
  },
})