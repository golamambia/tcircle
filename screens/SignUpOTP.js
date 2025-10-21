import React, {useState, useRef, useEffect} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
 
 
import ButtonRounded from '../components/ButtonRounded';

const SignUpOTP = ({navigation}) => {

    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [notificationCheckBox, setNotificationCheckBox] = useState(false)

    const pin1Ref = useRef(null);
    const pin2Ref = useRef(null);
    const pin3Ref = useRef(null);
    const pin4Ref = useRef(null);

    const [pin1, setPin1] = useState("")
    const [pin2, setPin2] = useState("")
    const [pin3, setPin3] = useState("")
    const [pin4, setPin4] = useState("")

    useEffect(() => {
        pin1Ref.current.focus();
    },[])

  return (
    <ScrollView>
        <View className="bg-[#FAFAFA] px-4 flex-1 h-full w-full relative justify-between items-center pb-4 pt-2">
            {/* Adani logo section */}
            <View className="bg-white rounded-b-full w-full flex flex-row justify-center items-center pb-8">
                <Image source={require("./../assets/Images/Adani_Cement_Logo.png")} className="h-28 w-28 mt-5" />
            </View>

            {/*  */}
            <View className="w-full space-y-3 flex flex-col flex-1">
                <View className="w-full flex justify-center items-center py-4">
                    <Text className="text-3xl text-center font-bold text-[#1E1E1E]" style={styles.fontFamily}>Signup to explore</Text>
                   
                    <Text className="font-bold" style={styles.fontFamily}>RewardsConnect</Text>
                     
                </View>
                {/* bg-gradient-to-r from-[#2A5E9E] via-[#9C3F8D] to-[#BD3881] */}
                <View className="w-full flex justify-center items-center flex-col space-y-2 flex-1">
                    <Text className="text-center text-[18px] text-[#222222] tracking-wider font-semibold" style={styles.fontFamily}>Please enter the OTP sent to your registered mobile 91-XXXXXXXXXX</Text>
                        
                    <View style={{...styles.otpContainer}}>
                        <View style={styles.otpInputWrap}>
                            <TextInput
                                ref={pin1Ref}
                                keyboardType={'number-pad'}
                                maxLength={1}
                                onChange={(pin) => {
                                    setPin1(pin);
                                    if(pin !== ""){
                                        pin2Ref.current.focus();
                                    }
                                }}
                                style={styles.textInputOtp}
                                />
                        </View>
                        <View style={styles.otpInputWrap}>
                            <TextInput
                                ref={pin2Ref}
                                keyboardType={'number-pad'}
                                maxLength={1}
                                onChange={(pin) => {
                                    setPin2(pin);
                                    if(pin !== ""){
                                        pin3Ref.current.focus();
                                    }
                                }}
                                style={styles.textInputOtp}
                                />
                        </View>
                        <View style={styles.otpInputWrap}>
                            <TextInput 
                                ref={pin3Ref}
                                keyboardType={'number-pad'}
                                maxLength={1}
                                onChange={(pin) => {
                                    setPin3(pin);
                                    if(pin !== ""){
                                        pin4Ref.current.focus();
                                    }
                                }}
                                style={styles.textInputOtp}
                            />
                        </View>
                        <View style={styles.otpInputWrap}>
                    <TextInput
                        ref={pin4Ref}
                        keyboardType={'number-pad'}
                        maxLength={1}
                        onChange={(pin) => {
                            setPin4(pin);
                        }}
                        style={styles.textInputOtp}
                    />
                        </View>

                    </View>
                    <View className="mb-4">
                        <Text className="text-[#222222] font-semibold text-[16px]" style={styles.fontFamily}>Didn't receive the OTP? <Text className="font-bold underline">Resend Now</Text></Text>
                    </View>
                </View>
            </View>

            {/* button section */}
            <View className="w-full mt-8 flex-1">
                <View className="w-full flex flex-row items-center">
                     
                    <Text className="mb-2 text-[16px] text-[#1E1E1E] mt-2">I accept the <Text className="text-[#222222] font-bold">Terms of Use</Text> & <Text className="text-[#222222] font-bold">Privacy Policy</Text></Text>
                </View>
                <View className="w-full flex flex-row items-center mb-2">
                    
                    <Text className="mb-2 text-[16px] text-[#1E1E1E] mt-2">I wish to receive notifications on WhatsApp</Text>
                </View>
                <ButtonRounded onPress={() => navigation.navigate("SignIn")}>Submit</ButtonRounded>
            </View>
        </View>
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
        fontFamily: 'Adani-Regular'
      },
      otpContainer : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 40
    },

    otpInputWrap: {
        width: 70,
        height: 70,
        borderWidth :2,
        borderColor: '#CECECE',
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal:6,
        marginTop: 30
    },

    textInputOtp: {
        fontSize: 30,
        color:"#292929",
        padding: 8,
        margin:8
    }
    
})

export default SignUpOTP;