import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { updateLoginStatus, addUserName, addFullName, addProductID, addLocationID, addSourceID } from '../redux/currentUser';
import { SessionData } from '../../constants/common';
import { resetDashboardData } from '../redux/dashboardSlice';
import { resetDashboardMiniData } from '../redux/dashboardMiniSlice';
import { navigationRef } from '../../navigation/NavigationService';

export const useLogout = () => {
  const dispatch = useDispatch();
 // const navigation = useNavigation();

  const logout = async () => {
    
    dispatch(updateLoginStatus({ isLoggedIn: false }));
    dispatch(addUserName({ userName: '' }));
    dispatch(addFullName({ fullName: '' }));
    dispatch(addProductID({ productID: '' }));
    dispatch(addLocationID({ locationID: '' }));
    dispatch(addSourceID({ sourceID: '' }));
    dispatch(resetDashboardData());
    dispatch(resetDashboardMiniData());
    await AsyncStorage.removeItem(SessionData.AUTH_TOKEN);
    await AsyncStorage.multiRemove([
      SessionData.AUTH_CUSTOMER_MOBILE,
      SessionData.AUTH_DATA_KEY,
      SessionData.AUTH_USERNAME,
      SessionData.AUTH_USER_FULLNAME,
      SessionData.PRODUCT_ID,
      SessionData.LOCATION_ID,
      SessionData.SOURCE_ID,
      SessionData.DASHBOARD_BANNER
    ]);

    console.log('User logged out and async storage cleared.');
    navigationRef.reset({
      index: 0,
      routes: [{ name: 'PreSignIn' }],
    });
    
  };

  return logout;
};
