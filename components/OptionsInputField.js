import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import {ChevronDownIcon, UserIcon} from 'react-native-heroicons/outline';
import OptionsModal from './OptionsModal';
import EncryptedStorage from 'react-native-encrypted-storage';
import getLabelLanguage from '../lang';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../constants/theme';

const OptionsInputField = ({
  fieldName,
  required = false,
  value,
  setValue,
  check,
  errorMsg = 'Is Required',
  data,
  modalHeading,
  modalIcon,
  useImageForDisplay = false,
  editable = true,
  showImage = false,
  highlightImageIcon = false,
  showSelectedOptionAtTop = true,
  confirmField=false,
  value2,
  setValue2,
}) => {
  const [open, setOpen] = useState(false);
  const [selLang, setSelLang] = useState('');

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        EncryptedStorage.getItem('lang').then(lang => {
          setSelLang(lang);
        });
      }, 1000);
    }, []),
  );
  const isRequired = () => {
    if (required === true) {
      return <Text style={{color: 'red'}}> *</Text>;
    }
  };

  const isValid = value => {
    if (required && !value?.title && check > 1 && editable) {
      return {
        borderColor: '#F21616',
        borderWidth: 1,
      };
    } else if (value?.title) {
      return {
        //borderColor:'#4BB543',
        borderWidth: 1,
      };
    } else {
      return {
        borderColor: '#cbd5e1',
        // borderColor:'#F21616',
        borderWidth: 1,
      };
    }
    // else if(check > 1){
    //
    // }
  };

  const modalHandler = () => {
    if (editable) {
      setOpen(p => !p);
    }
  };

  return (
    <View style={styles.mainDiv}>
      {!!fieldName && (
        <Text style={styles.textLabel}>
          {fieldName}
          {isRequired()}
        </Text>
      )}

      {required && !value && check > 1 && (
        <Image
          source={require('./../assets/Images/warning.png')}
          style={styles.warnImg}
        />
      )}
      <Pressable onPress={modalHandler}>
     
        <Text
          style={[
            styles.selectedText,
            {
              ...isValid(value),
              backgroundColor: editable ? '#fff' : 'rgb(241 245 249)',
            },
          ]}>
          {value?.title ? value?.title : 'Select'}
        </Text>
      </Pressable>
      <View
        style={{position: 'absolute', right: 10, top: !!fieldName ? 32 : 16}}>
        <ChevronDownIcon size={16} color="gray" />
      </View>
      {editable && required && !value?.title && check > 1 && (
        <Text style={styles.textRequiredMsg}>{fieldName + ' ' + errorMsg}</Text>
      )}

      <View style={{position: 'absolute'}}>
        <OptionsModal
          highlightImageIcon={highlightImageIcon}
          showImage={showImage}
          useImageForDisplay={useImageForDisplay}
          open={open}
          setOpen={setOpen}
          modalOptions={data}
          selectedItem={value}
          setSelectedItem={setValue}
          heading={modalHeading}
          icon={modalIcon}
          showSelectedOptionAtTop={showSelectedOptionAtTop}
          confirmField={confirmField}
          fieldName={fieldName}
        />
      </View>
    </View>
  );
};

export default OptionsInputField;

const styles = StyleSheet.create({
  textRequiredMsg: {
    position: 'absolute',
    color: theme.colors.error,
    bottom: -16,
    paddingLeft: 2,
    fontSize: theme.fontSizes.small,
    textTransform: 'capitalize',
  },
  selectedText: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    position: 'relative',
    borderRadius: 5,
    color: theme.colors.inputTextColor,
    fontSize: theme.fontSizes.fontSize14,
    fontWeight: theme.fontsWeight.regular,
    fontFamily: theme.fonts.regular,
    borderColor: theme.colors.inputBoxBorderColor,
  },
  warnImg: {height: 24, width: 24, position: 'absolute', right: 8, top: '45%'},
  textLabel: {
    paddingLeft: 2,
    color: theme.colors.inputLabelColor,
    fontSize: theme.fontSizes.fontSize14,
    fontWeight: theme.fontsWeight.medium,
    fontFamily: theme.fonts.medium,
    paddingBottom: 2,
  },
  mainDiv: {position: 'relative', marginBottom: 24, top: -8},
});
