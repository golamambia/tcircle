import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import theme from '../constants/theme';
import InsideFormBg from '../components/InsideFormBg';
import { ScrollView } from 'react-native-gesture-handler';
import { ArrowDownRightIcon, BellIcon, CalendarIcon, ChevronRightIcon, MagnifyingGlassIcon, UsersIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';
import InputField from '../components/InputField';
import ButtonNormal from '../components/ButtonNormal';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const NotificationList=({navigation,route})=> {
const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [check, setCheck] = useState(1);
   const [loading, setloading] = useState(false);
const notifications = [
  { id: "1", username: "John Doe",
    message: "Requested approval for Trust Circle.",
    date: "2025-09-06",},
  { id: "2",username: "John Doe",
    message: "Requested approval for Trust Circle.",
    date: "2025-09-06", },
  { id: "3", username: "John Doe",
    message: "Requested approval for Trust Circle.",
    date: "2025-09-06", },
];
const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "#fff",
      }}
    >
      <BellIcon size={26} color="black" style={{ marginRight: 12 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.username}</Text>
        <Text style={{ fontSize: 14, color: "#555", marginVertical: 4 }}>
          {item.message}
        </Text>
        <Text style={{ fontSize: 12, color: "#888" }}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

    return(
        <InsideFormBg headerText={'Notification List'} >
<View style={styles.container}>

<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>


          <View style={{marginTop:20}}>
          
              

 <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

     
      
     
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
export default NotificationList