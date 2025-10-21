import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, Image, StyleSheet, Pressable} from 'react-native';
import { EyeIcon } from "react-native-heroicons/solid";


const InputFieldPassword = ({fieldName, required, value, setValue, check, errorMsg="Invalid Entry"}) => {

    const [showPassword, setShowPassword] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState("")

    const isRequired = () => {
        if(required===true){
            return (
                <Text className="text-red-600">{" "}*</Text>
          )
        }
        
    }

    const isValid = (value) => {
        if(value){
            return {
                borderColor:'#4BB543',
                borderWidth: 1
            }
        }
        if(check > 1){
            return {
                borderColor:'#F21616',
                borderWidth: 1
            }
        }
    }

    const showPasswordHandler = () => {
        setShowPassword((p) => !p)
    }
 
  return (
    <View className="relative mb-2">
        <Text className="mb-2 text-sm text-[#1E1E1E] font-normal text-[16px]" style={styles.fontFamily}>{fieldName}{isRequired()}</Text>
        {/* {value && <Image source={require("./../assets/Images/checked.png")} className="h-6 w-6 absolute right-2 top-[53%]" />} */}
        {/* {!value && check>1 && <Image source={require("./../assets/Images/warning.png")} className="h-6 w-6 absolute right-2 top-[53%]" />} */}
        <TextInput secureTextEntry={!showPassword} className="py-2 px-2 border border-slate-300 rounded-sm relative" style={{...isValid(value),  color: '#000'}} onChangeText={(val) => setValue(val)} value={value} />
        {check>1 && !value && <Text className="absolute text-[#ED2F2F] tracking-widest -bottom-5">{errorMsg}</Text>}
        {/* {check>1 && !value && <Text className="absolute text-[#ED2F2F] tracking-widest -bottom-5">{`Entered ${fieldName} is invalid`}</Text>} */}
        <Pressable className="absolute bottom-2.5 right-3" onPress={showPasswordHandler}><EyeIcon color="red" fill={!showPassword?"gray":"black"} size={24} className="absolute" /></Pressable>
    </View>
  )
}

export default InputFieldPassword

const styles = StyleSheet.create({
    fontFamily: 'Adani-Regular'
})