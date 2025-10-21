import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../constants/theme';

const InfoMsg = ({text}) => {
  return (
    <Text
      style={styles.headerText}
      >
      {text}
    </Text>
  );
};

export default InfoMsg;

const styles = StyleSheet.create({
  headerText:{color:theme.colors.primary,fontSize:theme.fontSizes.medium,
    fontWeight:theme.fontsWeight.semiBold,fontFamily:theme.fonts.semiBold,
    lineHeight:19,
    textAlign:'center',
    paddingTop:8,paddingBottom:8
  },
});
