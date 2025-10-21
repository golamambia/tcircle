import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, {useState, useEffect, useCallback, useRef} from 'react'

const OTPField = () => {
    const pin1Ref = useRef(null);
    const pin2Ref = useRef(null);
    const pin3Ref = useRef(null);
    const pin4Ref = useRef(null);

    const [pin1, setPin1] = useState("")
    const [pin2, setPin2] = useState("")
    const [pin3, setPin3] = useState("")
    const [pin4, setPin4] = useState("")

    useEffect(() => {
        pin1Ref.current?.focus();
    },[])

    function resendOtpHandler(){

    }

  return (
    <View style={{...stylesOTP.otpContainer}}>
        <View className="flex-row">
        <View style={stylesOTP.otpInputWrap}>
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
                            </View>
                            <View style={stylesOTP.otpInputWrap}>
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
                                    }}
                                    style={stylesOTP.textInputOtp}
                                />
                            </View>
        </View>
                            
                            <Pressable className="" onPress={resendOtpHandler}>
                                <Text className="text-[#0D67CA] underline underline-offset-4 text-[14px]">Resent OTP</Text>
                            </Pressable>

                    </View>
  )
}

export default OTPField

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
        display : "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 40
    },

    otpInputWrap: {
        width: 45,
        height: 45,
        borderWidth :2,
        borderColor: '#E5E5E5',
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal:6,
        marginVertical: 15,
        backgroundColor:"#fafafa",
        borderRadius: 4
    },

    textInputOtp: {
        fontSize: 30,
        color:"#292929",
        padding:0,
        margin:0
    }
    
})