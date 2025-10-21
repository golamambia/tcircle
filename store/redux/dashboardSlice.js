import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Balance: null,
    BalanceAmt: null,
    BalanceQty: null,
    BasePrice: null,
    BookingWindowStatus: null,
    DONumber: null,
    DashboardList: null,
    DoValidity: null,
    DocValid: null,
    IsReverseCamAvailableNo: null,
    LicenseApplicable: null,
    LicenseNo: null,
    LicenseValidity: null,
    LimitApplicable: null,
    MTDSalesQty: null,
    Msg: null,
    OnDateSalesQty: null,
    PermitLimit: null,
    ProductName: null,
    Quantity: null,
    Rate: null,
    ReconciledDate: null,
    StatusCode: null,
    YTDSalesQty: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashboardData: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetDashboardData: () => initialState,
    },
});

export const { setDashboardData, resetDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
