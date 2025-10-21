import React, {useEffect, useState} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, Pressable, Dimensions, Alert} from 'react-native';
import { LinearTextGradient } from 'react-native-text-gradient';
import InputField from '../components/InputField';
import RegistrationService from '../services/registration';
import { useSelector } from 'react-redux';
import FormBackground from '../components/FormBackground';
import ButtonGradient from '../components/ButtonGradient';
import OptionsInputField from '../components/OptionsInputField';
import { useFocusEffect } from '@react-navigation/native';
import { CheckCircleIcon, LanguageIcon, PencilIcon, UserIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { addContactId, addCreatedById, addHierarchicalId, addOrganizationId, updateToken } from '../store/redux/currentUser';
import CustomToast from '../components/CustomToast';
import InputFieldPassword from '../components/InputFieldPassword';
import OTPField from '../components/OTPField';
import RewardsConnectFullLogo from '../components/RewardsConnectFullLogo';
import OtherService from '../services/Other';
import { SessionData } from '../constants/common';
 

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const ForgotPassword = ({route, navigation}) => {
    const dispatch = useDispatch();
  

    const [check, setCheck] = useState(1);

    const [selectedPersona, setSelectedPersona] = useState({id:"", title: ""})
    const [sap, setSap] = useState("")
    const [mob, setMob] = useState("")
 
    const [selectedLanguage, setSelectedLanguage] = useState({id:"", title: ""});
    const [allLanguages, setAllLanguages] = useState([]);
    const [loading, setLoading] = useState(false)
  

    const [showNotify, setShowNotify] = useState(false)
    const [loginStatus, setLoginStatus] = useState({isSuccess: true, heading:"", describe:""})
    const [password, setpassword] = useState('');
    const [con_password, setcon_password] = useState('');
    const [otp, setotp] = useState('');
    const [backendOTP, setbackendOTP] = useState('');

    

    useEffect(() => {
        console.log('signup hit');
        AsyncStorage.getItem(SessionData.AUTH_TOKEN).then(token => {
            console.log('token signup',token);
            if(token!=null){
                navigation.replace("CustomerDetail")
            }
        })

        OtherService.allHier().then(res => {
            if(res.success){
                let arr = [];
                let arr1 = []
                res.response.hierarchiesDetails.forEach((item, key) => {
                    
                    if(!arr1.includes(item.description)){
                        arr1.push(item.description)
                        arr.push({id : item.description, title: item.description, key})
                    }
                    })
                
            }
        })
    },[])

    useEffect(()=> {
        const unsubscribe = navigation.addListener('beforeRemove', e=>{
            console.log("event", e.data.action.type)
        if(e.data.action.type === "REPLACE"){
            return;
        }
        e.preventDefault();
        });
        return unsubscribe;
        
         }, [navigation]);



    useFocusEffect(
        React.useCallback(() => {
            navigation.getParent('parentDrawer').setOptions({
                headerShown: false
            });
            RegistrationService.getLanguages().then(res => {
                console.log(JSON.stringify(res))
                if(res.success == true){
                    const langs = res.response.languageDetails.map((lang) => ({id: lang.id, title:lang.name}))
                    setAllLanguages(langs)
                }
              }).catch(err => {
                console.log(JSON.stringify(err))
              });
        }, [])
      );

       

      function resetFields(){
        setCheck(1)
        setPassCheck(1)
        setPhase1Filled(false)
        setSap("");
        setPassword("");
        setSelectedPersona({id:"", title: ""})
        setSelectedLanguage({id:"", title: ""})
        setMob("")
      }

 

      const moveToSignUp = () => {
        navigation.navigate("SignUp", {from:"signin"})
        //resetFields()
      }

      const moveToSignIn = () => {
        console.log('SignIn hit');
        navigation.replace("SignIn");
        //resetFields()
      }
      const sendOTP = () => {
        setLoading(true);
        
        
        if (!mob ) {
          Alert.alert(
            '',
            'Please enter mobile number',
            [{text: 'OK', onPress: () => ''}],
            {cancelable: false},
          );
          setLoading(false);
        }else if (!ValidatePhoneNumber(mob)) {
          Alert.alert(
            '',
            'Please enter valid mobile number',
            [{text: 'OK', onPress: () => ''}],
            {cancelable: false},
          );
          setLoading(false);
        }
           else {
            const payload = {
                mobile_number: mob,
              };
          console.log('otp info ', payload);
          RegistrationService.forgotPasswordOTP(payload)
            .then(res => {
              console.log('info otp', res);
              setLoading(false);
              if (res.success == true) {
                res.response.OTP?setbackendOTP(String(res.response.OTP)):'';
                Alert.alert(
                  '',
                  res.response.message + (res.response.OTP?' ,OTP is ' + String(res.response.OTP):''),
                  [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                  {cancelable: false},
                );
              } else {
                Alert.alert(
                  '',
                  'Invalid mobile no',
                  [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                  {cancelable: false},
                );
              }
            })
            .catch(err => {
              setLoading(false);
              //setKycLoading(false);
              console.log('Err', err);
            });
        }
      };
      const changePassword = () => {
        setLoading(true);
        let passReg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/);
    //console.log('password',passReg.test(password));
           
        const payload = {
          otp: otp,
          password: password,
        };
        if (!password) {
          Alert.alert(
            '',
            'Please enter password',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
          setLoading(false);
        }else if (password && !passReg.test(password)) {
          Alert.alert(
            '',
            'Password must be 8-15 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@.#$!%*?&)',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
          setLoading(false);
        } else if (!con_password) {
          Alert.alert(
            '',
            'Please enter confirm password',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
          setLoading(false);
        }else if (con_password && !passReg.test(con_password)) {
          Alert.alert(
            '',
            'Password must be 8-15 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@.#$!%*?&)',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
          setLoading(false);
        } else if (password != con_password) {
          Alert.alert(
            '',
            'Please check both password',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
          setLoading(false);
        }else if (!otp) {
          Alert.alert(
            '',
            'Please enter OTP',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
          setLoading(false);
        } else {
          //console.log('otp info ', payload);
          RegistrationService.forgotPasswordSet(payload)
            .then(res => {
              console.log('chng pass', res);
              setLoading(false);
              if (res.success == true) {
                setotp('');
                setbackendOTP('');
                 
                setpassword('');
                setcon_password('');
                
                Alert.alert(
                  '',
                  res.response.message,
                  [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                  {cancelable: false},
                );
              } else {
                Alert.alert(
                  '',
                  'Something went wrong!',
                  [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                  {cancelable: false},
                );
              }
            })
            .catch(err => {
              setLoading(false);
              //setKycLoading(false);
              console.log('Err', err);
            });
        }
      };
      function ValidatePhoneNumber(num) {
        let contactPetrn = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);
        let numS = num+""
        console.log(parseInt(numS.charAt(0)))
        if (contactPetrn.test(num) && parseInt(numS.charAt(0))>5) {
          return true;
        }
        return false;
      }
      function validatePin(pinCode) {
        let regPattern = new RegExp(/^[0-9]*$/);
        return regPattern.test(pinCode);
      }
    
      function pincodeHandler(pin) {
        if (validatePin(pin)) setMob(pin);
      }
  return (
    <ScrollView className="relative">
        <FormBackground bgImage={require("./../assets/Images/adani_reg_bg.png")}>
            <View className="flex-1 w-full bg-white m-4 rounded-xl p-4 shadow">
                <View className="items-center flex-1">
                    <RewardsConnectFullLogo belowText={"Recover your password"} />
                    <View className="flex flex-col space-y-5 justify-start items-start w-full">
                         
                        
                         <View className="w-full">
                            <InputField fieldName="Mobile no"  keyboardType="numeric" editable={backendOTP?false:true} required={true} value={mob} setValue={pincodeHandler} check={check}  />
                        </View>

                        {backendOTP && (
                            <View className="w-full">
                                <View className="w-full">
                                <InputFieldPassword
                                  fieldName="New Password"
                                  required={true}
                                  value={password}
                                  setValue={setpassword}
                                />
                              </View>

                              <View className="w-full">
                                <InputFieldPassword
                                  fieldName="Confirm Password"
                                  required={true}
                                  value={con_password}
                                  setValue={setcon_password}
                                />
                              </View>
                                <View className="w-full">
                                  <InputFieldPassword
                                    fieldName="OTP"
                                    required={true}
                                    value={otp}
                                    setValue={setotp}
                                  />
                                </View>
                                
                                </View>

                              )}
                      
                    </View>
                     
 
                    <View className="w-full pt-8">
                    {!backendOTP && (
                                  <ButtonGradient
                                    onPress={sendOTP}
                                    loading={loading}>
                                    Send OTP
                                  </ButtonGradient>
                                )}
                                {backendOTP && (
                                  <ButtonGradient
                                    onPress={changePassword}
                                    loading={loading}>
                                    Submit
                                  </ButtonGradient>
                                )}
                         
                    </View>
                    

                    <View className="w-[100%] mt-4">
                        <View className="flex-row justify-center items-center py-2 ">
                            {/* <Pressable onPress={() => setSignInUsingOtp((p) => !p)}>
                                <Text className="text-blue-500 text-sm underline underline-offset-2 font-medium tracking-wider">{signInUsingOtp?"Sign in via password" : "Sign in via otp"}</Text>
                            </Pressable> */}
                            <Pressable onPress={()=>moveToSignIn()}>
                                <Text className="text-blue-500 text-sm underline underline-offset-2 font-medium tracking-wider">Sign In</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>
                <View className="flex-row pt-2 border-t border-t-slate-300 justify-center items-center">
                    <Text className="text-center text-[#333333]">Don’t have an account?{" "}</Text>
                    <Pressable  onPress={moveToSignUp}><Text className="text-[#0D66CA]">Sign up</Text></Pressable>
                </View>
            </View>
            {showNotify && <CustomToast setShowToast={setShowNotify} isSuccess={loginStatus.isSuccess} heading={loginStatus.heading} describe={loginStatus.describe} />}
        </FormBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    headingText: {
        fontFamily: 'Adani-Regular',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1E1E1E'
      },
      fontFamily: {
        fontFamily: 'Adani-Regular',
        color: "#111",
        letterSpacing:0.3,
        fontSize:16
      },
      adaniBold: {
        fontFamily: 'Adani-Bold'
      },
      logo: {
        width: screenWidth*0.4,
        height: screenHeight*0.06,
      }
})

export default ForgotPassword;