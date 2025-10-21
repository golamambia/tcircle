import React from 'react';
import { useSelector } from 'react-redux';
import LoadingAlert from './LoadingAlert';

import { View } from 'react-native';

const GlobalLoader = () => {
  const loading = useSelector(state => state.loader.loading);
//console.log('loading',loading)
  //return <LoadingAlert visible={loading} />;
  return (
<View>

    {/* <LoadingAlert visible={loading} /> */}
  
</View>
  )
};

export default GlobalLoader;
