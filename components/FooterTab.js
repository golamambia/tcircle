import {
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    Keyboard,
    Animated,
    BackHandler
  } from 'react-native';
  import React, {useState, useEffect, useCallback} from 'react'
  
  import {
    HomeIcon,
    BellIcon,
    ExclamationCircleIcon,
    UserIcon,
    ArrowUpTrayIcon,
    PhotoIcon,
    GiftIcon,
    ShoppingCartIcon,
    DocumentTextIcon,
    ArrowDownTrayIcon,
    LockClosedIcon,
    QuestionMarkCircleIcon,
    LanguageIcon,
    DocumentMagnifyingGlassIcon,
    EnvelopeOpenIcon,
    PhoneArrowDownLeftIcon,
    StarIcon,
    ArrowRightOnRectangleIcon,
    MagnifyingGlassIcon,
    UsersIcon,
    PowerIcon,
  } from 'react-native-heroicons/outline';
  
  import ButtonGradient from '../components/ButtonGradient';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  import { useFocusEffect, useNavigation } from '@react-navigation/native';
  import OtherService from '../services/Other';
  import Feather from 'react-native-vector-icons/Feather';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import {
    createBottomTabNavigator,
    BottomTabBar,
  } from '@react-navigation/bottom-tabs';
  import theme from '../constants/theme';
import { SessionData } from '../constants/common';
import { useDispatch } from 'react-redux';
import { addFullName, addLocationID, addProductID, addSourceID, addUserName, updateLoginStatus } from '../store/redux/currentUser';
import { useDrawerStatus } from '@react-navigation/drawer';
import { Shadow } from 'react-native-shadow-2';
import {useLogout} from '../store/hook/useLogout'
import YesNoModal from './YesNoModal';
import { hideLoader, showLoader } from '../store/redux/loaderSlice';
import useSendBookingHandler from '../store/hook/useSendBookingHandler';
import useAutoLogout from '../store/hook/useAutoLogout';
import { navigationRef } from '../navigation/NavigationService';

  const Tab = createBottomTabNavigator();
  const FooterTab =  ({ pageName = null }) => {
    const { resetTimer } = useAutoLogout(); 
    const dispatch = useDispatch();
    const logout = useLogout();
    const { sendBookingHandler } = useSendBookingHandler();
    const [footerHeight] = useState(new Animated.Value(60));
    //const navigation = useNavigation();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
      const [conId, setConId] = useState("");
       
      const [availablePoint, setAvailablePoint] = useState("");
      const [openModal, setOpenModal] = useState(false);
    //const navigation = useNavigation();
    // const isDrawerOpen = useDrawerStatus() === 'open';
    // useEffect(() => {
    //   setKeyboardVisible(true);
    // }, [isDrawerOpen]);
    const navigateToScreen = (screenName) => {
      const previousScreen = navigationRef.getCurrentRoute()?.name;
 console.log('previousScreen',previousScreen);
      requestAnimationFrame(() => {
        
        navigationRef.reset({
          index: previousScreen?1:0,
          routes: previousScreen ? [{ name: previousScreen }, { name: screenName }] : [{ name: screenName }],
        });
      });
      resetTimer();
          
      //navigationRef.navigate(screenName);
    };
   
   
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          //setKeyboardVisible(true);
         // console.log('keyboardDidShowF');
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
        //  setKeyboardVisible(false);
          //console.log('keyboardDidHideF');
        },
      );
  
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);
    useEffect(() => {
      const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
        Animated.timing(footerHeight, {
          toValue: 0, // Shrinks footer
          duration: 300,
          useNativeDriver: false,
        }).start();
      });
    
      const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        Animated.timing(footerHeight, {
          toValue: 60, // Expands footer back 
          duration: 1,
          useNativeDriver: false,
        }).start();
      });
    
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);
    function onResponse(res) {
                  //console.log('res',res);
                  if (res == 'yes') {
                    logout();
                  } else {
                    setOpenModal(false);
                  }
        }
        const logoutHandler=()=>{
          setOpenModal(true);
        }
        const screenHandler=(srn)=>{
          navigationRef.navigate(srn);
          
         }
    return (
      <Animated.View style={{ 
        //zIndex:1,
        //flex:1,
        borderTopColor:'#000',
        borderLeftColor:'#000',
        borderRightColor:'#000',
      borderTopWidth:.25,
      borderRightWidth:.25,
      borderLeftWidth:.25,
      backgroundColor: '#FFF',
        
        height: footerHeight,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,}}>
{/* <Shadow
        distance={4}
        startColor={'#0000000A'}
        endColor={'#fff'}
        radius={8}
        offset={[0,-3]}
        sides={'top'}
        style={{ 
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          borderLeftColor:'#0000000A',
          borderRightColor:'#0000000A',
          borderLeftWidth:1,
          borderRightWidth:1,
          width:'100%'}}
      > */}
      <View
              style={{
               // flex:1,
                borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: '#FFF',
        //flexDirection: 'row',
        //alignItems: 'center',

        //position: 'absolute1',
        //bottom: 0,
        //left: 0,
        //right: 0,
        //paddingVertical: 5,
        paddingHorizontal: 8,
       
        
      borderTopColor:'#000',
      borderLeftColor:'#000',
      borderRightColor:'#000',
              }}
              
            >
              
           <View style={{justifyContent:'center',
           paddingTop:8,
           paddingBottom:12,flexDirection:'row'}} >
           <TouchableOpacity style={{flex:.5,position:'relative',alignItems:'center'}}
       className="flex-1 relative items-center "
        onPress={() => navigateToScreen('Dashboard')}>
              
                    {
                        pageName=='Dashboard'?
                        (
                          
                          <HomeIcon size={24} color={theme.colors.primary} />
                         
                        ):(<HomeIcon size={24} color="black" />)
                      }
                      
                      <Text
                       className=" text-[#FFFFFF] text-[12px] font-ralebold"
                        style={[styles.labelText,pageName=='Dashboard'?{color:theme.colors.primary}:'']}>
                        Home
                      </Text>
                      
                    

                    </TouchableOpacity>
                   
                    <TouchableOpacity
                    style={{flex:1,position:'relative',alignItems:'center'}}
      className="flex-1 items-center relative"
      onPress={() => navigateToScreen('TrustCircle')}>
                   {
                        pageName=='TrustCircle'?(<View>
                          <UsersIcon size={24} color={theme.colors.primary} />
                              </View> ):( <UsersIcon size={24} color={'black'} />)
                      }
                   
                     <Text
                       className=" text-[#FFFFFF] text-[12px] font-ralebold"
                        style={[styles.labelText,pageName=='TrustCircle'?{color:theme.colors.primary}:'']}>
                       Trust Circle
                      </Text>
                      
                      </TouchableOpacity>
                      <TouchableOpacity
                    style={{flex:1,position:'relative',alignItems:'center'}}
      className="flex-1 items-center relative"
      onPress={() =>navigationRef.navigate('NotificationList')}>
                   {
                        pageName=='NotificationList'?(<BellIcon size={24} color={theme.colors.primary} />):( <BellIcon size={24} color="black" />)
                      }
                   
                     <Text
                       className=" text-[#FFFFFF] text-[12px] font-ralebold"
                        style={[styles.labelText,pageName=='NotificationList'?{color:theme.colors.primary}:'']}>
                       Notifications
                      </Text>
                      
                   
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                    style={{flex:.5,position:'relative',alignItems:'center'}}
      className="flex-1 items-center relative"
      onPress={() => 
        logoutHandler()
      
     // logout()
      }>
                     
                    <PowerIcon size={24} color="black" />
                      <Text
                        className=" text-[#FFFFFF] text-[12px] font-ralebold"
                        style={styles.labelText}>
                       Logout
                      </Text>
                      
                    
                    </TouchableOpacity>
                   
          </View>
             
          </View>
          {/* </Shadow> */}
          {openModal &&
    <YesNoModal
         heading={'Logout Alert!'}
         question={'Do you want to logout?'}
         open={openModal}
         setOpen={setOpenModal}
         onResponse={onResponse}
         yesText={'YES'}
         noText={'No'}
       />
    } 
          </Animated.View>
    )     
    };
    export default FooterTab;
    
    const styles = StyleSheet.create({
      labelText:{fontSize:theme.fontSizes.small,
        fontWeight:theme.fontsWeight.regular,
        fontFamily:theme.fonts.regular,color:'#4A4A4A',
      lineHeight:15,
      paddingTop:4
      },
      container: {
        flex: 1,
        //zIndex:1
      },
      pageParents: {
        backgroundColor: '#6759FF',
        flexDirection: 'row',
        alignItems: 'center',
      },
      box: {
        borderBottomWidth: 1,
        borderBottomColor: '#CFCFCF',
        paddingTop: 10,
        paddingBottom: 10,
      },
      boxText: {
        fontSize: 13,
        color: '#000000',
        fontWeight: 'normal',
        textAlign: 'left',
        marginLeft: 12,
      },
      log_box: {
        //borderBottomWidth: 1,
        //borderBottomColor: '#CFCFCF',
        paddingTop: 10,
        paddingBottom: 10,
      },
    });
    