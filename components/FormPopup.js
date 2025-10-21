import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Pressable, Image, Modal, FlatList, ScrollView} from "react-native"
import { XCircleIcon } from 'react-native-heroicons/outline';
import theme from '../constants/theme';


const FormPopup = ({open, setOpen, children, heading, transparent}) => {


  return (
    <View style={styles.centeredView}>
        <Modal
        animationType="fade" 
        transparent={transparent}
        visible={open}
        onRequestClose={() => {
        
        setOpen(!open);
        
        }}>
         <View style={{flex:1, 
          backgroundColor:'rgba(0,0,0,0.65)'
          }}>
          <View className="" style={{
            // height: `${(modalOptions.length*11)+15}%`,
            width: '90%',
            opacity:1,
            marginBottom: 'auto',
            marginTop:'auto',
            borderRadius: 8,
            backgroundColor:'#fff',
            alignSelf: 'center',
            position: "relative"
            // backgroundColor:'blue'
          }}>
            
              <View style={styles.modalHeader}>
                      <View style={{flex: 1}}>
                      
                     
                        <Text style={styles.text}>
                        {heading}
                        </Text>
                   
                        
                          <View style={{position:'absolute',right:15,top:0 }}>
                          <Pressable onPress={() => {
                            setOpen((p) => !p)
                           
                            }}>
                           <XCircleIcon color="#B8B9BB" size={26} />
                          </Pressable>
                          </View>
                        
              
                        
                      </View>
                      
                    </View>
              <View style={{paddingHorizontal:16}} >
                               
               
                  <View  style={{paddingVertical:16}} >
                      {children}
                  </View>

                 
              </View>
          
        </View> 
      </View>
    </Modal>
  </View>
  )
}

const styles = StyleSheet.create({
  modalHeader:{flexDirection:'row',
    borderTopLeftRadius:8,borderTopRightRadius:8,
      backgroundColor:theme.colors.primary,position:'relative',paddingVertical:16},
  text: {
    color: '#FFFFFF',           
    //textAlign: 'center',       
    fontFamily: theme.fonts.semiBold,           
    fontWeight: '600',       
    fontSize: 18,             
    lineHeight: 18,
    //paddingVertical:12 
    paddingTop:4,
    paddingLeft:16          
  },
    centeredView: {
      //flex: 1,
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

export default FormPopup