import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, Pressable, Image, Modal, FlatList, TextInput, ScrollView} from "react-native"
import { XCircleIcon } from "react-native-heroicons/outline";
import ButtonRounded from './ButtonRounded';
import ButtonGradient from './ButtonGradient';
import { launchImageLibrary } from 'react-native-image-picker';
import InputField from './InputField';

const KycModal = ({openKyc, setOpenKyc, heading, type, frontImage, setFrontImage, setBackImage, backImage, onPress, forPan=false, panNo="", setPanNo="", loading=false}) => {

    function selectPhotoHandler(){
        launchImageLibrary({ noData: true }, (response) => {
          // console.log(response);
          if (response) {
            console.log("image res", response)
            if(!response.didCancel){
              if(type !== 'pan'){
                if(!frontImage)
                setFrontImage(response.assets[0]);
                if(frontImage && !backImage)
                  setBackImage(response.assets[0])
              } else {
                setFrontImage(response.assets[0])
              }
             
            }
           
          }
        }).catch(err => {
          console.log("ERR", err)
        });
    }


  return (
    <View style={styles.centeredView} className="absolute">
        <Modal
        animationType="slide" 
        transparent={true}
        visible={openKyc}
        onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setOpenKyc(!openKyc);
        
        }}>
         <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.65)'}}>
          <View className="" style={{
            // height: `${(modalOptions.length*11)+15}%`,
            // height: `80%`,
            width: '98%',
            opacity:1,
            marginTop: 'auto',
            borderTopLeftRadius: 13,
            borderTopRightRadius:13,
            borderBottomLeftRadius: 13,
            borderBottomRightRadius:13,
            backgroundColor:'#fff',
            alignSelf: 'center',
            paddingVertical: 20
          }}>
              <View className="pt-4 px-4">
                <View className="flex-row justify-between items-center">
                  <Text className="font-semibold text-[18px] text-[#333333]">{heading}</Text>
                  <Pressable onPress={()=>setOpenKyc((p) => !p)}><XCircleIcon color="#444" size={30} /></Pressable>
                </View>
                <View className="py-4 flex-col justify-between h-[93%]">
                  <View>
                    {forPan== true && <View className="p-2">
                       <InputField fieldName="PAN" required={true} setValue={setPanNo} value={panNo} />
                    </View>}
                    <View className="flex-row justify-center items-center p-2">
                        <Pressable onPress={() => {}} className="mx-2 py-5 rounded-md bg-[#a5a2a219] flex-col justify-center items-center w-[22%]">
                            <Image source={(require("./../assets/Images/camera_upload.png"))} />
                        </Pressable>
                        {/* <CustomImagePicker fieldName="Upload Back Image" image={backImage} setImage={setBackImage} /> */}
                        <Pressable onPress={selectPhotoHandler} className="mx-2 py-5 rounded-md bg-[#a5a2a219] flex-col justify-center items-center w-[22%]">
                            <Image source={(require("./../assets/Images/image.png"))} />
                        </Pressable>
                    </View> 
                    <View className="p-2">
                       <Text className="text-sm text-slate-400">Please use camera to capture image or upload from
                        gallery. Image should be jpg or pdf format within 4 MB
                        size</Text>
                    </View>
                    <View className="p-2">
                       <Text className="text-xl py-2 text-[#333333]">Preview upload files</Text>
          
                      
                      <View className="max-h-32 w-auto rounded-md mb-2">
                        {frontImage && <Image source={{ uri: frontImage.uri }} className="mr-1 w-[75%] h-[100%] bg-red-400 rounded"/>}
                        {frontImage && <Pressable onPress={() => setFrontImage("")} className="absolute right-20 -top-1.5"><Image source={require("./../assets/Images/x-mark.png")} /></Pressable>}
                      </View>
                      <View className="max-h-32 w-auto rounded-md">
                        {backImage && <Image source={{ uri: backImage.uri }} className="mr-1 w-[75%] h-[100%] bg-red-400 rounded"/>}
                        {backImage && <Pressable onPress={() => setBackImage("")} className="absolute right-20 -top-1.5"><Image source={require("./../assets/Images/x-mark.png")} /></Pressable>}
                      </View>
                    </View>         
                  </View>
                    {/* <View className="absolute bottom-16 w-[100%]"> */}
                  <View className="w-[100%]">
                    <ButtonGradient disabled={(forPan && !frontImage && !panNo) ? true : false } loading={loading} onPress={onPress}>Continue</ButtonGradient>
                  </View>
                    {/* </View> */}
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

export default KycModal