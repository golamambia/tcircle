import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Pressable, Image, Modal, FlatList, ScrollView} from "react-native"
import { XCircleIcon } from "react-native-heroicons/outline";
import ButtonNormal from './ButtonNormal';
import ButtonWhite from './ButtonWhite';
import theme from '../constants/theme';

const YesNoModal = ({open, setOpen, question, heading, onResponse,yesText='',noText=''}) => {

  const splitText = question.split('/n');
    function responseHandler(response){
        onResponse(response)
        setOpen(false)
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
            //height: `24%`,
            width: '80%',
            opacity:1,
            marginBottom: 'auto',
            marginTop:'auto',
            borderRadius: 4,
            backgroundColor:'#fff', 
            alignSelf: 'center',
            position: "relative"
            // backgroundColor:'blue'
          }}>
            <View style={styles.modalHeader}>
                                  <View style={{flex: 1}}>
                                  
                                 
                                    <Text style={styles.textHeader}>
                                    {heading}
                                    </Text>
                               
                                    
                                      <View style={{position:'absolute',right:15,bottom:0 }}>
                                      <Pressable onPress={() => {
                                        setOpen((p) => !p)
                                       
                                        }}>
                                       <XCircleIcon color="#B8B9BB" size={26} />
                                      </Pressable>
                                      </View>
                                    
                          
                                    
                                  </View>
                                  </View>
              <View style={{paddingHorizontal:20,paddingTop:12}} className="pt-4 px-4">
                
                
               
                  <View  >
                      <Text style={styles.text}>{splitText[0]}</Text>
                      {splitText[1] &&
                                <Text style={styles.subtext}>
                                  {splitText[1]}
                                </Text>
                        }
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
               <View style={{width:'47%'}}>
                 <ButtonWhite onPress={() => responseHandler("yes")}>
                 {yesText}
                 </ButtonWhite>
               </View>
               <View style={{width:'47%'}}>
                <ButtonNormal onPress={() => responseHandler("no")}>
                {noText}
                </ButtonNormal>
              </View>
              </View>
                
              </View>
          </View>
        </View> 
    </Modal>
  </View>
  )
}

const styles = StyleSheet.create({
  subtext: {
    color: '#595858',           
    textAlign: 'center',       
    fontFamily: theme.fonts.regular,           
    fontWeight: '400',       
    fontSize: 16,             
    lineHeight: 19,
    paddingTop:4        
  },
  modalHeader:{flexDirection:'row',
  
      position:'relative',
      paddingTop:16
    },
    textHeader: {
      color: '#323030',           
      textAlign: 'center',       
      fontFamily: theme.fonts.semiBold,           
      fontWeight: '600',       
      fontSize: 16,             
      lineHeight: 19,
      //paddingVertical:12 
      paddingTop:4,
      paddingLeft:16          
    },
  text: {
    color: '#595858',           
    textAlign: 'center',       
    fontFamily: theme.fonts.regular,           
    fontWeight: '400',       
    fontSize: 14,             
    lineHeight: 20,
    //paddingVertical:12 
    paddingBottom:16,
    paddingLeft:16          
  },
    centeredView: {
     // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      //backgroundColor:"#000"
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

export default YesNoModal