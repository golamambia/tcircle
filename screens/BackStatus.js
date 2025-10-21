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

import InputField from '../components/InputField';
import InfoMsg from '../components/InfoMsg';
import CustomerService from '../services/CustomerService';
import getLabelLanguage from '../lang';



const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const BackStatus = ({ navigation }) => {
 
  const [visibleIds, setVisibleIds] = useState({});
  const animationValues = useRef({}).current;

  const [bookingNo, setBookingNo] = useState('');
  
  const [check, setCheck] = useState(1);
 
  const [loading, setLoading] = useState(false);
 const [searchResult, setSearchResult] = useState([]);
 const [msg, setMsg] = useState("No Data Available");
 const [msgS, setMsgS] = useState("No Data Available");
 const searchHandler=()=>{
    setSearchResult([]);
    setCheck(p => p + 1);
       if(!bookingNo){
         return
        }
        else{
      const payload={
             "BookingID" : bookingNo,
                }
                console.log(payload);
                setLoading(true);
                CustomerService.getBackStatus(payload)
                              .then(res => {
                                const result=res.COALBPSAddBackResult;
                                console.log('COALBPSAddBackResult res', JSON.stringify(res));
                                
                                setLoading(false);
                                if (result.StatusCode=='001'  && result.Msg=='Success') {
                                  setMsg(result.Message);
                                     }else{
                                  
                                      setMsg(result.Message);
                                  
                                }
                                
                              })
                            }
    }
  
  
  
  const onPressIconnw=()=>{
    setCheck(1);
setBookingNo("");
setMsg("");
  }
  return (
    <InsideFormBg paddingHorizontal={false} headerText="Add Back Status /n (वापस स्थिति जोड़ें )" back={true} refreshIcon={true} onRefreshIcon={onPressIconnw} >
    
<View style={{paddingHorizontal:theme.paddingHorizontal,flex:1,}}>

<ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} >
<View>

<ListItemTemplate headingText={'Booking Confirmation Number: (बुकिंग पुष्टिकरण संख्या)'}>
<InputField fieldName="Booking confirmation no" keyboardType={'numeric'} required={true} value={bookingNo} setValue={setBookingNo}check={check}  />
              
                                
            <View style={{marginTop:8,marginBottom:0}}>
              <ButtonNormal disabled={loading} onPress={()=>{searchHandler()}} loading={loading}>
              {getLabelLanguage('text_search')}
              </ButtonNormal>
              </View>
        </ListItemTemplate>

        <ListItemTemplate headingText={'State:(स्टेट )'}  >
  
                <InfoMsg text={msg?msg:msgS} />
                
                </ListItemTemplate>

   
      
</View>
<View style={{position:'absolute',left:0,right:0,alignItems:'center',bottom:screenHeight*0.07,}}>
<PoweredByMJ backgroundColor={false} />
</View>    
          



           
    </ScrollView>
    
    </View>
 

    </InsideFormBg>
  );
};

const styles = StyleSheet.create({
  container:{position:'relative',
    marginTop:8,
    flex:1,
   
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
  mainDiv:{
    marginTop:12,
    marginBottom:screenHeight*0.19
  },
  borderLine:{borderTopColor:'#DFDFDF',borderTopWidth:1,marginTop:8,paddingTop:8,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:2,paddingBottom:4},
  textUnderLine:{fontSize:theme.fontSizes.fontSize14,fontWeight:theme.fontsWeight.semiBold,fontFamily:theme.fonts.semiBold,
    textAlign:'center',lineHeight:17,color:theme.colors.primary,textDecorationLine:'underline',
    textDecorationStyle:'solid',
  },
});

export default BackStatus;
