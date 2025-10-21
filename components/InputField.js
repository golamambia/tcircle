import React, {useState} from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import {isEnabled} from 'react-native/Libraries/Performance/Systrace';
import theme from '../constants/theme';

const InputField = ({
  fieldName,
  required=false,
  value,
  setValue,
  check,
  errorMsg = 'Is Required',
  keyboardType = 'default',
  editable = true,
  selectTextOnFocus = false,
  maxLength,
  multiline = false,
  numberOfLines = 1,
}) => {
  const splitText = fieldName.split('/n');
  const [isFocused, setIsFocused] = useState(false);

  const isRequired = () => {
    // console.log("req",required)
    if (required == true) {
      return <Text style={{color: 'red'}}> *</Text>;
    }
  };

  const isValid = (value, required) => {
    if (value) {
      return {
        //borderColor:'#4BB543',
        borderWidth: 1,
      };
    } else if (!required && !value && errorMsg == '') {
      return;
    } else if (
      (required || errorMsg !== 'Is Required') &&
      !value &&
      check > 1
    ) {
      return {
        borderColor: theme.colors.red,
        borderWidth: 1,
      };
    }
  };
  const isEdit = status => {
    if (!status) {
      return {
        backgroundColor: '#F2F1F1',
        borderColor: theme.colors.inputBoxBorderColor,
        borderWidth: 1,
      };
    } else
      return {
        // backgroundColor:'#F21616',

        borderWidth: 1,
      };
  }; 
  return (
    <View style={styles.mainDiv}>
      <View style={{zIndex: 99999, top: -2}}>
        <Text style={styles.textLabel}>
          {splitText[0]}
          {isRequired()}
        </Text>
        {splitText[1] &&
        <Text style={styles.textLabel}>
          {splitText[1]}
          
        </Text>}
      </View>

      {(required || errorMsg != '') && !value && check > 1 && (
        <Image
          source={require('./../assets/Images/warning.png')}
          style={styles.warnImg}
        />
      )}
      <TextInput
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={editable && multiline ? 'top' : 'center'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        selectTextOnFocus={selectTextOnFocus}
        keyboardType={keyboardType}
        maxLength={maxLength}
        style={[
          styles.textField,
          isFocused && styles.inputFocused,
          {...isValid(value, required), ...isEdit(editable), ...(editable && multiline ? { minHeight: numberOfLines * 25 } : {})},
         
        ]}
        onChangeText={val => setValue(val)}
        value={value}
      />
      {(required || errorMsg != '') && check > 1 && !value && (
        <Text style={styles.textRequiredMsg}>{fieldName + ' ' + errorMsg}</Text>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputFocused: {borderColor: theme.colors.activeColor},
  textRequiredMsg: {
    position: 'absolute',
    color: theme.colors.error,
    bottom: -16,
    paddingLeft: 2,
    fontSize: theme.fontSizes.small,
    textTransform: 'capitalize',
  },
  warnImg: {height: 24, width: 24, position: 'absolute', right: 8, top: '45%'},
  textLabel: {
    paddingLeft: 2,
    color: theme.colors.inputLabelColor,
    fontSize: theme.fontSizes.fontSize14,
    fontWeight: theme.fontsWeight.medium,
    fontFamily: theme.fonts.medium,
  },
  mainDiv: {position: 'relative', marginBottom: 24},
  textField: {
    paddingVertical: 12,
    paddingTop: 8,
    paddingHorizontal: 12,
    //paddingLeft: 10,
    borderWidth: 1,
    borderColor: theme.colors.inputBoxBorderColor,
    borderRadius: 8,
    fontSize: theme.fontSizes.fontSize14,
    color: theme.colors.inputTextColor,
    fontWeight: theme.fontsWeight.regular,
    fontFamily: theme.fonts.regular,
    //minHeight: 100, 
  },
});
