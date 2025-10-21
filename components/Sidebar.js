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
  Dimensions,
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
  MinusIcon,
  PlusIcon,
  ChevronRightIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog8ToothIcon,
  PowerIcon,
} from 'react-native-heroicons/outline';

import ButtonGradient from '../components/ButtonGradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import OtherService from '../services/Other';
import Feather from 'react-native-vector-icons/Feather';
import { useDrawerStatus } from '@react-navigation/drawer';
import theme from '../constants/theme';
import { SessionData } from '../constants/common';
import { useDispatch, useSelector } from 'react-redux';
import { addFullName, addLocationID, addProductID, addSourceID, addUserName, updateLoginStatus } from '../store/redux/currentUser';
import {useLogout} from "../store/hook/useLogout"
import YesNoModal from './YesNoModal';
import { useToast } from 'react-native-toast-notifications';
import useSendBookingHandler from '../store/hook/useSendBookingHandler';
import useAutoLogout from '../store/hook/useAutoLogout';

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;
const Sidebar = props => {
  const { resetTimer } = useAutoLogout(); 
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logout=useLogout();
  const { sendBookingHandler } = useSendBookingHandler();
  const drawerStatus = useDrawerStatus();
  const dashboardData = useSelector(state => state.dashboard);
  const dashboardMiniData = useSelector(state => state.dashboardMini);

    const [openModal, setOpenModal] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
  //const navigation = useNavigation();

//console.log('dashboardMiniData',dashboardMiniData);
  useFocusEffect(
    React.useCallback(() => {
      //console.log('sidebar hit 2');
      AsyncStorage.getItem(SessionData.AUTH_TOKEN).then(token => {
        //console.log('token sidebar', token);
        if (!token) {
          //navigation.navigate('SignIn');
        }
      });
    }, [])
  );



 const screenHandler=(srn)=>{
 const previousScreen = navigation.getCurrentRoute()?.name;
 
  navigation.dispatch(DrawerActions.closeDrawer())
 
requestAnimationFrame(() => {
 // navigation.navigate(srn); 
  navigation.reset({
    index: previousScreen?1:0,
    routes: previousScreen ? [{ name: previousScreen }, { name: srn }] : [{ name: srn }],
  });
});
  resetTimer();
 }
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
const toggleHandler=()=>{
  setToggleMenu(p=>!p);
  }
  return (
    <SafeAreaView style={styles.container}>
       
        <View
          style={styles.imageBox}>
           
           <Image
        style={styles.width100}
        //resizeMode='contain'
        source={require('./../assets/Images/sidebar.png')} />
         
        </View>
      <View style={{flex:2, backgroundColor:theme.colors.primary,borderBottomRightRadius:16}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.outerBox}>
          <View style={styles.box}>
            <TouchableOpacity
              className="flex-row"
              style={{flexDirection:'row'}}
              onPress={() => {
                screenHandler('Dashboard');
                
              }}>
              
              {/* <Feather name="home" size={20} color="white" /> */}
              <HomeIcon size={24} color="white" />
              
            
              <View>
                <Text style={styles.boxText}> Home</Text>
              </View>
            </TouchableOpacity>
          </View>
           
          
          
          
          <View style={styles.box}>
            <TouchableOpacity
              className="flex-row"
              style={{flexDirection:'row'}}
              onPress={() => {
                screenHandler('Settings');
              
              }}
              >
              <Cog8ToothIcon size={24} color="white" />
              <View>
                <Text style={styles.boxText}>Settings</Text>
              </View>
            </TouchableOpacity>
          </View>
           <View style={styles.box}>
            <TouchableOpacity
              className="flex-row"
              style={{flexDirection:'row'}}
              onPress={() => {
                screenHandler('WriteReview');
              
              }}
              >
              <ChatBubbleBottomCenterTextIcon size={24} color="white" />
              <View>
                <Text style={styles.boxText}>Write Review</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.log_box}>
            <TouchableOpacity
              className="flex-row"
              style={{flexDirection:'row'}}
              onPress={() =>logoutHandler()}>
              <PowerIcon size={24} color="white" />
              <View>
                <Text style={styles.boxText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* <View className="w-[92%] mx-4 my-6 shadow-lg shadow-slate-500 self-center">
            <ButtonGradient onPress={() => logoutHandler(props.navigation)}>
              Logout
            </ButtonGradient>
          </View> */}

        </View>
      </ScrollView>
      </View>
      {openModal &&
    <YesNoModal
         heading={'Logout Alert!'}
         question={'Do you want to logout?'}
         open={openModal}
         setOpen={setOpenModal}
         onResponse={onResponse}
         yesText={'YES (यस) '}
         noText={'No (नो)'}
       />
    }
    </SafeAreaView>
  );
};
export default Sidebar;

const styles = StyleSheet.create({
  toggleIcon:{position:'absolute',right:0,},
  iconBox:{width:19,height:19},
  icon100:{
    width:'100%',
    height:'100%',
    
  },
  width100:{
    width:'100%',
    height:'100%',
    resizeMode:'stretch'
  },
  imageBox:{
    flex:1,
    //width: screenWidth*.845,//337,
    //height: screenHeight*.94,//294,
   //  backgroundColor:theme.colors.primary,
    marginBottom:8
  },
  outerBox:{
    //flex:1,
    marginBottom:screenHeight*.04,
    paddingHorizontal:16},
  container: {
    flex: 1,
   // backgroundColor:theme.colors.primary,
//  zIndex:9999
//borderBottomRightRadius:8,

  },
  pageParents: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
    paddingTop: 8,
    paddingBottom: 8,
   // flexDirection:'row'
  },
  boxText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: theme.fontsWeight.medium,
    fontFamily:theme.fonts.medium,
    lineHeight:17,
    textAlign: 'left',
    marginLeft: 12,
  },
  log_box: {
    //borderBottomWidth: 1,
    //borderBottomColor: '#CFCFCF',
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection:'row'
  },
});
