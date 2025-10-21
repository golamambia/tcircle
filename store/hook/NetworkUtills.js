import React, { useEffect, useState } from 'react';
import NetInfo from "@react-native-community/netinfo";
import { useToast } from 'react-native-toast-notifications';

const NetworkUtils = () => {
    const toast = useToast();
    const [isConnected, setIsConnected] = useState(null);

  useEffect(() => { 
    const unsubscribe = NetInfo.addEventListener(state => {
        //console.log('NetInfo',state)
      setIsConnected(state.isConnected);
    });

    // Fetch the current network status
    NetInfo.fetch().then(state => {
        //console.log('NetInfo',state)
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (isConnected==false) {
        toast.show('', {
          
        data: {
          isSuccess: false,
          heading: "You are offline!",
          describe: "Sorry, we need an Internet connection to run correctly.",
          
        },
      });
     // Alert.alert('No Internet Connection', 'Please check your internet connection.');
    }
  }, [isConnected]);


  return isConnected;
};

export default NetworkUtils;
