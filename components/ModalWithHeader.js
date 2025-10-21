import { StyleSheet, Text, View, ScrollView, Pressable, Modal } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import RenderHTML from 'react-native-render-html'
import { XCircleIcon } from 'react-native-heroicons/outline'

const ModalWithHeader = ({transparent=true, headerText, isOpen, setIsOpen, source=false, renderHtml=false, contentText}) => {
  return (
    <Modal transparent={transparent} visible={isOpen} animationType="fade" >
           
           <View style={{backgroundColor:'rgba(0,0,0,0.65)',flex:1,justifyContent: 'center',
       alignItems: 'center',}} >
             <View style={{
               
               height: `70%`,
               width: '95%',
               opacity:1,
                
               borderTopLeftRadius: 13,
               borderTopRightRadius:13,
               borderBottomLeftRadius: 13,
               borderBottomRightRadius:13,
               backgroundColor:'#fff',
               alignSelf: 'center',
               margin:10,
             }}>
               <View className=" w-[100%]  flex">
               
                
                 <LinearGradient
                   start={{x: 0.0, y: 0.0}}
                   end={{x: 0.0, y: 1.0}}
                   angle={145}
                   useAngle={true}
                   
                   colors={['#0A3C69', '#425551']}
                   className="h-11 py-2 rounded-tr-[5px] rounded-tl-[5px]" >
                    <View className="flex-row  ">
                       
                       <View style={{flex:2}} className="pl-2">
                       
                       <Text
                     className="text-white text-left ml-2 font-medium text-[20px] text-base tracking-widest"
                     style={styles.fontFamily}>{headerText}
                       </Text>
                       </View>
                       <View style={{flex:.5}}>
                       <Pressable onPress={()=>setIsOpen(false)}><XCircleIcon  color="white" style={{alignSelf:'flex-end',marginRight:10}} /></Pressable>
                       
                       </View>
                       </View>
                    
                 </LinearGradient>
               </View>
               <ScrollView>
               <View className="items-center flex-1 p-4">
              
              <View className="flex flex-col space-y-5 justify-start items-start w-full">
               

               
              {renderHtml && source.map((item, index) => (
                              
                              <View className="px-3" key={index}>
                                <RenderHTML
                                contentWidth={299}
                                source={item.htmlKey}
                              />
                             </View>
                          ))}

            
                {!renderHtml &&
                    <Text style={{color: "#333", letterSpacing: 1.05}}>{contentText}</Text>
                }
  

              

                </View>
                
                </View>
                </ScrollView>

                </View>
                </View>
                </Modal>
  )
}

export default ModalWithHeader

const styles = StyleSheet.create({
    fontFamily: {
        fontFamily: 'Adani-Regular',
      },
})