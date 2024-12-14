import axios from 'axios';
import config from '../utils/config';

// Get all defects
export const getDefects = async () => {
    try {
        const response = await axios.get(`${config.apiBaseUrl}/defects`);
        return response.data;
    } catch (error) {
        console.error('Error while fetching defects:', error);
        throw error;
    }
};

// Add a new defect
export const addDefect = async (defect) => {
    try {
        const response = await axios.post(`${config.apiBaseUrl}/defects`, defect, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error while adding defect:', error);
        throw error;
    }
};