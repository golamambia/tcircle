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

const Settings=({navigation,route})=> {
  const [referral_id,setreferral_id]=useState("");
 useFocusEffect(
    React.useCallback(() => {
 
AsyncStorage.getItem(SessionData.AUTH_DATA_KEY)
    .then((val) => {
      if (val) {
        const parsed = JSON.parse(val); // parse the string
        console.log("User data:", parsed);

        // Adjust path according to your stored structure
        if (parsed?.data?.user?.referral_id) {
          setreferral_id(parsed.data.user.referral_id);
          console.log("Referral ID:", parsed.data.user.referral_id);
        }
      }
    })
    .catch((error) => {
      console.error("Error reading AsyncStorage:", error);
    });

    })
  )
   
  const shareApp = async () => {
     try {
    const link = `https://previewwebsite.online/trusted-family-circle/invite?ref=${referral_id}`;

    await Share.open({
      message: `Join Trusted Family \n${link}`,
    });
  } catch (error) {
    console.error("Error sharing:", error);
  }
  };
    return(
        <InsideFormBg headerText={'Settings'} >
<View style={styles.container}>

<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>


          <View >
          
              

 
 <View>
   
   
 
        
      
  <View style={{ backgroundColor: "#fff", padding: 0,marginTop:40 }}>
      
 
       
      <View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 24,
            borderWidth: 1,
            borderBottomWidth:2.5,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 24,
              backgroundColor: "rgba(165, 162, 162, 0.05)",
              elevation:1
          }}
        >
           
          <Text style={{ marginLeft: 12, fontSize: 18, }}>Visibility</Text>
           <Text style={{textAlign:"right",marginLeft:screenWidth*0.48}}><ChevronRightIcon size={24} color="black" /></Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 24,
            borderWidth: 1,
            borderBottomWidth:2.5,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 24,
            backgroundColor: "rgba(165, 162, 162, 0.05)",
            elevation:1
          }}
          onPress={()=>navigation.navigate('UpdateProfile')}
        >
           
          <Text style={{ marginLeft: 12, fontSize: 18 }}>Update Profile</Text>
           <Text style={{textAlign:"right",marginLeft:screenWidth*0.35}}><ChevronRightIcon size={24} color="black" /></Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 24,
            borderWidth: 1,
           borderBottomWidth:2.5,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 24,
            backgroundColor: "rgba(165, 162, 162, 0.05)",
            elevation:1
          }}
        >
          
          <Text style={{ marginLeft: 12, fontSize: 18 }}>Two-factor Authentication</Text>
           <Text style={{textAlign:"right",marginLeft:screenWidth*0.1}}><ChevronRightIcon size={24} color="black" /></Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 24,
            borderWidth: 1,
            borderBottomWidth:2.5,
            borderColor: "#ccc",
            borderRadius: 8,
            backgroundColor: "rgba(165, 162, 162, 0.05)",
            elevation:1
          }}
          onPress={()=>shareApp()}
        >
          
          <Text style={{ marginLeft: 12, fontSize: 18 }}>Invite Members</Text>
          <Text style={{textAlign:"right",marginLeft:screenWidth*0.33}}><ChevronRightIcon size={24} color="black" /></Text>
        </TouchableOpacity> */}
      </View>
    </View>
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
export default Settings