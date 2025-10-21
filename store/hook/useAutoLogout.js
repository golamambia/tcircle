import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { navigationRef } from '../../navigation/NavigationService';
import { useLogout } from './useLogout';
import { AUTO_LOGOUT_TIME } from '../../constants/common';

const EXCLUDED_SCREENS = ['PreSignIn', 'CreatePin', 'ResetPin', 'SignIn'];

const useAutoLogout = () => {
  const logout = useLogout();
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    clearTimer();

    const currentScreen = navigationRef.current?.getCurrentRoute()?.name;

    if (EXCLUDED_SCREENS.includes(currentScreen)) {
     // console.log('🛑 Auto-logout skipped for:', currentScreen);
      return;
    }

    timerRef.current = setTimeout(() => {
      console.log('⏳ Session Expired - Auto Logout');
      //logout();
      if (navigationRef.isReady()) {
        //navigationRef.navigate('PreSignIn');
      }
    }, AUTO_LOGOUT_TIME);
  };

  const resetTimer = () => {
    //console.log('🔄 User Activity Detected - Resetting Timer');
    startTimer();
  };

  useEffect(() => {
    //console.log('✅ AutoLogout Hook Initialized');
    startTimer();

    const appStateListener = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        //console.log('🔄 App Resumed - Restarting Auto Logout Timer');
        resetTimer();
      }
    });

    return () => {
      clearTimer();
      appStateListener.remove();
    };
  }, []);

  return { resetTimer, clearTimer };
};

export default useAutoLogout;
