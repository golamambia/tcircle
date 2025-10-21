import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

const ButtonGradient = ({children, onPress, disabled=false, loading=false}) => {
    const isDisabled = () => {
        return disabled?"bg-[#75b2f8]" : "bg-[#0D66CA]"
      }
    
      const btnPressed = () => {
        if(disabled){
    
        } else {
          onPress()
        }
      }
    
      return (
        <TouchableOpacity disabled={disabled || loading} onPress={btnPressed} className="flex-1 justify-center relative">
            <LinearGradient start={{x: 0.0, y: 0.0}} end={{x: 0.0, y: 1.0}} colors={['#FF1933', '#FF1933', '#FF1933']} useAngle={true} angle={45} className="h-11 justify-center rounded-full">
                <Text className="text-[#FFFFFF] text-[17px] text-center font-bold tracking-widest" >{children}</Text>
                {loading && <ActivityIndicator size={'large'} color={"#d2d2d2"} className="absolute right-4"  />}
            </LinearGradient>
        </TouchableOpacity>
      )
}

export default ButtonGradient

const styles = StyleSheet.create({})