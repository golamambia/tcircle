import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  Dimensions,
  Modal,
  TouchableOpacity,
  Platform,
  Animated,
  FlatList,
  Alert,
} from 'react-native';


import InsideFormBg from '../components/InsideFormBg';
import { useFocusEffect } from '@react-navigation/native';
import ListItemTemplate from '../components/ListItemTemplate';
import theme from '../constants/theme';
import ListItemRow from '../components/ListItemRow';
import ButtonNormal from '../components/ButtonNormal';
import PoweredByMJ from '../components/PoweredByMJ';

import CustomDatePicker from '../components/CustomDatePicker';
import SearchBar from '../components/SearchBar';
import InfoMsg from '../components/InfoMsg';
import ImageLargeModal from '../components/ImageLargeModal';
import ActivityIndicatorLoader from '../components/ActivityIndicatorLoader';
import CustomerService from '../services/CustomerService';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionData } from '../constants/common';
import { useToast } from 'react-native-toast-notifications';
import getLabelLanguage from '../lang';



const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const ImageGallery = ({ navigation }) => {
  const toast = useToast();
  const getUserName = useSelector(
    state => state.currentUserDetails.userName
  );
  const [visibleIds, setVisibleIds] = useState({});
  const animationValues = useRef({}).current;

  const [searchQuery, setSearchQuery] = useState('');
  
  const [check, setCheck] = useState(1);
 
  const [loading, setLoading] = useState(false);
 const [searchResult, setSearchResult] = useState([]);
 const [modalVisiblePhoto, setModalVisiblePhoto] = useState(false);
  const [modalImagePhoto, setmodalImagePhoto] = useState('');
 const [userName,setUserName]=useState("");
  useFocusEffect(
    React.useCallback(() => {

        
        AsyncStorage.getItem(SessionData.AUTH_USERNAME).then(val => {
          console.log('userName ', val);
          setUserName(val);
         
        });
       
      },[])
    )
  
  const searchHandler=()=>{
     if(!searchQuery){
      toast.show('', {
        data: {
            isSuccess: false,
            heading: 'Alert',
            describe:'Please enter booking confirmation no!',
          },
      });
        
      }else{
    const payload={
           "BookingId" : searchQuery,
"CustCode"  : getUserName ? getUserName : userName
              }
              
              setLoading(true);
              CustomerService.getGalleryImage(payload)
                            .then(res => {
                              const result=res.COALBPSAppLoadingImageResult;
                              console.log('COALBPSAppLoadingImageResult res', JSON.stringify(res));
                              setLoading(false);
                              if (result.StatusCode=='001'  && result.Message=='Success') {
                              
                                setSearchResult(result.ImageCollection);
                              }else{
                                setSearchResult([]);
                                
                              }
                              
                            })
                          }
  }
  const bookRender = ({item}) => {
     let product_img = item._Image?item._Image:"";
 
   return (
      <View style={[styles.box_area,]} >
        <Pressable onPress={() =>{setmodalImagePhoto(product_img),setModalVisiblePhoto(true)}}>
          <View style={[styles.box,{ width:(screenWidth*0.45)}]}>
            <View style={[styles.icon_box,{width: screenWidth*0.42,
    height: screenHeight*0.21,}]}>
              {product_img != '' ? (
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{uri: product_img}}
                />
              ) : (
                <Image
                  style={styles.image} resizeMode="cover"
                  source={require('./../assets/Images/truck.png')}
                />
              )}
            </View>

            
            
          </View>
          <View style={{ width:(screenWidth*0.41),marginTop:4,alignSelf:'center'}}>
          <Text style={styles.box_text}>78</Text>
          </View>
        </Pressable>
      </View>
    );
  };
  
  return (
    <InsideFormBg paddingHorizontal={false} headerText="Image Gallery /n (इमेज गैलरी)" back={true}>
    
<View style={styles.container}>

<ScrollView contentContainerStyle={[styles.scrollContainer,searchResult.length>0?'':{flex:1}]} showsVerticalScrollIndicator={false}>

<ListItemTemplate headingText={''}>
<SearchBar
                    placeholder={'Enter booking confirmation no.'}
                    inputText={searchQuery}
                    setInputText={setSearchQuery}
                    rightIcon={true}
                    //keyboardType="number-pad"
                  />
                                
            <View style={{width:'50%',justifyContent:'center',alignItems:'center',alignContent:'center',alignSelf:'center'}}>
              <ButtonNormal disabled={loading} onPress={()=>{searchHandler()}} loading={loading}>
              {getLabelLanguage('text_search')}
              </ButtonNormal>
              </View>
        </ListItemTemplate>



  

          <View style={{marginBottom:screenHeight*0.19}}>
          
          {!loading && searchResult.length>0 && (
            <ListItemTemplate>
          
          <FlatList
                      data={searchResult}
                      renderItem={bookRender}
                      keyExtractor={(item, index) => index.toString()} 
                      numColumns={2}
                    />
                    </ListItemTemplate>
                    )}
                      {/* {loading && (
            <ListItemTemplate
          >
                <View style={{marginTop:20,marginBottom:20}}>
                  <ActivityIndicatorLoader />
                </View>
                </ListItemTemplate>
              )} */}
                    
                    
                 <ListItemTemplate
                 >
     
     <InfoMsg text={"Typing in the correct booking number in the  above field and searching will allow customers to have a view of the loaded truck at the gross weighment point. If needed, please download and retain the photo in your device. The pictures will be available only for a period of 7 days from the booking date."} />
          
          <InfoMsg text={"(सही बुकिंग नंबर को ऊपर दिए गए फ़ील्ड में टाइप करके सर्च करने  से ग्राहकों को ग्रॉस वेटमेंट पॉइंट पर लोडेड ट्रक की तस्वीर देखने का  अवसर मिलेगा। यदि आवश्यक हो, तो कृपया फोटो को डाउनलोड करके अपने डिवाइस में सुरक्षित रखें। ये तस्वीरें केवल बुकिंग तिथि से 7 दिनों तक उपलब्ध रहेंगी।"} />
          
                   </ListItemTemplate>
                 
            
         </View>

         <View style={styles.powerBy}>
<PoweredByMJ backgroundColor={false} />
</View> 
            
    </ScrollView>
    
    </View>
     
    <ImageLargeModal
          transparent={true}
          isOpen={modalVisiblePhoto}
          setIsOpen={setModalVisiblePhoto}
          headerText={''}
          imageUrl={modalImagePhoto ? modalImagePhoto : ''}
        />
   
    </InsideFormBg>
  );
};

const styles = StyleSheet.create({
  box_text: {
   
     fontFamily: theme.fonts.semiBold,
     fontWeight: theme.fontsWeight.semiBold,
     fontSize: theme.fontSizes.medium,
     lineHeight: 20,
     textAlign: 'center',
     color: '#000000',
 
     alignItems: 'center',
    // marginBottom:5
   },
  icon_box: {
    //width: 95,
   // height: 148,
    //borderWidth: 1.5,
    //borderColor: '#DA1D1F',
    borderRadius: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius:5
  },
  box_area: {
    position: 'relative',
    marginBottom:12
  },
  box: {
    //display: 'flex',
    //flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingVertical: 6,
    //paddingHorizontal: 4,
    //margin: 5,
    //width: 109,
   // height: 161,
    //backgroundColor: 'rgba(165, 162, 162, 0.05)',
   // borderWidth: 1,
    //borderColor: 'rgba(11, 116, 176, 0.1)',
    //borderRadius: 5,
   // marginBottom: 5,
  },
  powerBy:{position:'absolute',left:0,right:0,alignItems:'center',bottom:screenHeight*0.07,},
  container:{paddingHorizontal:theme.paddingHorizontal,flex:1,},
  scrollContainer:{
    position:'relative',
   // flex:1,
    
  },
  textRequiredMsg: {
    position: 'absolute',
    color: theme.colors.error,
    bottom: -12,
    paddingLeft: 2,
    fontSize: theme.fontSizes.small,
    textTransform: 'capitalize',
  },
  warnImg: {height: 24, width: 24, position: 'absolute', right: 8, top: '45%'},
  textLabel: {
    paddingLeft: 2,
    color: theme.colors.inputLabelColor,
    fontSize: theme.fontSizes.fontSize14,
    fontWeight: theme.fontsWeight.medium,
    fontFamily: theme.fonts.medium,
  },
  radioTextLabel: {
    paddingTop:8,
    //paddingLeft: 2,
    color: theme.colors.inputLabelColor,
    fontSize: theme.fontSizes.fontSize14,
    fontWeight: theme.fontsWeight.medium,
    fontFamily: theme.fonts.medium,
  },
  textField: {
    paddingVertical: 8,
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: theme.colors.inputBoxBorderColor,
    borderRadius: 5,
    fontSize: theme.fontSizes.fontSize14,
    color: theme.colors.inputTextColor,
    fontWeight: theme.fontsWeight.regular,
    fontFamily: theme.fonts.regular,
  },
  tabWrapper:{flexDirection:'row',justifyContent:'center',alignItems:'center',alignContent:'center'},
  image100:{width:'100%',height:'100%'},
  rightBorderWidth:{borderRightWidth:2,borderRightColor:'#FFFFFF',},
  tabInnerBox:{flexDirection:'row',alignSelf:'center'},
  tabBox:{flex:1,backgroundColor:theme.colors.primary,borderTopColor:'#FFFFFF',borderTopWidth:2,
    justifyContent:'center',alignItems:'center',
    alignSelf:'center', paddingVertical:8,},
  labelText:{fontSize:theme.fontSizes.small,
    fontWeight:theme.fontsWeight.semiBold,
    fontFamily:theme.fonts.semiBold,color:'#FFFFFF',
  lineHeight:16,
  paddingVertical:4,
  paddingHorizontal:8
  },
  mainDiv:{marginTop:12,marginBottom:screenHeight*0.19},
  borderLine:{borderTopColor:'#DFDFDF',borderTopWidth:1,marginTop:8,paddingTop:8,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:2,paddingBottom:4},
  textUnderLine:{fontSize:theme.fontSizes.fontSize14,fontWeight:theme.fontsWeight.semiBold,fontFamily:theme.fonts.semiBold,
    textAlign:'center',lineHeight:17,color:theme.colors.primary,textDecorationLine:'underline',
    textDecorationStyle:'solid',
  },
});

export default ImageGallery;
