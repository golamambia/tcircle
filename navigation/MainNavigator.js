import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Dashboard from '../screens/Dashboard';
 
import SignIn from '../screens/SignIn';
import SignUpINIT from '../screens/SignUpINIT';
 
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
  ChevronLeftIcon,
  Bars3Icon,
} from 'react-native-heroicons/outline';
import {useIsFocused, useNavigation, useNavigationState} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DrawerItemList, DrawerToggleButton, createDrawerNavigator, useDrawerStatus } from '@react-navigation/drawer';
 
 
import ButtonGradient from '../components/ButtonGradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import DrawerHeaderBtn from '../components/DrawerHeaderBtn';
import { updateLoginStatus, updateTotalCartItems } from '../store/redux/currentUser';
import CartService from '../services/CustomerService';
import PreSignIn from '../screens/PreSignIn';
import CreatePin from '../screens/CreatePin';
import ResetPin from '../screens/ResetPin';
 
import FooterTab from '../components/FooterTab';
 
import { SessionData } from '../constants/common';
 
import MessageCenter from '../screens/MessageCenter';
 
import { hideLoader, showLoader } from '../store/redux/loaderSlice';
import TrustCircle from '../screens/TrustCircle';
import Settings from '../screens/Settings';
import FamilyProfile from '../screens/FamilyProfile';
import FamilySearch from '../screens/FamilySearch';
import WriteReview from '../screens/WriteReview';
import NotificationList from '../screens/NotificationList';
import UpdateProfile from '../screens/UpdateProfile';
 

 

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const MainNavigator = () => {
   const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [currentRoute, setCurrentRoute] = useState("HomeScreen");
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
     const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem(SessionData.AUTH_TOKEN);
        //console.log('Token mn retrieved:', token);

        setTimeout(() => {
          if (token) {
            dispatch(updateLoginStatus({ isLoggedIn: true }));
           // navigation.replace('Dashboard');
          } else {
            dispatch(updateLoginStatus({ isLoggedIn: false }));
            navigation.navigate('SignIn');
          }
                  setLoading(false);
        }, 1000); // Reduced duration for better user experience
      } catch (error) {
        console.error('Error reading token:', error);
        navigation.navigate('SignIn');
                setLoading(false);
      }
    };
    useEffect(() => {
     // console.log('Token mn retrieved:hhhhhhhhhhhhhhhhhhhhhhhhh 2');
      // Update the current route dynamically when screen changes
      const unsubscribe = navigation.addListener('state', () => {
        const routeName = navigation.getCurrentRoute()?.name;
        //console.log('routeName amb',routeName);
        setCurrentRoute(routeName);
        dispatch(showLoader());

    // Simulate loading delay (if needed)
    setTimeout(() => {
      dispatch(hideLoader());
    }, 100);
      });
      checkLoginStatus();
      return unsubscribe;
    }, [navigation, isFocused]);

    
    const screensWithFooter = ["Dashboard", "Settings","FamilySearch","FamilyProfile" ,"TrustCircle","WriteReview","NotificationList"];


useEffect(() => {
  const unsubscribe = navigation.current?.addListener('state', () => {
    // Show loader when state changes
     // 1 second delay for smooth transition
  });

  return unsubscribe;
}, []);
  const HomeScreenStack = () => {
   
  
    return (
      <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{title: 'Splash'}}
          />
          <Stack.Screen
            name="PreSignIn"
            component={PreSignIn}
            options={{title: 'PreSignIn'}}
          />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name="TrustCircle"
          component={TrustCircle}
          options={{title: 'Home'}}
        />
         
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{title: 'SignIn'}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpINIT}
          options={{title: 'SignUp'}}
        />
        <Stack.Screen
          name="CreatePin"
          component={CreatePin}
          options={{title: 'CreatePin'}}
        />
        <Stack.Screen
          name="ResetPin"
          component={ResetPin}
          options={{title: 'ResetPin'}}
        />
 
        <Stack.Screen
          name="MessageCenter"
          component={MessageCenter}
          options={{title: 'MessageCenter'}}
        />
    <Stack.Screen
          name="Settings"
          component={Settings}
          options={{title: 'Settings'}}
        />
         <Stack.Screen
          name="FamilySearch"
          component={FamilySearch}
          options={{title: 'FamilySearch'}}
        />
         <Stack.Screen
          name="FamilyProfile"
          component={FamilyProfile}
          options={{title: 'FamilyProfile'}}
        />
       <Stack.Screen
          name="WriteReview"
          component={WriteReview}
          options={{title: 'WriteReview'}}
        />
        <Stack.Screen
          name="NotificationList"
          component={NotificationList}
          options={{title: 'NotificationList'}}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={{title: 'UpdateProfile'}}
        />
        
      </Stack.Navigator>
       {screensWithFooter.includes(currentRoute) && (
    <FooterTab navigation={navigation} pageName={currentRoute} />
   )}
   {/* drawerStatus !== 'open' &&  */}
  {/* {!screensWithFooter.includes(currentRoute) && (
    <PoweredByMJ backgroundColor={false} />
   )} */}
      </View>
    
      
    );
  };
  
  function AuthorizedStack() {
    const navigation = useNavigation();

   
    return (
      
      <Drawer.Navigator
        id="parentDrawer"
        initialRouteName="HomeScreen"
        screenOptions={{
         
          drawerStyle: {
            // backgroundColor: '#fff',
            width: '75%',
             //zIndex: 999999
          },
          //headerShown: false,
          headerStyle: {
            backgroundColor: !loading ?'#023380':'transparent',
            height: !loading ?screenHeight*0.05:0
          },
          headerTitleContainerStyle: {

          },
          headerTintColor: !loading ?'#fff':'transparent',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignItems: 'center',
            justifyContent: 'center',
          },
          headerTransparent: true,
          drawerActiveTintColor: '#DA1D1F',
          drawerLabelStyle: {
            color: '#444',
          },
          drawerItemStyle: {
            borderColor: '#d2d2d2',
            borderBottomWidth: 1,
          },
          swipeEnabled: false,
         // headerLeft:()=><DrawerToggleButton />,
          headerRight: () => (
           !loading ?<DrawerHeaderBtn navigation={navigation} />:''
          ),
          //drawerContentContainerStyle: { flex: 1 },
        }}
        drawerContent={props => {
          return <Sidebar {...props} />;
           //return currentRoute!='CreatePin' || currentRoute!='ResetPin' ? <Sidebar {...props} /> : <View />;
        }}
        
        onDrawerOpen={() => setIsDrawerOpen(true)}
      onDrawerClose={() => setIsDrawerOpen(false)}
      
        >
        <Drawer.Screen
          name="HomeScreen"
          component={HomeScreenStack}
          options={{
            drawerLabel: 'Home',
            title: '',
            headerShown: true,
            drawerIcon: ({color, size}) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
     
    );
  }
  return  <AuthorizedStack />
  
  
};

export default MainNavigator;

const styles = StyleSheet.create({
});
