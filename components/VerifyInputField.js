import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React from 'react'
import ButtonGradient from './ButtonGradient'

const VerifyInputField = ({fieldName, required, value, setValue, check, errorMsg="Invalid Entry", onVerify}) => {

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

  return (
    <View className="relative mb-2">
        <Text className="mb-2 text-sm text-[#1E1E1E] font-normal text-[16px]" style={styles.fontFamily}>{fieldName}{isRequired()}</Text>
        <View className="flex-row justify-between">
            <View className="w-[70%]">
                {value && <Image source={require("./../assets/Images/checked.png")} className="h-6 w-6 absolute right-2 top-[26%]" />}
                {!value && check>1 && <Image source={require("./../assets/Images/warning.png")} className="h-6 w-6 absolute right-2 top-[26%]" />}
                <TextInput className="py-2 px-2 border border-slate-300 rounded-sm relative text-black" style={{...isValid(value), color: '#333'}} onChangeText={(val) => setValue(val)} value={value} />
                {check>1 && !value && <Text className="absolute text-[#ED2F2F] tracking-widest -bottom-5">{errorMsg}</Text>}
                {/* {check>1 && !value && <Text className="absolute text-[#ED2F2F] tracking-widest -bottom-5">{`Entered ${fieldName} is invalid`}</Text>} */}
            </View>
            <View className="w-[23%]">
                <ButtonGradient onPress={onVerify}>Verify</ButtonGradient>
            </View>
        </View>
    </View>
  )
}

export default VerifyInputField

const styles = StyleSheet.create({})