import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

export const getJobs = async () => {
    const response = await axios.get(`${API_BASE_URL}jobs/`);
    return response.data;
};

export const addJob = async (jobData) => {
    const response = await axios.post(`${API_BASE_URL}jobs/`, jobData);
    return response.data;
};