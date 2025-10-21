import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../constants/theme';
import InsideFormBg from '../components/InsideFormBg';
import { ScrollView } from 'react-native-gesture-handler';
import { ArrowDownRightIcon, BellIcon, CalendarIcon, ChevronRightIcon, MagnifyingGlassIcon, UsersIcon } from 'react-native-heroicons/outline';
import ButtonNormal from '../components/ButtonNormal';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const FamilyProfile=({navigation,route})=> {
const [loading, setloading] = useState(false);

    return(
        <InsideFormBg back={true} headerText={'Family Profile'} >
<View style={styles.container}>

<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>


          <View >
          
     

      {/* Content */}
      <View style={{ padding: 20 }}>
        {/* Profile Image Box */}
        <View
          style={{
            height: 180,
            backgroundColor: "#f5f5f5",
            borderRadius: 8,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./../assets/Images/image-46.png")}
            style={{ width: "100%", height: "100%", borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>

        {/* Name and Age */}
        <Text style={{ fontSize: 16, fontWeight: "600" }}>John, 11</Text>
        <Text style={{ fontSize: 14, color: "gray", marginBottom: 15 }}>
          Portaguess, English
        </Text>

        {/* Activities */}
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 5 }}>
          Activities
        </Text>
        <Text style={{ fontSize: 14, color: "gray", marginBottom: 15 }}>
          Medis and Local Tours
        </Text>

        {/* About */}
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 5 }}>
          About
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E5E5E5",
            borderRadius: 6,
            height: 40,
            marginBottom: 20,
          }}
        />
<ButtonNormal disabled={loading} onPress={()=>''} loading={loading}>
               Send Request
              </ButtonNormal>
        {/* Button */}
         
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
    //paddingHorizontal:theme.paddingHorizontal,
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
export default FamilyProfile