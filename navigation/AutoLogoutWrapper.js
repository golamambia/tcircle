import React, { useCallback, useEffect, useRef } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, AppState } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';  // ✅ Import useFocusEffect
import  useAutoLogout  from '../store/hook/useAutoLogout';
import MainNavigator from '../navigation/MainNavigator';
import GlobalLoader from '../components/GlobalLoader';

const AutoLogoutWrapper = () => {
  const { resetTimer} = useAutoLogout();  
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('🔄 App Resumed - Resetting Timer');
        resetTimer();
      }
      appState.current = nextAppState;
    });

    return () => {
      appStateListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => { 
      Keyboard.dismiss();
      resetTimer();  // Reset timer on user interaction
    }}>
      <View style={{ flex: 1 }}>
        <MainNavigator />
        <GlobalLoader />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AutoLogoutWrapper;
