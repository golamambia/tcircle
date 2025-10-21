import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import theme from '../constants/theme';
import InsideFormBg from '../components/InsideFormBg';
import { ScrollView } from 'react-native-gesture-handler';
import { ArrowDownRightIcon, BellIcon, CalendarIcon, ChevronRightIcon, MagnifyingGlassIcon, UsersIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';
import InputField from '../components/InputField';
import ButtonNormal from '../components/ButtonNormal';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const WriteReview=({navigation,route})=> {
const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [check, setCheck] = useState(1);
   const [loading, setloading] = useState(false);

    return(
        <InsideFormBg headerText={'Write a Review'} >
<View style={styles.container}>

<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>


          <View >
          
              

 

      {/* Stars */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
          marginTop:60
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <StarIcon
              size={32}
              color={i <= rating ? "gold" : "lightgray"}
              style={{ marginHorizontal: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Review Box */}
      <InputField fieldName="Write your review" multiline={true} numberOfLines={6} required={true} value={review} setValue={setReview} check={check}  />
       
<ButtonNormal disabled={loading} onPress={()=>''} loading={loading}>
              Submit
              </ButtonNormal>
     
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
export default WriteReview