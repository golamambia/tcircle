import React from 'react'
import {View} from 'react-native'

const Card = ({children}) => {
  return (
    <View className={"flex-col px-3 justify-center w-[90%] self-center bg-white rounded-xl shadow-lg py-4"}>
        {children}
    </View>
  )
}

export default Card