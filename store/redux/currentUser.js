import {createSlice} from "@reduxjs/toolkit";

const currentUserDetails = createSlice({
    name:'currentUser',
    initialState: {
        userName: "",
        token: "",
        isLoggedIn: false,
        fullName:"",
        logDetails:"",
        productID:"",
        locationID:"",
        sourceID:"",
        productName:"",
        userDoNO:"",
        
    },
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload.userName
        },
        setLoginAs: (state, action) => {
            state.loginAs = action.payload.loginAs
        },
        setToken: (state, action) => {
            state.token = action.payload.token
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setFullName: (state, action) => {
            state.fullName = action.payload.fullName
        },
        setLogDetails: (state, action) => {
            state.logDetails = action.payload.logDetails
        },
        setProductID: (state, action) => {
            state.productID = action.payload.productID
        },
        setLocationID: (state, action) => {
            state.locationID = action.payload.locationID
        },
        setSourceID: (state, action) => {
            state.sourceID = action.payload.sourceID
        },
        setProductName: (state, action) => {
            state.productName = action.payload.productName
        },
        setUserDoNo: (state, action) => {
            state.userDoNO = action.payload.userDoNO
        },
        
    }
})


export const addUserName = currentUserDetails.actions.setUserName;
export const addLoginAs = currentUserDetails.actions.setLoginAs;
export const updateToken = currentUserDetails.actions.setToken;
export const updateLoginStatus = currentUserDetails.actions.setIsLoggedIn;
export const addFullName = currentUserDetails.actions.setFullName;
export const addLogDetails = currentUserDetails.actions.setLogDetails;
export const addProductID = currentUserDetails.actions.setProductID;
export const addLocationID = currentUserDetails.actions.setLocationID;
export const addSourceID = currentUserDetails.actions.setSourceID;
export const addProductName = currentUserDetails.actions.setProductName;
export const addUserDoNo = currentUserDetails.actions.setUserDoNo;

export default currentUserDetails.reducer;