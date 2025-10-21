import React from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Image} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { launchImageLibrary } from 'react-native-image-picker';


const CustomImagePicker = ({fieldName, image, setImage}) => {

  const uploadImageHandler = () => {
    console.log("Hi!!")
  }

  // const choosePhotoFromLibrary = () => {
  //   ImagePicker.openPicker({
  //     width:400,
  //     height: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //   }).then(image => {
  //     console.log("IMAGE", image);
  //     setImage(image);
  //     this.bs.current.snapTo(1);
  //   }).catch(err => {
  //     console.log("Error", err)
  //   });
  // }

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        console.log("image res", response)
        if(!response.didCancel){
          setImage(response.assets[0]);
        }
       
      }
    });
  };


  return (
    <View className="mb-2">
        <Text className="mb-2 text-sm text-[#1E1E1E] font-normal text-[16px]" style={styles.fontFamily}>{fieldName}</Text>
        <View className="flex px-2 flex-row py-2 border border-slate-300 rounded-sm relative justify-between items-center">
            {!image && <Text className="mr-1 text-sm text-[#1E1E1E] font-normal text-[16px] w-[75%]">{image.path}</Text>}
            {image && <Image source={{ uri: image.uri }} className="mr-1 text-sm text-[#1E1E1E] font-normal text-[16px] w-[75%] h-10"/>}
            <TouchableOpacity onPress={handleChoosePhoto} className="my-auto ml-1 self-end"><Text className="bg-[#75b2f8] p-3 text-white font-semibold tracking-wider rounded">Upload</Text></TouchableOpacity>
        </View>
    </View>
    
  )
}


const styles = StyleSheet.create({
    fontFamily: 'Adani-Regular'
})

export default CustomImagePicker