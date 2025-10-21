import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Animated, { FadeInUp, FadeOutUp, } from "react-native-reanimated";
import { CheckCircleIcon, XCircleIcon } from "react-native-heroicons/solid";

const CustomToast = ({isSuccess=true, setShowToast, heading, describe}) => {
    return(
        <Animated.View
            entering={FadeInUp}
            exiting={FadeOutUp}
            style={{
                //left:'4%',
                bottom: 60,
                backgroundColor: isSuccess ? '#13A180' : '#FF0000',
                width: '95%',
                position: 'absolute',
                borderRadius: 5,
                padding: 4,
                paddingHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                shadowColor: isSuccess ? '#13A180' : '#FF0000',
                shadowOpacity: 0.7,
                shadowRadius: 2,
                shadowOffset: {width: 0, height: 1},
                elevation: 2,
            }}
        >
            {/* {isSuccess && <Image source={require("./../assets/Images/Check-Circle.png")} className="w-7 h-7"  />} */}
            {isSuccess && <CheckCircleIcon size={25} color="#fff" />}
            {/* {!isSuccess && <Image source={require("./../assets/Images/Check-Circle.png")} className="w-7 h-7"  />} */}
            {!isSuccess && <XCircleIcon size={25} color="#fff" />}
            <View>
                <Text style={{
                    color: '#F6F4F4',
                    fontWeight: '500',
                    marginLeft: 10,
                    fontSize: 16,
                    letterSpacing: 1
                }}>{heading}</Text>
                <Text style={{
                    color: '#F6F4F4',
                    fontWeight: "400",
                    marginLeft: 10,
                    fontSize: 13,
                    paddingVertical: 5,
                    letterSpacing:0.5
                }}>{describe}</Text>
                
            </View>
            {/* setShowToast((p) => !p) */}
            <Pressable onPress={() => ''} style={{position:'absolute',right:8,top:12,height:12,width:12}} className="absolute right-2 top-3 h-3 w-3">
                  <Image source={require("./../assets/Images/cross.png")} />
            </Pressable>
        </Animated.View>
    )
}

export default CustomToast;
