import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from 'react-native';
 
import InputField from '../components/InputField';
import RegistrationService from '../services/registration';
import {useSelector} from 'react-redux';
import FormBackground from '../components/FormBackground';

import {useFocusEffect} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {
  addBrandId,
  addContactId,
  addCreatedById,
  addHierarchicalId,
  addOrganizationId,
  updateLoginStatus,
  updateToken,
} from '../store/redux/currentUser';

import {useToast} from 'react-native-toast-notifications';
import ButtonNormal from '../components/ButtonNormal';
import ButtonWhite from '../components/ButtonWhite';
import theme from '../constants/theme';
import OptionsInputField from '../components/OptionsInputField';
import CustomDatePicker from '../components/CustomDatePicker';
import PoweredByMJ from '../components/PoweredByMJ';
import CoalengineImage from '../components/CoalengineImage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SessionData } from '../constants/common';
import CustomerService from '../services/CustomerService';
import DeviceInfo from 'react-native-device-info';
import OTPModal from '../components/OTPModal';
import LoadingAlert from '../components/LoadingAlert';
import getLabelLanguage from '../lang';
import { encryptData } from '../reusable/resuableFunctions';


const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const CreatePin = ({route, navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();
   
  const [check, setCheck] = useState(1);

  const [sap, setSap] = useState('');
  const [mob, setMob] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingM, setLoadingM] = useState(false);
  const [pinST, setPinST] = useState(false);
  const [pinNo, setPinNo] = useState('');
  const [pinNoC, setPinNoC] = useState('');
  const [uniqueId, setUniqueId] = useState('');
 const [otpST, setOtpST] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [openModal, setOpenModal] = useState(false);
const [otp, setOTP] = useState('');

 useFocusEffect(
  React.useCallback(() => {

DeviceInfo.getUniqueId().then(id => {
//console.log('getUniqueId ',id);
setUniqueId(id);
});
  })
)
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent('parentDrawer').setOptions({
        headerShown: false,
      });
      
    }, []),
  );
  


  const gotoPin = () => {
    
    navigation.navigate('PreSignIn');
  }
  const createPinHandler=()=>{
    setCheck(p => p + 1);
    if (!mob || !sap
    ) {
      return 
    }else if (!pinNo || !pinNoC
    ) {
      return 
    }  else {
      if(pinNo==pinNoC){
        const encypPin=  encryptData(pinNo);
    const payload={
      SAPCode:sap, 
      MobileNo:mob,
      PinNo:encypPin,
      DeviceID:''
             }
             setLoading(true);
             CustomerService.createResetPIN(payload)
                           .then(res => {
                             const result=res.LoginCreatePINResult;
                             console.log('createResetPIN res', JSON.stringify(res));
                             setLoading(false);
                             if (result.StatusCode=='001') {
                              setPinST(false);
                              setPinNo("");
                              setPinNoC("");
                              setSap("");
                              setMob("");
                              setCheck(1);
                              toast.show('', {
                                data: {
                                  isSuccess: true,
                                  heading: 'Thank You',
                                  describe:result.Message,
                                },
                              });
                              
                             }else{
                              setPinST(false);
                              toast.show('', {
                                data: {
                                  isSuccess: false,
                                  heading: 'Alert',
                                  describe:result.Message,
                                },
                              });
                             }
                             
                           }).catch(err=>{
                            setLoading(false);
                           });
                          }else{
                            toast.show('', {
                              data: {
                                  isSuccess: false,
                                  heading: 'PIN Mismatch',
                                  describe:'Please check your PIN',
                                },
                            });
                          }
                          }
           }
 const pincheckHandler=()=>{
  setCheck(p => p + 1);
  if (!mob || !sap
  ) {
    return 
  } else {
  const payload={
    SAPCode:sap, 
  MobileNo:mob
           }
           setLoadingM(true);
           CustomerService.checkPIN(payload)
                         .then(res => {
                           const result=res.COALBPSLoginCheckExistPINResult;
                           console.log('COALBPSLoginCheckExistPINResult res', JSON.stringify(res));
                           setLoadingM(false);
                           if (result.StatusCode=='001') {
                           // setPinST(true);
                            toast.show('', {
                              data: {
                                isSuccess: false,
                                heading: 'Alert',
                                describe:result.Message,
                              },
                            });
                            
                           }else if (result.StatusCode=='007') {
                            otpHandler();
                            }else{
                            setPinST(false);
                            toast.show('', {
                              data: {
                                isSuccess: false,
                                heading: 'Alert',
                                describe:result.Message,
                              },
                            });
                           }
                           
                         }).catch(err=>{
                          setLoadingM(false);
                         });
                        }
         }

const otpHandler = () => {
    setCheck(p => p + 1);
    
          if (!mob) {
            return false
          }else if (!sap) {
            return false
          }else {
            setLoadingM(true);
            const payload = {
              MobileNo:  String(mob),
              SAPCode: String(sap),
              DeviceID:String(uniqueId),
              OTPCount:'0',
              OTP:''
            };
            // console.log("selectedPersona", selectedPersona)
             console.log(payload)
            RegistrationService.loginWithOTP(payload)
              .then(res => {
                const result=res.COALBPSOTPRequestResult;
                console.log('OTP res', JSON.stringify(res));
                
                if (result.StatusCode=='001') {
                  setLoadingM(false);
                 
                  
                  
                  toast.show('', {
                    data: {
                        isSuccess: true,
                        heading: '',
                        describe:result.Msg,
                      },
                  });
                  setOtpST(true);
                } else {
                  setLoadingM(false);
                  if (res.message == 'Bad request') {
                    toast.show('', {
                        data: {
                            isSuccess: false,
                            heading: 'Sorry!',
                            describe: result.Msg,
                          },
                      });
                  } else {
                    toast.show('', {
                        data: {
                            isSuccess: false,
                            heading: 'Sorry!',
                            describe: result.Msg,
                          },
                      });
                   
                  }
                }
              })
              .catch(err => {
                setLoadingM(false);
              });
          }
  }
   function verifyOtp(otp){
      const payload = {
        MobileNo:  String(mob),
                SAPCode: String(sap),
                DeviceID:String(uniqueId),
                OTPCount:'1',
                OTP:Number(otp)
      };
      // console.log("selectedPersona", selectedPersona)
       console.log(payload)
       setLoadingM(true);
       //setVerifyOTP(true);
      RegistrationService.loginWithOTP(payload)
        .then(res => {
          const result=res.COALBPSOTPRequestResult;
          console.log('login res', JSON.stringify(res));
          setLoadingM(false);
          //setloading(false);
          if (result.StatusCode=='001' && result.tisco_sap_code!='' && result.cust_mobile1!='' && result.Msg=='Success') {
            setLoadingM(false);
            setPinST(true);
            
            // toast.show('', {
            //   data: {
            //       isSuccess: true,
            //       heading: 'Login Successful',
            //       describe:
            //         'You have successfully logged into Sahaj',
            //     },
            // });
           
          } else {
            setLoadingM(false);
            setPinST(false);
            toast.show('', {
              data: {
                  isSuccess: false,
                  heading: 'Verification failed!',
                  describe: result.Msg,
                },
            });
             
            
          }
        })
        .catch(err => {
          setLoadingM(false);
        });
    }
    function sendOtp(){
      otpHandler();
    }

  return (
    
      <FormBackground>
       
        <KeyboardAvoidingView
      style={{flex:1,}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      
    >
<ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainBox}>
          
           <CoalengineImage logo={true} />
           

        <View style={styles.textDiv}>
          <Text style={styles.textWelcome} >Create PIN</Text>
          </View>

          <View style={{width:'100%'}}>
              <InputField fieldName="Mobile No" maxLength={10} editable={!pinST}  keyboardType="numeric"  required={true} value={mob} setValue={setMob} check={check}  />
              <InputField fieldName="Customer ID" maxLength={10} editable={!pinST} keyboardType="numeric"  required={true} value={sap} setValue={setSap} check={check}  />
             {pinST &&
            <View>
            <InputField fieldName="Enter Pin" maxLength={4}  keyboardType="numeric"  required={true} value={pinNo} setValue={setPinNo} check={check}  />
            <InputField fieldName="Enter Confirm Pin" maxLength={4}  keyboardType="numeric"  required={true} value={pinNoC} setValue={setPinNoC} check={check}  />
         </View>
            }
              
                        
          </View>  

            <View style={{marginTop:1}}>
              <ButtonNormal onPress={()=>pinST?createPinHandler():pincheckHandler()} loading={loading}>
              {getLabelLanguage('text_submit')}
              </ButtonNormal>
              <View style={{paddingTop:5}}>
               <TouchableOpacity onPress={()=>gotoPin()}>
                               <Text style={styles.textUnderLine}>Login</Text>
                               </TouchableOpacity>
              </View>
            </View>
             
        
          
        </View>
        
          
          </ScrollView>
          </KeyboardAvoidingView>
          {loadingM &&(
  <LoadingAlert visible={loadingM} />
)}
          {otpST  &&
        <OTPModal
                  
                  setOpenOTP={setOtpST}
                  openOTP={otpST}
                  heading={'Verify OTP'}
                  onPress={verifyOtp}
                  resendOtp={sendOtp}
                  
                />
        }
      </FormBackground>
      
    
  );
};

const styles = StyleSheet.create({
  textUnderLine:{fontSize:14,fontWeight:theme.fontsWeight.medium,fontFamily:theme.fonts.medium,
    textAlign:'center',lineHeight:17,color:theme.colors.primary,textDecorationLine:'underline',
    textDecorationStyle:'solid',
  },
  textPowerby:{fontSize:theme.fontSizes.fontSize14,lineHeight:17,fontWeight:400,fontFamily:theme.fonts.regular,
    textAlign:'center',color:'#595858',marginBottom:screenHeight*0.01},
  textWelcome:{fontSize:theme.fontSizes.fontSize22,lineHeight:26,
    fontWeight:'700',fontFamily:theme.fonts.bold,
    //textAlign:'center',
    color:'#323030'},
  textDiv:{
    marginTop:screenHeight*0.02,
    marginBottom:screenHeight*0.015},
  mainBox:{
    //flex:1,
    marginBottom:40
    //minHeight: 807.27 * 0.8, 
    //height: screenHeight * 0.7,
    //marginTop:screenWidth * 0.025,
    //justifyContent:'space-between'
  },
   
  
  width100:{
    width:'100%'
  }

});

export default CreatePin;
