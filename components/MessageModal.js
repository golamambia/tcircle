import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Pressable, Image, Modal, FlatList, ScrollView} from "react-native"
import { XCircleIcon } from "react-native-heroicons/outline";
import ButtonRounded from './ButtonRounded';
import ButtonGradient from './ButtonGradient';
import ButtonNormal from './ButtonNormal';

const MessageModal = ({open, setOpen, messageEnglish, messageHindi, heading, icon, onClose}) => {

    const [selected, setSelected] = useState({id:"", title:""});
    const bgColor = (title) => {
      return selected.title == title?"bg-[#F3FFFF]" : "bg-white"
    }

    function onCloseModal(){
      setOpen(false)
      onClose()
    }


  return (
    <View style={styles.centeredView}>
        <Modal
        animationType="fade" 
        transparent={true}
        visible={open}
        onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setOpen(!open);
        
        }}>
         <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.65)'}}>
          <View className="" style={{
            // height: `${(modalOptions.length*11)+15}%`,
            height: `60%`,
            width: '98%',
            opacity:1,
            marginBottom: 'auto',
            marginTop:'auto',
            borderRadius: 4,
            backgroundColor:'#fff',
            alignSelf: 'center',
            position: "relative",
            paddingBottom:"22%"
            // backgroundColor:'blue'
          }}>
              <View className="pt-4 px-4">
                <View className="flex-row justify-between items-center border-b-[1px] border-slate-100">
                  <Text className="font-semibold text-[18px] text-[#333]">{heading}</Text>
                  <Pressable onPress={()=>setOpen((p) => !p)}><XCircleIcon color="#444" size={30} /></Pressable>
                </View>
                {/* <ScrollView></ScrollView> */}
               
                  <View  className="py-4 h-[400px] flex-col gap-4">
                      <Text className="text-[16px]" style={{color:"#333"}}>{messageEnglish}</Text>
                      <Text className="text-[16px]" style={{color:"#333"}}>{messageHindi}</Text>
                  </View>

                <View className="mt-4 absolute -bottom-[18%] right-[45%] w-[20%] rounded-md">
                  <ButtonNormal bgColor="#333" onPress={onCloseModal}>Close</ButtonNormal>
                </View>
              </View>
          </View>
        </View> 
    </Modal>
  </View>
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

export default MessageModal