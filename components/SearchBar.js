import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../constants/theme';

const SearchBar = ({
  placeholder = '',
  keyboardType = 'default',
  setInputText,
  inputText,
  rightIcon=false
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 4,
        paddingVertical: 4,
        marginBottom: 12,
        alignItems: 'center',
        width: '100%',
        borderColor: theme.colors.inputBoxBorderColor,//'#f0f0f0',
        borderWidth: 1,
      }}>
      {!rightIcon && <View
        style={{
          paddingLeft: 12,
          padding: 4,
          paddingRight: 12,
          borderRightWidth: 1,
          borderColor: theme.colors.inputBoxBorderColor,//'#d2d2d2',
        }}>
        <Feather name="search" size={22} color="#555555" />
      </View> }
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={inputText}
        onChangeText={setInputText}
        style={{
          paddingVertical: 4,
          width: '85%',
          marginLeft: 4,
          color: theme.colors.inputTextColor,
          fontWeight: '400',
          fontFamily:theme.fonts.regular,
          
        }}
        placeholderTextColor="#707274"
      />
      {rightIcon &&
       <View
        style={{
          paddingLeft: 12,
          padding: 4,
          paddingRight: 12,
         
        }}>
        <Feather name="search" size={22} color="#555555" />
      </View>
      }
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
