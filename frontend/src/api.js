import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

// Function to refresh the token
const refreshToken = async () => {
    const authStore = useAuthStore();
    try {
        const response = await axios.post(`${API_BASE_URL}token/refresh/`, {
            refresh: authStore.refreshToken
        });
        authStore.accessToken = response.data.access;
        localStorage.setItem('accessToken', response.data.access);
        return response.data.access;
    } catch (error) {
        console.error("Token refresh failed", error);
        authStore.logout();
        return null;
    }
};

// Request Interceptor: Attach Access Token
api.interceptors.request.use(
    async (config) => {
        const authStore = useAuthStore();
        if (authStore.accessToken) {
            config.headers.Authorization = `Bearer ${authStore.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiry & Errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const authStore = useAuthStore();
        const originalRequest = error.config;

        // Handle Unauthorized (401)
        if (error.response) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true; // Prevent infinite loops
                const newAccessToken = await refreshToken();

                if (newAccessToken) {
                    api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            }

            // Handle Forbidden (403)
            if (error.response.status === 403) {
                console.error("Access denied: You do not have permission.");
                return Promise.reject({
                    message: "Access denied. You do not have permission to perform this action.",
                });
            }

            // Handle Bad Request (400)
            if (error.response.status === 400) {
                return Promise.reject({
                    message: "Bad request. Please check your input.",
                    details: error.response.data,
                });
            }

            // Handle Server Errors (500+)
            if (error.response.status >= 500) {
                return Promise.reject({
                    message: "Server error. Please try again later.",
                });
            }
        }

        return Promise.reject(error);
    }
);

// Authentication functions with structured error handling
export const loginUser = async (username, password) => {
    try {
        const response = await api.post("token/", { username, password });
        return response.data;
    } catch (error) {
        console.error("Login failed", error);
        throw error.response?.data || { message: "Login failed. Please try again." };
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post("register/", userData);
        return response.data;
    } catch (error) {
        console.error("Registration failed", error);
        throw error.response?.data || { message: "Registration failed. Please check your input." };
    }
};

// Job functions with improved error handling
export const getJobs = async () => {
    try {
        const response = await api.get("jobs/");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch jobs", error);
        throw error.response?.data || { message: "Failed to retrieve jobs." };
    }
};

export const addJob = async (jobData) => {
    try {
        const response = await api.post("jobs/", jobData);
        return response.data;
    } catch (error) {
        console.error("Failed to add job", error);
        throw error.response?.data || { message: "Failed to add job." };
    }
};

export const updateJob = async (jobId, jobData) => {
    try {
        const response = await api.put(`jobs/${jobId}/`, jobData);
        return response.data;
    } catch (error) {
        console.error("Failed to update job", error);
        throw error.response?.data || { message: "Failed to update job." };
    }
};

export const deleteJob = async (jobId) => {
    try {
        await api.delete(`jobs/${jobId}/`);
    } catch (error) {
        console.error("Failed to delete job", error);
        throw error.response?.data || { message: "Failed to delete job." };
    }
};