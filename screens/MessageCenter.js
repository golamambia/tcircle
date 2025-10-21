import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  Dimensions,
  Modal,
  TouchableOpacity,
  Platform,
  Animated,
  Alert,
} from 'react-native';


import InsideFormBg from '../components/InsideFormBg';
import { useFocusEffect } from '@react-navigation/native';
import ListItemTemplate from '../components/ListItemTemplate';
import theme from '../constants/theme';
import ListItemRow from '../components/ListItemRow';
import ButtonNormal from '../components/ButtonNormal';
import PoweredByMJ from '../components/PoweredByMJ';

import CustomDatePicker from '../components/CustomDatePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionData } from '../constants/common';
import CustomerService from '../services/CustomerService';
import { useSelector } from 'react-redux';
import InfoMsg from '../components/InfoMsg';
import getLabelLanguage from '../lang';



const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const MessageCenter = ({ navigation }) => {
  const getUserName = useSelector(
    state => state.currentUserDetails.userName
  );
  const [visibleIds, setVisibleIds] = useState({});
  const animationValues = useRef({}).current;

  const [searchResult, setSearchResult] = useState([]);
  const [check, setCheck] = useState(1);
 
  const [loading, setLoading] = useState(false);
 const [FromDate, setFromDate] = useState('');
 const [ToDate, setToDate] = useState('');
 const [userName,setUserName]=useState("");
 const [msg,setMsg]=useState("No Data Available");
  useFocusEffect(
    React.useCallback(() => {

        
        AsyncStorage.getItem(SessionData.AUTH_USERNAME).then(val => {
          console.log('userName ', val);
          setUserName(val);
         
        });
       
      },[])
    )
 
 
  
  const searchHandler=()=>{
    //setCheck(p => p + 1);
       if(!FromDate){
          Alert.alert(  
            '',  
            'Please select from date',  
            [  
                 
                {text: 'OK', onPress: () =>''},  
            ]  
        );
        }else if(!ToDate){
          Alert.alert(  
            '',  
            'Please select to date',  
            [  
                 
                {text: 'OK', onPress: () =>''},  
            ]  
        );
        }
        else{
      const payload={
             "FromDate" : FromDate,
             "ToDate" : ToDate,
              "Customer_Id"  : getUserName ? getUserName : userName
                }
                console.log(payload);
                setLoading(true);
                CustomerService.getMessageHistoryList(payload)
                              .then(res => {
                                const result=res.COALBPSAppShownotificationResult;
                                console.log('getMessageHistoryList res', JSON.stringify(res));
                                setLoading(false);
                                if (result.StatusCode=='001'  && result.Message=='Success') {
                                
                                  setSearchResult(result.notificationList);
                                }else{
                                  setMsg(result.Message)
                                  setSearchResult([]);
                                  
                                }
                                
                              })
                            }
    }

    const searchHandlerRef=()=>{
      setMsg("No Data Available")
      setSearchResult([]);
      setFromDate("");
      setToDate("");
     
    }
  return (
    <InsideFormBg paddingHorizontal={false} headerText="Message Center /n(संदेश केंद्र)" back={true} refreshIcon={true} onRefreshIcon={searchHandlerRef}>
    
<View style={styles.container}>

<ScrollView contentContainerStyle={[styles.scrollContainer,searchResult.length>0?'':{flex:1}]} showsVerticalScrollIndicator={false}>

<View >

<ListItemTemplate headingText={'Please Search Using Date Range /n(कृपया दिनांक सीमा का उपयोग करके खोजेंें)'}>
<CustomDatePicker
                //isDob={true}
                fieldText="From date (तारीख से)"
                value={FromDate}
                setValue={setFromDate}
                required={true}
                check={check}
                placholder={'DD/MM/YYYY'}
              /> 
<CustomDatePicker
                //isDob={true}
                fieldText="To date (तारीख तक)"
                value={ToDate}
                setValue={setToDate}
                required={true}
                check={check}
                placholder={'DD/MM/YYYY'}
              />    
                                
            <View style={{marginTop:16,marginBottom:8}}>
              <ButtonNormal disabled={loading} onPress={()=>{searchHandler()}} loading={loading}>
              {getLabelLanguage('text_submit')}
              </ButtonNormal>
              </View>
        </ListItemTemplate>



  
</View>
          <View style={styles.mainDiv}>
          {searchResult.length>0 && searchResult.map((template,index) => {
        
        return (
          <ListItemTemplate
          key={index}
       // headingText={'Booking ID - 1234567890'}
        >
          
       <View style={{marginBottom:8}}>
                   <Text style={styles.leftText} >
                    {template.Notification}
                     
                   </Text>
                 </View>
        <ListItemRow lefttext={''} rightText={template.NotificationDate} />
       
       

        </ListItemTemplate>
 );
})}
{!loading && searchResult.length==0 && (
                 <ListItemTemplate
                 >
     
     <InfoMsg text={msg} />
                </ListItemTemplate>
                 )}


            </View>
            <View style={styles.powerBy}>
<PoweredByMJ backgroundColor={false} />
</View> 
    </ScrollView>
    
    </View>
   

    </InsideFormBg>
  );
};

const styles = StyleSheet.create({
  leftText:{color:'#595858',fontSize:theme.fontSizes.fontSize14,fontWeight:theme.fontsWeight.medium,fontFamily:theme.fonts.medium,},

  powerBy:{position:'absolute',left:0,right:0,alignItems:'center',bottom:screenHeight*0.07,},
  container:{paddingHorizontal:theme.paddingHorizontal,flex:1,},
  scrollContainer:{
    position:'relative',
   // flex:1,
    
  },
  textRequiredMsg: {
    position: 'absolute',
    color: theme.colors.error,
    bottom: -12,
    paddingLeft: 2,
    fontSize: theme.fontSizes.small,
    textTransform: 'capitalize',
  },
  warnImg: {height: 24, width: 24, position: 'absolute', right: 8, top: '45%'},
  textLabel: {
    paddingLeft: 2,
    color: theme.colors.inputLabelColor,
    fontSize: theme.fontSizes.fontSize14,
    fontWeight: theme.fontsWeight.medium,
    fontFamily: theme.fonts.medium,
  },
  radioTextLabel: {
    paddingTop:8,
    //paddingLeft: 2,
    color: theme.colors.inputLabelColor,
    fontSize: theme.fontSizes.fontSize14,
    fontWeight: theme.fontsWeight.medium,
    fontFamily: theme.fonts.medium,
  },
  textField: {
    paddingVertical: 8,
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: theme.colors.inputBoxBorderColor,
    borderRadius: 5,
    fontSize: theme.fontSizes.fontSize14,
    color: theme.colors.inputTextColor,
    fontWeight: theme.fontsWeight.regular,
    fontFamily: theme.fonts.regular,
  },
  tabWrapper:{flexDirection:'row',justifyContent:'center',alignItems:'center',alignContent:'center'},
  image100:{width:'100%',height:'100%'},
  rightBorderWidth:{borderRightWidth:2,borderRightColor:'#FFFFFF',},
  tabInnerBox:{flexDirection:'row',alignSelf:'center'},
  tabBox:{flex:1,backgroundColor:theme.colors.primary,borderTopColor:'#FFFFFF',borderTopWidth:2,
    justifyContent:'center',alignItems:'center',
    alignSelf:'center', paddingVertical:8,},
  labelText:{fontSize:theme.fontSizes.small,
    fontWeight:theme.fontsWeight.semiBold,
    fontFamily:theme.fonts.semiBold,color:'#FFFFFF',
  lineHeight:16,
  paddingVertical:4,
  paddingHorizontal:8
  },
  mainDiv:{marginTop:12,marginBottom:screenHeight*0.19},
  borderLine:{borderTopColor:'#DFDFDF',borderTopWidth:1,marginTop:8,paddingTop:8,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:2,paddingBottom:4},
  textUnderLine:{fontSize:theme.fontSizes.fontSize14,fontWeight:theme.fontsWeight.semiBold,fontFamily:theme.fonts.semiBold,
    textAlign:'center',lineHeight:17,color:theme.colors.primary,textDecorationLine:'underline',
    textDecorationStyle:'solid',
  },
});

export default MessageCenter;
