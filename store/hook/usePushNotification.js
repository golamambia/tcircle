import React from 'react';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';

import {useDispatch} from 'react-redux';
import {
  addForegroundNotifications,
  addPushNotificationDetails,
} from '../redux/currentUser'; 

export async function getFcmToken() {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
}
const usePushNotification = () => {
  const dispatch = useDispatch();
  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      //Request iOS permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else if (Platform.OS === 'android') {
      //Request Android permission (For API level 33+, for 32 or below is not required)
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };

  const getFCMToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      //await EncryptedStorage.setItem('deviceToken', fcmToken);
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
     // await EncryptedStorage.setItem('deviceToken', '');
    }
  };

  const listenToForegroundNotifications = async () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // await EncryptedStorage.setItem('isApproved', 'true');
      console.log('hit=====================================', remoteMessage)
      dispatch(
        addForegroundNotifications({
          foregroundNotifications: true,
        }),
      );
      let details = remoteMessage;
      console.log('Notification details', details?.data)
      // dispatch(
      //   addPushNotificationDetails({pushNotificationDetails: details?.data}),
      // );

      console.log(
        'A new message arrived! (FOREGROUND)',
        JSON.stringify(remoteMessage),
      );
    });
    return unsubscribe;
  };

  const listenToBackgroundNotifications = async () => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        // await EncryptedStorage.setItem('isApproved', 'true');
        dispatch(
          addForegroundNotifications({
            foregroundNotifications: true,
          }),
        );

        let details = remoteMessage;
        console.log('Notification details', details?.data)
        // dispatch(
        //   addPushNotificationDetails({pushNotificationDetails: details?.data}),
        // );

        console.log(
          'A new message arrived! (BACKGROUND)',
          JSON.stringify(remoteMessage),
        );
      },
    );
    return unsubscribe;
  };

  const onNotificationOpenedAppFromBackground = async () => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        console.log(
          'App opened from BACKGROUND by tapping notification:',
          JSON.stringify(remoteMessage),
        );
      },
    );
    return unsubscribe;
  };

  const onNotificationOpenedAppFromQuit = async () => {
    const message = await messaging().getInitialNotification();

    if (message) {
      console.log(
        'App opened from QUIT by tapping notification:',
        JSON.stringify(message),
      );
    }
  };

  return {
    requestUserPermission,
    getFCMToken,
    listenToForegroundNotifications,
    listenToBackgroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  };
};

export default usePushNotification;
