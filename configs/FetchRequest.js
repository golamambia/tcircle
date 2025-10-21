 

import Toast from 'react-native-toast-message';
import {
  API_BASE_URL,
  SessionData,
} from '../constants/common';
 import CryptoJS from 'crypto-js';
import { toastRef } from '../services/ToastService';
import AsyncStorage from '@react-native-async-storage/async-storage';
//console.log("BASE URL", API_BASE_URL) 
 
 
 
const getService = async (url, port=9001) => {
  console.log("url",url)

  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'get',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
      
    }).then((response) => {
      // console.log(response.data);
      return response.json()
    })

    console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}
const getServiceAuthorized = async (url, port=9001 ) => {
   try {
    // console.log("--", yourAccessTokenHere)
    let accessToken = await AsyncStorage.getItem(SessionData.AUTH_TOKEN);
    console.log('accessTokenI',accessToken);
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'get',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + accessToken
      },
      
    }).then((response) => {
      console.log("from token res =======>> ", response.data);
      return response.json()
    })

    console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}

 // postService.js
const postService = async (url, payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text }; // fallback if not valid JSON
    }

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: data.message || "Something went wrong",
        data,
      };
    }

    return { success: true, status: response.status, ...data };
  } catch (err) {
    return {
      success: false,
      status: 0,
      message: err.message || "Network error",
    };
  }
};


const postService4 = async (url, payload) => {
  try {
    console.log('API_BASE_URL',API_BASE_URL,url);
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'jwt-token': jwtToken
      },
      body: JSON.stringify(payload),
    });
 console.log('response',response);
    // Check if response is ok (status 200-299)
    const data = await response.json();
 console.log('response2',data);
    if (!response.ok) {
      // Throw structured error with status + message
      throw {
        status: response.status,
        message: data.message || "Something went wrong",
        data,
      };
    }

    return data;
  } catch (err) {
    console.error("API Error:", err);
    return err;
  }
};

const postServiceAuthorized = async (url, payload, accessToken, port=9001) => {
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'post',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(payload)
      
    }).then((response) => {
      console.log("res data", response);
      return response.json()
    })

    // console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}
const putServiceAuthorized = async (url, payload, accessToken, port=9001) => {
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'put',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(payload)
      
    }).then((response) => {
      console.log("res data", response);
      return response.json()
    })

    // console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}
const deleteServiceAuthorized = async (url, payload, accessToken, port=9001) => {
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'delete',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(payload)
      
    }).then((response) => {
      console.log("res data", response);
      return response.json()
    })

    // console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}

const postServiceFormData = async (url, formdata, port=9001) => {
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'post',
      // headers: {
          //     // Accept: "application/json",
          //     // "Content-Type": "application/json",
      // },
      body: formdata
      
    }).then((response) => {
      // console.log("fd response", response.json());
      return response.json()
    })

    console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    console.log("ERR", err)
    return err;
  }
  
}
const postServiceFormDataAuthorized = async (url, formdata, accessToken, port=9001) => {
  try {
    // console.log("url",`${API_BASE_URL}${url}`)
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'post',
      headers: {
              // Accept: "multipart/form-data",
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer ' + accessToken
      },
      body: formdata
      
    }).then((response) => {
      // console.log("fd response", response.json());
      return response.json()
    })

    console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    console.log("ERR", err)
    return err;
  }
  
}
 
 



export  {getService, postService, postServiceFormData, getServiceAuthorized, postServiceAuthorized, postServiceFormDataAuthorized, putServiceAuthorized, deleteServiceAuthorized};