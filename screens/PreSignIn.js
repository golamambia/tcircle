import React, {useCallback, useEffect, useState} from 'react';
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
  addFullName,
 addUserName,
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
import { validateMobileNumber } from '../constants/validation';
import Feather from 'react-native-vector-icons/Feather';
import { PencilSquareIcon } from 'react-native-heroicons/outline';
import OTPModal from '../components/OTPModal';
import { decryptData, encryptData, mobileHandler } from '../reusable/resuableFunctions';
import { fetchUsers } from '../store/redux/features/registrationSlice';
import { SessionData } from '../constants/common';
import YesNoModal from '../components/YesNoModal';
import DeviceInfo from 'react-native-device-info';
import getLabelLanguage from '../lang';
import useAutoLogout from '../store/hook/useAutoLogout';


const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

//console.log('sh', screenHeight);

const PreSignIn = ({route, navigation}) => {
  const { resetTimer } = useAutoLogout(); 
  const toast = useToast();
  const dispatch = useDispatch();
   const getProductID = useSelector(
       state => state.currentUserDetails.productID
     );
  const [check, setCheck] = useState(1);
  const [mob, setMob] = useState('');
  const [loginVia, setLoginVia] = useState(false);
  const [customerID, setCustomerID] = useState('');
  const [loading, setloading] = useState(false);
  const [pin, setPin] = useState('');
  const [otp, setOTP] = useState('');
  const [submitBTN, setSubmitBTN] = useState(false);
  const [otpST, setOtpST] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
 const [openModal, setOpenModal] = useState(false);
 const [uniqueId, setUniqueId] = useState('');
 

 useFocusEffect(
  React.useCallback(() => {
//console.log('process.env.REACT_APP_ENV',process.env.API_KEY);
DeviceInfo.getUniqueId().then(id => {
//console.log('getUniqueId ',id);
setUniqueId(id);
});
  })
)

  useEffect(() => {
    //console.log('token signup..............................',);
    //console.log(screenWidth,' width: ',screenWidth * 0.62,screenHeight,' height: ',screenHeight * 0.30)
    //console.log('signup hit');
    AsyncStorage.getItem(SessionData.AUTH_TOKEN).then(token => {
      console.log('token signup', token);
      if (token != null) {
        
          navigation.replace('Dashboard');
         
      }
    });

 
  }, []);



  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent('parentDrawer').setOptions({
        headerShown: false,
      });
      
    }, []),
  );

  const storeData = async (response)=>{
    try {
      await AsyncStorage.setItem(SessionData.AUTH_DATA_KEY, JSON.stringify(response));
      await AsyncStorage.setItem(SessionData.AUTH_TOKEN, response.access_token);
      await AsyncStorage.setItem(SessionData.AUTH_USERNAME, response.data.user.email + '');
      await AsyncStorage.setItem(SessionData.AUTH_USER_FULLNAME, response.data.user.name + '');
      await AsyncStorage.setItem(SessionData.AUTH_CUSTOMER_MOBILE, response.data.user.phone_number + '');
      await AsyncStorage.setItem(SessionData.AUTH_USER_FNAME, response.data.user.name + '');
// console.log('response.fname',response.response_data.fname,response);
    } catch (e) {
      // saving error
    }
  };

  function resetFields() {
    setCheck(1);
   setMob('');
   setCustomerID('');
   setOTP('');
   setPin('');
   
  }
  const otpHandler = () => {
    setCheck(p => p + 1);
    
          if (!mob) {
            return false
          }else if (!customerID) {
            return false
          }else {
            setloading(true);
            const payload = {
              MobileNo:  String(mob),
              SAPCode: String(customerID),
              DeviceID:String(uniqueId),
              OTPCount:'0',
              OTP:''
            };
            // console.log("selectedPersona", selectedPersona)
             console.log(payload)
            RegistrationService.loginWithOTP(payload)
              .then(res => {
                const result=res?.COALBPSOTPRequestResult;
                console.log('OTP res22', JSON.stringify(res));
                
                if (result.StatusCode=='001') {
                  setloading(false);
                 
                  
                  
                  toast.show('', {
                    data: {
                        isSuccess: true,
                        heading: '',
                        describe:result.Msg,
                      },
                  });
                  setOtpST(true);
                } else {
                  setloading(false);
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
                            describe: res.Msg?res.Msg:result.Msg,
                          },
                      });
                   
                  }
                }
              })
              .catch(err => {
                setloading(false);
                const errorMsg =
    err.Msg ||
    err?.message ||
    'Something went wrong, please try again.';

  // toast.show('', {
  //   data: {
  //     isSuccess: false,
  //     heading: 'Network Error',
  //     describe: errorMsg,
  //   },
  // });
              });
          }
  }
 
  const signInHandler = () => {

  try {setCheck(p => p + 1);
    if (!mob || !customerID) return;

    setloading(true);

    const payload = { email: mob, password: customerID };
    console.log("payload", payload);

    RegistrationService.login(payload)
      .then(res => {
        console.log("login res", res);

        if (res.success && res.access_token) {
          setloading(false);

          dispatch(updateLoginStatus({ isLoggedIn: true }));
          dispatch(addUserName({ userName: res.data?.user?.email }));
          dispatch(addFullName({ fullName: res.data?.user?.name }));

          storeData(res);

          toast.show("", {
            data: {
              isSuccess: true,
              heading: "Login Successful",
              describe: "You have successfully logged into Trusted Circle",
            },
          });

          setTimeout(() => {
            navigation.replace("Dashboard");
          }, 500);
        } else {
          setloading(false);
          toast.show("", {
            data: {
              isSuccess: false,
              heading: "Login failed!",
              describe: res.message || "Invalid credentials",
            },
          });
        }
      })
      .catch(err => {
        setloading(false);
        console.error("Login error:", err);
        toast.show("", {
          data: {
            isSuccess: false,
            heading: "Login failed!",
            describe: err.message || "Something went wrong",
          },
        });
      });
  } catch (error) {
    console.log("error", error);
    setloading(false);
  }finally{
    setloading(false);
  }
};


  
  
   
   
  function onResponse(res) {
            console.log('res',res);
            if (res == 'yes') {
              BackHandler.exitApp()
            } else {
              setOpenModal(false);
            }
  }
  useFocusEffect(
            useCallback(() => {
              const backAction = () => {
                console.log("Back button pressed on Dashboard!");
                setOpenModal(true); // Open modal only on Dashboard
                return true; // Prevent default back behavior
              };
        
              const subscription = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
              );
        
              return () => subscription.remove(); // Cleanup when leaving Dashboard
            }, [])
          );
  return (
    
      <FormBackground>
       
        <KeyboardAvoidingView
      style={{flex:1,}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      
    >
<ScrollView style={{position:'relative'}} showsVerticalScrollIndicator={false}>
        <View style={styles.mainBox}>
          
           <CoalengineImage logo={true} />
           

        <View style={styles.textDiv}>
          <Text style={styles.textWelcome} >Login To Your Account</Text>
          
          </View>

          <View style={{width:'100%'}}>
              <InputField fieldName="Email" required={true} value={mob} setValue={setMob} check={check}  />
              <InputField fieldName="Password"  required={true} value={customerID} setValue={setCustomerID} check={check}  />
              
              
                        
          </View> 
          
            <View style={{marginTop:1}}>
   
 
              <ButtonNormal disabled={loading} onPress={signInHandler} loading={loading}>
              Log In
              </ButtonNormal>
 
              <View style={{paddingTop:5}}>
              
                <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                <Text style={styles.textUnderLine}>Sign Up</Text>
                </TouchableOpacity>
        
            {otpST &&
                <TouchableOpacity onPress={()=>resendOTP()}>
                <Text style={styles.textUnderLine}> Resend OTP</Text>
                </TouchableOpacity>
            }
              </View>
            </View>
             
        
          
        </View>
      
          </ScrollView>
          </KeyboardAvoidingView>
          
          
        
         
               
          {openModal &&
    <YesNoModal
         heading={'ALERT!'}
         question={'Are you sure you want to exit ?)'}
         open={openModal}
         setOpen={setOpenModal}
         onResponse={onResponse}
         yesText={'YES'}
         noText={'No'}
       />
    } 
      </FormBackground>
      
    
  );
};

const styles = StyleSheet.create({
  calendarIcon:{position:'absolute',right:1,top:0,},
  textDontHave:{fontSize:theme.fontSizes.fontSize14,fontWeight:theme.fontsWeight.regular,fontFamily:theme.fonts.regular,
   lineHeight:17,color:'#282727',
  },
  textUnderLine:{fontSize:theme.fontSizes.fontSize14,fontWeight:theme.fontsWeight.medium,fontFamily:theme.fonts.medium,
    textAlign:'center',lineHeight:17,color:theme.colors.primary,textDecorationLine:'underline',
    textDecorationStyle:'solid',
  },
  textPowerby:{fontSize:theme.fontSizes.fontSize14,lineHeight:17,fontWeight:400,fontFamily:theme.fonts.regular,
    textAlign:'center',color:'#595858',marginBottom:screenHeight*0.01},
  textWelcome:{fontSize:theme.fontSizes.fontSize22,lineHeight:26,
    fontWeight:'700',fontFamily:theme.fonts.bold,
    textAlign:'center',
   // alignSelf:'center',
    color:'#323030'},
  textDiv:{
    textAlign:'center',
    position:'relative',
    marginTop:screenHeight*0.039,
    marginBottom:screenHeight*0.015},
  mainBox:{
    //flex:1,
    marginBottom:40,
    //minHeight: 807.27 * 0.8, 
    //height: screenHeight * 0.7,
    marginTop:screenWidth * 0.095,
    //justifyContent:'space-between'
  },
   
  
  width100:{
    width:'100%'
  }

});

export default PreSignIn;
