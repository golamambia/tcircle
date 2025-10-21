import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    C27:null,
    C27ForLocation:null,
    CAddrs:null,
    CMob:null,
    CustCode:null,
    CustomerName:null,
    GST:null,
    License:null,
    LicenseValidity:null,
    Message:null,
    StatusCode:null,
    Unit:null
};

const dashboardMiniSlice = createSlice({
    name: 'dashboardMini',
    initialState,
    reducers: {
        setDashboardMiniData: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetDashboardMiniData: () => initialState,
    },
});

export const { setDashboardMiniData, resetDashboardMiniData } = dashboardMiniSlice.actions;
export default dashboardMiniSlice.reducer;
