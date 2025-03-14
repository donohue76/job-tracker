// src/api.js

import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

// Profile functions
export const getProfile = async () => {
    try {
        const response = await api.get("profile/"); // Replace with your actual profile endpoint
        return response.data;
    } catch (error) {
        return Promise.reject(extractErrorMessage(error));
    }
};

export const updateProfile = async (profileData) => {
    try {
        const response = await api.put("profile/", profileData); // Replace with your actual profile endpoint
        return response.data;
    } catch (error) {
        return Promise.reject(extractErrorMessage(error));
    }
};

export const uploadProfileImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('avatar', file); // Assuming your backend expects the file to be named 'avatar'
        const response = await api.post("profile/upload_avatar/", formData, { // Replace with your actual upload avatar endpoint
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        return Promise.reject(extractErrorMessage(error));
    }
};

// Function to refresh the token
const refreshToken = async () => {
    const authStore = useAuthStore();
    try {
        const response = await axios.post(`${API_BASE_URL}token/refresh/`, {
            refresh: authStore.refreshToken
        });

        const newAccessToken = response.data.access;
        authStore.accessToken = newAccessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // Ensure all future requests use the new token
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

        return newAccessToken;
    } catch (error) {
        console.error("Token refresh failed", error);
        authStore.logout(); // Immediately log out if refresh fails
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

        if (error.response) {
            // Handle Unauthorized (401) - Attempt token refresh
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const newAccessToken = await refreshToken();

                if (newAccessToken) {
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            }

            // Handle common errors
            const status = error.response.status;
            if (status === 403) {
                return Promise.reject({ message: "Access denied. You do not have permission." });
            }
            if (status === 400) {
                return Promise.reject({
                    message: "Bad request. Please check your input.",
                    details: error.response.data
                });
            }
            if (status >= 500) {
                return Promise.reject({ message: "Server error. Please try again later." });
            }
        }

        return Promise.reject(error);
    }
);

// General function to extract error messages
const extractErrorMessage = (error) => {
    console.error("API Error:", error);

    if (error.response) {
        // Safely handle different error formats
        const details = error.response.data;
        if (details?.username) {
            return { message: details.username[0], details };
        }
        if (details?.error) {
            return { message: details.error, details };
        }
        if (details?.message) {
            return { message: details.message, details };
        }
        return { message: "An unknown error occurred.", details };
    }

    return { message: "Network error. Please check your connection." };
};

// Authentication functions
export async function loginUser(username, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error);
    throw error;
  }
}

export async function registerUser(username, email, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/register/`, {
      username,
      email,
      password,
    });
    console.log("Registration successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error);
    throw error;
  }
};


// Job functions
export const getJobs = async () => {
    try {
        const response = await api.get("jobs/");
        return response.data;
    } catch (error) {
        return Promise.reject(extractErrorMessage(error));
    }
};

export const addJob = async (jobData) => {
    try {
        const response = await api.post("jobs/", jobData);
        return response.data;
    } catch (error) {
        return Promise.reject(extractErrorMessage(error));
    }
};

export const updateJob = async (jobId, jobData) => {
    try {
        const response = await api.put(`jobs/${jobId}/`, jobData);
        return response.data;
    } catch (error) {
        return Promise.reject(extractErrorMessage(error));
    }
};

export const deleteJob = async (jobId) => {
    try {
        await api.delete(`jobs/${jobId}/`);
    } catch (error) {
        return Promise.reject(extractErrorMessage(error));
    }
};