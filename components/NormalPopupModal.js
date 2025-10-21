import { StyleSheet, Text, View, Pressable, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import ButtonGradient from './ButtonGradient'
import RenderHTML from 'react-native-render-html'
import { Modal } from 'react-native-paper'
import { CheckCircleIcon, XCircleIcon } from 'react-native-heroicons/outline'
import PointsAccordion from './PointsAccordion'

const NormalPopupModal = ({open, setOpen, heading,body, renderHtml=false, source=[{
  title: "",
  htmlKey : {
  html: `<p></p>`
}}]}) => {
  const { width } = useWindowDimensions();

  return (
   
    <Modal transparent={true} visible={open} animationType="slide">
    <View  >
      <View
        style={{
          width: '95%',
          //height: '95%',
          opacity: 1,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          backgroundColor: '#fff',
          alignSelf: 'center',
          margin: 10,
   
          marginTop: '5%',
        }}
      >
        <View style={{ padding: 2, borderRadius: 5, backgroundColor: 'white' }}>
         
          <View className="flex-row p-2 mb-[15px] border-b-[1px] border-[#E5E5E5]">
            <View style={{ flex: 1 }}>
            <Text className="text-[#000000]  font-semibold text-[18px]  "
                style={styles.fontFamily}>{heading}</Text>
            </View>
            <View style={{ flex: 1 }}>
            <Text className="text-right"><Pressable onPress={()=>setOpen((p) => !p)}><XCircleIcon  color="#000000"  /></Pressable></Text> 
              
            </View>
          </View>
<View className="pl-4">


<View className="flex-row mb-[5px]">
                      <View className="flex-1 flex-row">
                        {!renderHtml && <Text className="text-[#333333] text-[16px]  font-sans">
                        {body}
                        </Text>}
                        {renderHtml && <View className="px-3">
                            {source.length == 1 && <RenderHTML
                            contentWidth={width}
                            source={source[0].htmlKey}
                          />}
                          {source.length > 1 && source.map((item, index) => (
                              <PointsAccordion key={index} title={item.title}>
                                <RenderHTML
                                contentWidth={width}
                                source={item.htmlKey}
                              />
                              </PointsAccordion>
                          ))}
                        </View>}
                       
                      </View>

                      
                    </View>
                  
                    
                    





<View className="w-full pt-[40px] pb-[50px] pr-[10px]">

                  <ButtonGradient onPress={()=>setOpen((p) => !p)}>
                    Okay
                  </ButtonGradient>
                </View>

</View>



        </View>
      </View>
    </View>
  </Modal>
 
    )
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor:"#000"
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
      }
  });
export default NormalPopupModal
 