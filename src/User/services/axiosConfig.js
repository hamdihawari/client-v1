import axios from 'axios';

// Create an axios instance with a base URL and any other configuration
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your actual base URL
});

// Add a response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const errorMsg = error.response?.data?.message || error.message;
        return Promise.reject(new Error(errorMsg));
    }
);

export default axiosInstance;
