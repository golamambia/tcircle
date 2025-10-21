import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Dimensions,
  Alert,
  BackHandler,
  Linking,
} from 'react-native';
 

import FormBackground from '../components/FormBackground';

import {useFocusEffect} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import ButtonNormal from '../components/ButtonNormal';
import ButtonWhite from '../components/ButtonWhite';
import theme from '../constants/theme';
import PoweredByMJ from '../components/PoweredByMJ';
import CoalengineImage from '../components/CoalengineImage';
import usePushNotification from '../store/hook/usePushNotification';
import { SessionData } from '../constants/common';
import YesNoModal from '../components/YesNoModal';
import { env } from '../configs/EnvironmentConfig';
import getLabelLanguage from '../lang';
import { navigationRef } from '../navigation/NavigationService';
//import { env } from '../configs/EnvironmentConfig';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const SignIn = ({route, navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const getProductID = useSelector(
    state => state.currentUserDetails.productID
  );
  useEffect(() => {
    //console.log('signup hit');
    AsyncStorage.getItem(SessionData.AUTH_TOKEN).then(token => {
      console.log('token signup AAAAAAAAAAAAAA', token);
      if (token != null) {
        if(getProductID){
         // navigation.replace('Dashboard');
        }else{
          //navigation.replace('CustomerDetail');
        }
        
      }
    });

 
  }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', e => {
  //     console.log('event', e.data.action.type);
  //     if (e.data.action.type === 'REPLACE') {
  //       return;
  //     }
  //     e.preventDefault();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent('parentDrawer').setOptions({
        headerShown: false,
      });
      
    }, []),
  );

  
  const signInHandler = () => {
    //navigation.replace('PreSignIn');
    //navigation.navigate('PreSignIn');
    navigationRef.reset({
                index: 0,
                routes: [{ name: 'PreSignIn' }],
              });
  }
  
  useFocusEffect(
    useCallback(() => {
      
      // const listenToNotifications = () => {
      //   try {
      //     console.log('^^^^^^^^^^^^^^^^^^^^^^^');
      //     getFCMToken();
      //     requestUserPermission();
      //     //onNotificationOpenedAppFromQuit();
      //     //listenToBackgroundNotifications();
      //     //listenToForegroundNotifications();
      //     //onNotificationOpenedAppFromBackground();
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };

      // listenToNotifications();
    }, []),
  );
  function onResponse(res) {
              console.log('res',res);
              if (res == 'yes') {
                BackHandler.exitApp()
              } else {
                setOpenModal(false);
              }
    }
useFocusEffect(
          useCallback(() => {
            const backAction = () => {
              //console.log("Back button pressed on Dashboard!");
              setOpenModal(true); // Open modal only on Dashboard
              return true; // Prevent default back behavior
            };
      
            const subscription = BackHandler.addEventListener(
              "hardwareBackPress",
              backAction
            );
      
            return () => subscription.remove(); // Cleanup when leaving Dashboard
          }, [])
        );
        const openLink = () => {
          
          Linking.openURL(env.REG_URL).catch(err => console.error("Failed to open URL:", err));
        };
        
  return (
   
      <FormBackground>

        <View style={styles.mainBox}>
        <CoalengineImage logo={true} />
         
        <View style={styles.textDiv}>
          {/* <Text style={styles.textWelcome} >Welcome</Text> */}
          <Text style={styles.textIndutry} >Stay with trusted families worldwide</Text>
        </View>

                  

            <View style={{marginTop:12}}>
              <ButtonNormal onPress={signInHandler}>
              Log In
              </ButtonNormal>
              <View style={{marginTop:screenHeight*0.008,}}>
              <ButtonWhite onPress={()=>navigation.navigate("SignUp")} >
              Sign Up
              </ButtonWhite>
              </View>
            </View>
             
          </View>
       
        {/* <PoweredByMJ /> */}
        {openModal &&
    <YesNoModal
         heading={'ALERT!'}
         question={'Are you sure you want to exit ?'}
         open={openModal}
         setOpen={setOpenModal}
         onResponse={onResponse}
         yesText={'YES'}
         noText={'No'}
       />
    } 
      </FormBackground>
    
  );
};

const styles = StyleSheet.create({

  textIndutry:{fontSize:theme.fontSizes.fontSize16,lineHeight:17,
    fontWeight:"900",fontFamily:theme.fonts.regular,textAlign:'center',color:'#595858',marginTop:15},
  textWelcome:{fontSize:theme.fontSizes.fontSize26,lineHeight:26,
    fontWeight:'700',fontFamily:theme.fonts.bold,textAlign:'center',color:'#323030'},
  textDiv:{
    marginTop:screenHeight*0.039,
    marginBottom:screenHeight*0.03},
  mainBox:{
    flex:1,
   // minHeight: 807.27 * 0.8, 
   // height: screenHeight * 0.7,
    marginTop:screenWidth * 0.095,
    //justifyContent:'space-between'
  },
   
 
});

export default SignIn;
