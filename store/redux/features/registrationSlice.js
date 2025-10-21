import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPin } from "../api/registrationApi";
import RegistrationService from "../../../services/registration";

export const fetchUsers = createAsyncThunk("customer/login", async (payload, { rejectWithValue }) => {
    try {
        console.log('payload', payload);
        const response = await RegistrationService.loginPin(payload);//loginPin(payload);
        console.log('response', response);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        return rejectWithValue(error.response?.data || 'Login failed');
    }
});
const registrationSlice = createSlice({
    name: "registrationSlice",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
            
    },
});

export default registrationSlice.reducer;
