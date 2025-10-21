import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  Alert,
} from 'react-native';
import {store} from '../store/redux/store';
import {addFullName, addLocationID, addProductID, addShouldLogout, addShowPoints, addSourceID, addUserName, updateLoginStatus} from '../store/redux/currentUser';
// import useSmsListener from '../store/hook/useSmsListener';

import {SECRET_KEY_CHIPER,SECRET_IV} from '@env';
//const SECRET_KEY_CHIPER = "cde25f50cd276205be9e31cdb266753d691819c61f9a6430a8d0768e1d4534a5";
import CryptoJS from "crypto-js";
import { useDispatch } from 'react-redux';
import { SessionData } from '../constants/common';
const SECRET_KEY = "MyKey"; // Key must match Java key
const IV = "abcdefgh"; // IV must be exactly 8 bytes

export async function logoutHandler(navigation) {
  

  await EncryptedStorage.clear();
  // AsyncStorage.removeItem('my-key').then(res => {
  // dispatch(updateToken({token: ""}))
  // console.log('my-key storage data', res);
  // store.dispatch(addShouldLogout({shouldLogout: false}));
  navigation.getParent('parentDrawer').closeDrawer();
  navigation.dispatch(StackActions.popToTop());
  navigation.dispatch(StackActions.replace('SignIn'));
  store.dispatch(
    addShowPoints({
      showPoints: false,
    }),
  );
  // navigation.navigate('SignIn');
  // });
  // AsyncStorage.removeItem("my-refresh-key").then(res => {
  //     console.log("refresh key removed")
  // })
}

export function mobileHandler(no, setFunc) {
  let regPattern = new RegExp(/^[0-9]{0,10}$/);
  if (regPattern.test(no)) {
    setFunc(no);
  }
}

export function pinHandler(no, setFunc) {
  let regPattern = new RegExp(/^[0-9]{0,6}$/);
  if (regPattern.test(no)) {
    setFunc(no);
  }
}

export function validatepincode(pin) {
  let regPattern = new RegExp(/^[1-9][0-9]{5}$/);
  return regPattern.test(pin);
}

export function validateDoc(docType, docNum) {
  let idRegex = new RegExp();
  if (docType.title == 'Aadhar') {
    idRegex = new RegExp(/^(\d{12})$/);
  } else if (docType.title == 'Voter ID') {
    idRegex = new RegExp(/^[A-Z]{3}[0-9]{7}$/);
  } else if (docType.title == 'Driving License') {
    idRegex = new RegExp(
      /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
    );
  } else if (docType.title == 'PAN') {
    idRegex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
  }
  console.log('test kyc ', idRegex.test(docNum));
  return idRegex.test(docNum);
}

export function ValidatePhoneNumber(num, setErr, setVal) {
  let contactPetrn = new RegExp(/^[6-9]\d{9}$/);
  let numS = num + '';
  //console.log(parseInt(numS.charAt(0)));
  //console.log(contactPetrn.test(num) && parseInt(numS.charAt(0)) > 5);
  if (contactPetrn.test(num) && parseInt(numS.charAt(0)) > 5) {
    return true;
  }
  setErr('Invalid mobile number');
  setVal('');
  return false;
}
export function validateEmail(num, setErr, setVal) {
  let contactPetrn = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  if (contactPetrn.test(num)) {
    return true;
  }
  setErr('Invalid email');
  setVal('');
  return false;
}

export function conAreaHandler(val, setArea) {
  if (val == '') {
    setArea('');
    return;
  }
  let num = Math.max(0, val).toString();
  if (isNaN(num)) {
    setArea('');
    return;
  } else if (parseInt(num) > 0 && parseInt(num) <= 99999) {
    setArea(num);
  }
}

export function onlyAlphabetHandler(text, setValue) {
  const alphaRegex = new RegExp(/^[a-zA-Z ]*$/);
  if (alphaRegex.test(text)) {
    setValue(text);
  }
}

export default function shortenText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...';
  }
  return text;
}

export function getMonthName(num) {
  switch (num) {
    case 1:
      return 'Jan';
    case 2:
      return 'Feb';
    case 3:
      return 'Mar';
    case 4:
      return 'Apr';
    case 5:
      return 'May';
    case 6:
      return 'Jun';
    case 7:
      return 'Jul';
    case 8:
      return 'Aug';
    case 9:
      return 'Sep';
    case 10:
      return 'Oct';
    case 11:
      return 'Nov';
    case 12:
      return 'Dec';
  }
}

const key = CryptoJS.enc.Latin1.parse(SECRET_KEY);
const iv = CryptoJS.enc.Latin1.parse(IV);

// Encrypt Function
export function encryptData(data) {
  const encrypted = CryptoJS.Blowfish.encrypt(data, key, {
    mode: CryptoJS.mode.CBC,    // Java uses Blowfish/CBC
    iv: iv,                     // Use the same IV as Java
    padding: CryptoJS.pad.Pkcs7, // Java uses PKCS5 (same as PKCS7 in CryptoJS)
  });

  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext); // Encode as Base64 like Java
}

// Decrypt Function
export function decryptData(encryptedData) {
  const decrypted = CryptoJS.Blowfish.decrypt(
    { ciphertext: CryptoJS.enc.Base64.parse(encryptedData) },
    key,
    {
      mode: CryptoJS.mode.CBC,
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);  // Convert to UTF-8 string
}
// export function encrypt(text) {
//   try {
//     const key = CryptoJS.enc.Utf8.parse(SECRET_KEY_CHIPER);
//     const iv = CryptoJS.enc.Base64.parse(SECRET_IV);
//     const encoded = CryptoJS.enc.Utf8.parse(text);
//     const ciphertext = CryptoJS.AES.encrypt(encoded, key, {
//       mode: CryptoJS.mode.CBC,
//       iv: iv,
//     });
//     let lastIndexOfEqual = ciphertext.toString().lastIndexOf("=");
//     return ciphertext.toString().substring(0,lastIndexOfEqual-1);
//   } catch(err) {
//     throw new Error("Invalid credential");
//   }
 
// }

// export function decrypt(encryptedText) {
//   const key = CryptoJS.enc.Utf8.parse(SECRET_KEY_CHIPER);
//   const iv = CryptoJS.enc.Base64.parse(SECRET_IV);
//   const bytes = CryptoJS.AES.decrypt(encryptedText, key, { mode: CryptoJS.mode.CBC, iv: iv });
//   const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
//   return decryptedText;
// }

export function formatNumberWithCommas(str = '') {
  //console.log('Str', str);
  if (str == '0' || !!str) {
    // return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let new_str=Math.round(Number(str));
    return new_str.toLocaleString('en-IN');
  }
  return '0';
}

export function formatDate(dateFromAPI, time = 'n') {
  // console.log(date)
  const d = new Date(dateFromAPI);

  let daynw;
  if (parseInt(d.getDate()) < 10) {
    daynw = '0' + d.getDate();
  } else {
    daynw = d.getDate();
  }
  let newT = daynw + '-' + getMonthName(d.getMonth() + 1) + '-' + d.getFullYear();
  
  const isoDate = dateFromAPI;
const date = new Date(isoDate);   // Extract parts of the date
const day = date.getUTCDate().toString().padStart(2, '0');
const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
const year = date.getUTCFullYear();
const hours = date.getUTCHours();
const minutes = date.getUTCMinutes().toString().padStart(2, '0');   // Convert to 12-hour format
const hour12 = hours % 12 || 12;
const ampm = hours < 12 ? 'AM' : 'PM';   // Combine into formatted string
let formattedDate =newT;
if (time == 'y'){
 formattedDate = `${day}-${month}-${year}, ${hour12}:${minutes} ${ampm}`;
}
console.log(formattedDate); // Output: "13-Dec-2024, 10:48 AM"
return formattedDate;
}

export function isImageSizeAllowed(data) {
  console.log('size', data.assets[0].fileSize);
  if (data.assets[0].fileSize > 4000) {
    Alert.alert(
      '',
      'Maximum image size permitted is 4MB',
      [{text: 'OK', onPress: () => ''}],
      {cancelable: false},
    );
    return false;
  } else return true;
}
export function logout(){
  const dispatch = useDispatch();
  dispatch(updateLoginStatus({isLoggedIn: false}));
      dispatch(addUserName({userName: ''}));
      dispatch(addFullName({fullName: ''}));
      dispatch(addProductID({productID: ''}));
      dispatch(addLocationID({locationID: ''}));
      dispatch(addSourceID({sourceID: ''}));

      AsyncStorage.removeItem(SessionData.AUTH_TOKEN).then(res => {
        // dispatch(updateToken({token: ""}))
        console.log('my-key storage data', res);
       
      });
      navigation.navigate('PreSignIn');
      AsyncStorage.multiRemove([
        SessionData.AUTH_CUSTOMER_MOBILE,
        SessionData.AUTH_DATA_KEY,
        SessionData.AUTH_USERNAME,
        SessionData.AUTH_USER_FULLNAME,
        SessionData.PRODUCT_ID,
        SessionData.LOCATION_ID,
        SessionData.SOURCE_ID,
        SessionData.DASHBOARD_BANNER,
      ]).then(res => {
        console.log('Removed async storage data', res);
      });
      navigation.navigate('PreSignIn');
  return true
}
