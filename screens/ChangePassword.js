import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../constants/theme';
import InsideFormBg from '../components/InsideFormBg';
import { ScrollView } from 'react-native-gesture-handler';
import { ArrowDownRightIcon, BellIcon, CalendarIcon, ChevronRightIcon, MagnifyingGlassIcon, UsersIcon } from 'react-native-heroicons/outline';
import Share from "react-native-share";
import { useFocusEffect } from '@react-navigation/native';
import { SessionData } from '../constants/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const ChangePassword=({navigation,route})=> {
  const [referral_id,setreferral_id]=useState("");
 useFocusEffect(
    React.useCallback(() => {
 
 

    })
  )
   
  
    return(
        <InsideFormBg headerText={'Change Password'} >
<View style={styles.container}>

<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>


          <View >
          
              

 
        
      
  <View style={{ backgroundColor: "#fff", padding: 0,marginTop:40 }}>
      
 
       
     
</View>
 
            </View>
            
             
    </ScrollView>
    
    </View>
    
     
    </InsideFormBg>
    )

}
const styles=StyleSheet.create({
     headerText:{color:theme.colors.primary,fontSize:theme.fontSizes.medium,
    fontWeight:theme.fontsWeight.semiBold,fontFamily:theme.fonts.semiBold,
    lineHeight:19,
    textAlign:'center',
    //paddingTop:8,paddingBottom:8
  },
  powerBy:{position:'absolute',left:0,right:0,alignItems:'center',bottom:screenHeight*0.06,},
  container:{
    paddingHorizontal:theme.paddingHorizontal,
    flex:1,
    // backgroundColor:'blue'
  },
  scrollContainer:{
    position:'relative',
    flex:1,
    //backgroundColor:'red'

  },
  imgBox:{width:35,height:35,},
  backgroundBox:{width:55,height:55,backgroundColor:'#DBE9FC',borderRadius:5,
    justifyContent:'center',alignItems:'center'},
  innerBox:{justifyContent:'center',alignItems:'center'},
  mainBox:{
    marginTop:8,
    marginBottom:8,
    //flex:1,
    flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20},
  img100:{
    width:'100%',
    height:'100%'
  },
  labelText:{fontSize:theme.fontSizes.small,
    fontWeight:theme.fontsWeight.medium,
    fontFamily:theme.fonts.medium,color:'#595858',
  lineHeight:15,
  paddingTop:4
  },
})
export default ChangePassword