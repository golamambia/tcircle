import { StyleSheet, Text, View, ScrollView, Pressable, Modal,Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'

import { XCircleIcon } from 'react-native-heroicons/outline'

 

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const ImageLargeModal = ({transparent=true, headerText, isOpen, setIsOpen, imageUrl}) => {
  //console.log('imageUrl',imageUrl)
  const shortenText=(text, maxLength)=> {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  }
  
  
  return (<View>
<Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() =>setIsOpen(!isOpen)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() =>setIsOpen(!isOpen)}>
             
            <XCircleIcon  color="white" style={styles.closeIcon} />
          </TouchableOpacity>
          {
                            imageUrl!=''?
         (
         // <Image style={styles.enlargedImage}  
        //               source={{ uri: imageUrl  }}
        //             />was h:.75
        <View style={{ width: screenWidth * 0.90, height: screenHeight * 0.8 }}>
        {/* <ImageViewer imageUrls={images} style={styles.enlargedImage} backgroundColor="rgba(0, 0, 0, 0.7)"
        renderArrowLeft={() => null}
        renderArrowRight={() => null}
        renderIndicator={() => null}
        enableSwipeDown={true}
        onSwipeDown={() => setIsOpen(false)}
        /> */}
        <Image style={styles.enlargedImage} source={{uri: imageUrl}} />
        </View>
        ):(
                  //   <Image style={styles.enlargedImage}  
                  //   source={require('./../assets/Images/truck.png')}
                  // />
                 null
                  )}
        </View>
      </Modal>
  </View>
  )
}

export default ImageLargeModal

const styles = StyleSheet.create({
    fontFamily: {
        fontFamily: 'Adani-Regular',
      },
     
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex:9999
    },
    closeIcon: {
      width: 30,
      height: 30,
    },
    enlargedImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'stretch',
      
    },
})