import React, {useEffect, useState} from 'react'
import {View, Text, Image, ImageBackground, Alert, Pressable, StyleSheet, StatusBar, Platform, TouchableWithoutFeedback, Keyboard, AppState} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import { ToastProvider } from 'react-native-toast-notifications'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from 'react-native-heroicons/outline';

import MainNavigator from './navigation/MainNavigator';
import CustomToast from './components/CustomToast';
import theme from './constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoaderProvider } from './components/LoaderContext';
import GlobalLoader from './components/GlobalLoader';
import useAutoLogout from './store/hook/useAutoLogout';
import { navigationRef } from './navigation/NavigationService';
import AutoLogoutWrapper from './navigation/AutoLogoutWrapper';
 
import Toast from 'react-native-toast-message';
 const toastConfig = {
  success: (props) => <CustomToast isSuccess={true} heading={props.text1} describe={props.text2} />,
  error: (props) => <CustomToast  isSuccess={false} heading={props.text1} describe={props.text2}  />,
  info: (props) => <CustomToast isSuccess={false} heading={props.text1} describe={props.text2} />,
};
const linking = {
  prefixes: [
    "https://previewwebsite.online/trusted-family-circle",
    "tcircle://"
  ],
  config: {
    screens: {
      SignUp: "invite", // matches /invite?ref=CODE
    },
  },
};
const App = () => {
  
  return (
    <Provider store={store}>
    <ToastProvider
    placement="bottom"
    duration={3400}
    animationType='slide-in'
    animationDuration={200}
    successColor="green"
    dangerColor="red"
    warningColor="orange"
    normalColor="gray"
    icon={<InformationCircleIcon />}
    successIcon={<CheckCircleIcon />}
    dangerIcon={<ExclamationCircleIcon />}
    warningIcon={<ExclamationTriangleIcon />}
    textStyle={{ fontSize: 20 }}
    offset={50} // offset for both top and bottom toasts
    offsetTop={30}
    offsetBottom={40}
    swipeEnabled={true}
    renderToast={(toastOptions) => {
      const {isSuccess, heading, describe=""} = toastOptions.data;
      return <CustomToast isSuccess={isSuccess} heading={heading} describe={describe} />
  }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor={theme.colors.primary}  barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        
          <NavigationContainer ref={navigationRef} linking={linking}>
          
          <AutoLogoutWrapper />
            
          {/* <TouchableWithoutFeedback >
      <View style={{ flex: 1 }}>
        <MainNavigator />
        <GlobalLoader />
      </View>
    </TouchableWithoutFeedback> */}
          </NavigationContainer>
        
      </GestureHandlerRootView>
      </SafeAreaView>
    </ToastProvider>
    <Toast config={toastConfig}  position="bottom" />
    </Provider>
   
  )
}

export default App;


const styles = StyleSheet.create({
  container1: {
    flex: 3,
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    paddingVertical: 3
  },
  container2: {
    flex: 1,
    backgroundColor: "#83C328",
    paddingVertical: 3
  },
})