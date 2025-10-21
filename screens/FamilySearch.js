import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import theme from '../constants/theme';
import InsideFormBg from '../components/InsideFormBg';
import { ScrollView } from 'react-native-gesture-handler';
import { ArrowDownRightIcon, ArrowLeftIcon, BellIcon, CalendarIcon, ChevronRightIcon, MagnifyingGlassIcon, UsersIcon } from 'react-native-heroicons/outline';
 

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const FamilySearch=({navigation,route})=> {


    return(
        <InsideFormBg headerText={'Family Search'} >
<View style={styles.container}>

<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
 

      {/* Filters + Sort */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 2,
          marginTop: 24,
          marginBottom:12
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 6,
            paddingVertical: 10,
            marginRight: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14 }}>Filters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 6,
            paddingVertical: 10,
            marginLeft: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14 }}>Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Cards Grid */}
      <View
        style={{
            
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        {/* Card */}
        {["Portugal", "gLo6kj", "Portai", "Pont/sa"].map((name, index) => (
  <TouchableOpacity
    key={index}
    onPress={() => navigation.navigate("FamilyProfile")} // handle navigation here
    style={{
      width: "48%",
      borderWidth: 1,
      borderColor: "#E5E5E5",
      borderRadius: 8,
      marginBottom: 15,
      padding: 10,
      alignItems: "center",
      backgroundColor: "#fafafa",
    }}
    activeOpacity={0.7} // gives a nice touch effect
  >
    {/* Circle Image */}
    <View
      style={{
        width: 150,
        height: 150,
        borderRadius: 25,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        overflow: "hidden",
      }}
    >
      <Image
        source={require("./../assets/Images/image-46.png")}
        style={{ width: "100%", height: "100%" }}
      />
    </View>

    {/* Name */}
    <Text
      style={{
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
      }}
    >
      {name}
    </Text>
  </TouchableOpacity>
))}

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
export default FamilySearch