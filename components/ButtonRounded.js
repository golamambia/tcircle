import React from 'react'
import {Pressable, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ButtonRounded = ({children, onPress, disabled}) => {

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
    <TouchableOpacity className={"w-full py-4 rounded-full "+isDisabled()} onPress={btnPressed}>
        <Text className="text-white text-center font-medium text-base tracking-widest" style={styles.fontFamily}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  fontFamily: {
      fontFamily: 'Adani-Regular'
  }
})

export default ButtonRounded