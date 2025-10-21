import React, {useState, useEffect, useRef, useCallback} from 'react'
import {View, Text, StyleSheet, Pressable, Image, Modal, FlatList, TextInput, Alert, Dimensions} from "react-native"
import { XCircleIcon } from "react-native-heroicons/outline";
import ButtonRounded from './ButtonRounded';
import ButtonGradient from './ButtonGradient';
import getLabelLanguage from '../lang';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonNormal from './ButtonNormal';
import theme from '../constants/theme';
import { SessionData } from '../constants/common';
import InputField from './InputField';

const {height, width} = Dimensions.get("screen");
const OTPModal = ({openOTP, setOpenOTP, heading,otpValue='',onPress,resendOtp=()=>{}}) => {

    // resend timer
    const [timeLeft, setTimeLeft] = useState(null);
    const [targetTime, setTargetTime] = useState(null);
  
    // when the system is ready to allow a resend request
    const [activeResend, setActiveResend] = useState(false);
    const [selLang, setSelLang] = useState("");
    const [selected, setSelected] = useState("");
    const bgColor = (title) => {
      return selected == title?"bg-[#F3FFFF]" : "bg-white"
    }

    let resendTimerInterval;

    const calculateTimeLeft = finalTime => {
      const difference = finalTime - +new Date();
      if (difference >= 0) {
        setTimeLeft(Math.round(difference / 1000));
      } else {
        setTimeLeft(null);
        clearInterval(resendTimerInterval);
        setActiveResend(true);
      }
    };
  
    const triggerTimer = (targetTimeInSecond = 60) => {
      setTargetTime(targetTimeInSecond);
      setActiveResend(false);
      const finalTime = +new Date() + targetTimeInSecond * 1000;
      resendTimerInterval = setInterval(() => {
        calculateTimeLeft(finalTime);
      }, 1000);
    };
  
    useEffect(() => {
      triggerTimer();
  
      return () => {
        clearInterval(resendTimerInterval);
      };
    }, []);

    useFocusEffect(useCallback(() => {
      AsyncStorage.getItem(SessionData.AUTH_TOKEN).then(lang => {
        setSelLang(lang);
      })
    }, []))

    const pin1Ref = useRef(null);
    const pin2Ref = useRef(null);
    const pin3Ref = useRef(null);
    const pin4Ref = useRef(null);
    const pin5Ref = useRef(null);
    const pin6Ref = useRef(null);
    const pin7Ref = useRef(null);
    const pin8Ref = useRef(null);

    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin3, setPin3] = useState("");
    const [pin4, setPin4] = useState("");
    const [pin5, setPin5] = useState("");
    const [pin6, setPin6] = useState("");
    const [pin7, setPin7] = useState("");
    const [pin8, setPin8] = useState("");

    useEffect(() => {
        pin1Ref.current?.focus();
    },[])

    // const resendOtpHandler = ()=>{
    //     console.log("resend OTP")
    // }
    const continueHandler = ()=>{
      if (!pin1 ) {
        pin1Ref.current?.focus();
        Alert.alert(
          '',
          'Enter your OTP',
          [{text: 'OK', onPress: () => ''}],
          {cancelable: false},
        );
         
       }
      // else if (!pin2 ) {
      //   pin2Ref.current?.focus();
      //   Alert.alert(
      //     '',
      //     'Enter your OTP',
      //     [{text: 'OK', onPress: () => ''}],
      //     {cancelable: false},
      //   );
         
      // }else if (!pin3 ) {
      //   pin3Ref.current?.focus();
      //   Alert.alert(
      //     '',
      //     'Enter your OTP',
      //     [{text: 'OK', onPress: () => ''}],
      //     {cancelable: false},
      //   );
         
      // }else if (!pin4 ) {
      //   pin4Ref.current?.focus();
      //   Alert.alert(
      //     '',
      //     'Enter your OTP',
      //     [{text: 'OK', onPress: () => ''}],
      //     {cancelable: false},
      //   );
         
      // }else if (!pin5 ) {
      //   pin5Ref.current?.focus();
      //   Alert.alert(
      //     '',
      //     'Enter your OTP',
      //     [{text: 'OK', onPress: () => ''}],
      //     {cancelable: false},
      //   );
         
      // }
      // else if (!pin6 ) {
      //   pin6Ref.current?.focus();
      //   Alert.alert(
      //     '',
      //     'Enter your OTP',
      //     [{text: 'OK', onPress: () => ''}],
      //     {cancelable: false},
      //   );
         
      // }
      // else if (!pin7 ) {
      //   pin7Ref.current?.focus();
      //   Alert.alert(
      //     '',
      //     'Enter your OTP',
      //     [{text: 'OK', onPress: () => ''}],
      //     {cancelable: false},
      //   );
         
      // }
     
      else{
      
      const pinArray = [pin1];
      onPress(pinArray); // Pass the OTP digits array to the parent component
      // Close the OTP modal or perform any other actions
      setOpenOTP(false);
      setPin1("");
      }
  }
  const handleKeyPress = ({ nativeEvent }, index) => {
    //console.log('Backspace1',index);
    if (nativeEvent.key === 'Backspace' && index > 0) {
      //const pin_no='pin'+index+'Ref';
      //console.log('Backspace22',pin_no);
      if(index==7){
        pin7Ref.current?.focus();
      }else if(index==6){
        pin6Ref.current?.focus();
      }else if(index==5){
        pin5Ref.current?.focus();
      }else if(index==4){
        pin4Ref.current?.focus();
      }else if(index==3){
        pin3Ref.current?.focus();
      }else if(index==2){
        pin2Ref.current?.focus();
      }else if(index==1){
        pin1Ref.current?.focus();
      }
      
      //inputRefs.current[index - 1].focus();
    }
  };
  return (
    <View style={styles.centeredView} >
        <Modal
        animationType="slide" 
        transparent={true}
        visible={openOTP}
        onRequestClose={() => {
       // Alert.alert('Modal has been closed.');
        setOpenOTP(!openOTP);
        
        }}>
         <View style={styles.modalBackground}>
          <View  style={styles.modalBox}>
              <View style={styles.innerModalBox} >
                <View style={styles.circleIconBox} >
                  <Text style={styles.headerText} >{heading}</Text>
                  <Pressable onPress={()=>setOpenOTP((p) => !p)}><XCircleIcon color="#444" size={30} /></Pressable>
                </View>
                <View style={{paddingVertical:16}} >
                    <View style={{...stylesOTP.otpContainer}}>
                      <View style={{width:'100%'}}>
                      <InputField fieldName="" maxLength={8} keyboardType="numeric" value={pin1} setValue={setPin1}  />
                    
                      </View>
                            {/* <View style={stylesOTP.otpInputWrap}>
                                <TextInput
                                    ref={pin1Ref}
                                    keyboardType={'number-pad'}
                                    maxLength={1}
                                    onChangeText={(pin) => {
                                        setPin1(pin);
                                        if(pin !== ""){
                                            pin2Ref.current?.focus();
                                        }
                                    }}
                                    style={stylesOTP.textInputOtp}
                                    />
                            </View> */}
                            {/* <View style={stylesOTP.otpInputWrap}>
                                <TextInput
                                    ref={pin2Ref}
                                    keyboardType={'number-pad'}
                                    maxLength={1}
                                    onChangeText={(pin) => {
                                        setPin2(pin);
                                        if(pin !== ""){
                                            pin3Ref.current?.focus();
                                        }
                                    }}
                                    onKeyPress={(e) => handleKeyPress(e, 1)}
                                    style={stylesOTP.textInputOtp}
                                    />
                            </View>
                            <View style={stylesOTP.otpInputWrap}>
                                <TextInput 
                                    ref={pin3Ref}
                                    keyboardType={'number-pad'}
                                    maxLength={1}
                                    onChangeText={(pin) => {
                                        setPin3(pin);
                                        if(pin !== ""){
                                            pin4Ref.current?.focus();
                                        }
                                    }}
                                    onKeyPress={(e) => handleKeyPress(e, 2)}
                                    style={stylesOTP.textInputOtp}
                                />
                            </View>
                            <View style={stylesOTP.otpInputWrap}>
                                <TextInput
                                    ref={pin4Ref}
                                    keyboardType={'number-pad'}
                                    maxLength={1}
                                    onChangeText={(pin) => {
                                        setPin4(pin);
                                        if(pin !== ""){
                                          pin5Ref.current?.focus();
                                      }
                                    }}
                                    onKeyPress={(e) => handleKeyPress(e, 3)}
                                    style={stylesOTP.textInputOtp}
                                />
                            </View>
                            <View style={stylesOTP.otpInputWrap}>
                                <TextInput 
                                    ref={pin5Ref}
                                    keyboardType={'number-pad'}
                                    maxLength={1}
                                    onChangeText={(pin) => {
                                        setPin5(pin);
                                        if(pin !== ""){
                                           pin6Ref.current?.focus();
                                        }
                                    }}
                                    onKeyPress={(e) => handleKeyPress(e, 4)}
                                    style={stylesOTP.textInputOtp}
                                />
                            </View>
                            <View style={stylesOTP.otpInputWrap}>
                                <TextInput 
                                    ref={pin6Ref}
                                    keyboardType={'number-pad'}
                                    maxLength={1}
                                    onChangeText={(pin) => {
                                        setPin6(pin);
                                        if(pin !== ""){
                                            pin7Ref.current?.focus();
                                        }
                                    }}
                                    onKeyPress={(e) => handleKeyPress(e, 5)}
                                    style={stylesOTP.textInputOtp}
                                />
                            </View>
                            <View style={stylesOTP.otpInputWrap}>
                                <TextInput 
                                    ref={pin7Ref}
                                    keyboardType={'number-pad'}
                                    maxLength={1}
                                    onChangeText={(pin) => {
                                        setPin7(pin);
                                        if(pin !== ""){
                                            pin8Ref.current?.focus();
                                        }
                                    }}
                                    onKeyPress={(e) => handleKeyPress(e, 6)}
                                    style={stylesOTP.textInputOtp}
                                />
                            </View>
                            <View style={stylesOTP.otpInputWrap}>
                                <TextInput 
                                    ref={pin8Ref}
                                    keyboardType={'number-pad'}
                                    maxLength={1}
                                    onChangeText={(pin) => {
                                        setPin8(pin);
                                        if(pin !== ""){
                                           // pin6Ref.current?.focus();
                                        }
                                    }}
                                    onKeyPress={(e) => handleKeyPress(e, 7)}
                                    style={stylesOTP.textInputOtp}
                                />
                            </View> */}
                           

                    </View>
                    <Pressable style={styles.resendTimer} disabled={!activeResend}  onPress={() => {
                      resendOtp();
                      triggerTimer();
                      setPin1("")
                      }}>
                                <Text style={{color: activeResend ? "rgb(59 130 246)" : "#333"}}>Re-send OTP</Text>
                                {!activeResend && (
                  <Text style={[styles.inputFieldName, {fontSize: 14}]}>
                    {" "}in {timeLeft || targetTime} second(s)
                  </Text>
                )}
                            </Pressable>
                    <View style={{marginTop:20}} >
                        <ButtonNormal disabled={!pin1} onPress={()=>continueHandler()}>Continue</ButtonNormal>
                    </View>
                </View>
                
              </View>
          </View>
        </View> 
    </Modal>
  </View>
  )
}

const stylesOTP = StyleSheet.create({
    headingText: {
        fontFamily: 'Adani-Regular',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1E1E1E'
      },
      fontFamily: {
        fontFamily: 'Adani-Regular'
      },
      otpContainer : {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    otpInputWrap: {
        width: '100%',//width*0.1,
        height: width*0.1,
        borderWidth :2,
        borderColor: '#CECECE',
        justifyContent: "center",
        alignItems: 'center'
    },

    textInputOtp: {
        fontSize: 28,
        color:"#292929",
        padding:0,
        margin:0,
        textAlign: "center"
    }
    
})

const styles = StyleSheet.create({
  innerModalBox:{paddingTop:16,paddingHorizontal:16},
  modalBackground:{flex:1, 
    backgroundColor:'rgba(0,0,0,0.65)'
  },
  resendTimer:{
    marginTop:8
    ,flexDirection:'row',justifyContent:'space-between'},
  circleIconBox:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  modalBox:{
    // height: `${(modalOptions.length*11)+15}%`,
    // height: `50%`,
    width: '100%',
    opacity:1,
    marginTop: 'auto',
   // borderRadius: 13,
     borderTopRightRadius:13,
     borderTopLeftRadius:13,
    backgroundColor:'#fff',
    alignSelf: 'center',
    //marginBottom: height*0.01,
    //paddingBottom: height*0.015
    // backgroundColor:'blue'
  },
  headerText:{
    color: '#333',           
    //textAlign: 'center',       
    fontFamily: theme.fonts.semiBold,           
    fontWeight: '600',       
    fontSize: 18,             
    lineHeight: 18,
   
  },
    centeredView: {
     // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
     // backgroundColor:'rgba(0,0,0,0.65)',//"#000",
      zIndex:10
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    fontFamily: {
        fontFamily: 'Adani-Regular'
      },
      inputFieldName: {
        fontSize: 16,
        fontWeight: '400',
        color: "rgb(59 130 246)",
        // marginBottom: 5,
        
      },
  });

export default OTPModal