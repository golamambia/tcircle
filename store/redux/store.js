import { configureStore } from "@reduxjs/toolkit"
import currentUserReducer from "./currentUser"
import loaderReducer from "./loaderSlice"
import dashboardReducer from "./dashboardSlice"
import dashboardMiniReducer from "./dashboardMiniSlice"

export const store = configureStore({
    reducer: {
        currentUserDetails: currentUserReducer,
        loader: loaderReducer,
        dashboard: dashboardReducer,
        dashboardMini: dashboardMiniReducer,
    }
})
