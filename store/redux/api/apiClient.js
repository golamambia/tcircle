import axios from "axios";
import { API_BASE_URL } from "../../../constants/common";

const apiClient = axios.create({
    baseURL: 'hhhh',//API_BASE_URL, // Replace with your base API URL
    headers: {
        Accept: "application/json",
        "Content-Type": "text/plain",
    },
});

// Request Interceptor (for authentication)
apiClient.interceptors.request.use(
    async (config) => {
        // const token = "your-auth-token"; 
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor (error handling)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default apiClient;
