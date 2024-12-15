import axios from 'axios';
import config from '../utils/config';

// Get all defects with default null handling
export const getDefects = async () => {
    try {
        const response = await axios.get(`https://home-savvy-lambda.vercel.app/defects`);
        const defects = response.data.map((defect) => {
            defect.place = defect.place || 'Unknown Place';   // Default if null/undefined
            defect.detail = defect.detail || 'No details provided';  // Default if null/undefined
            defect.status = defect.status || 'Pending';  // Default if null/undefined
            defect.progress = defect.progress || 'Not Started';  // Default if null/undefined
            defect.pictures = Array.isArray(defect.pictures) ? defect.pictures : [];  // Default if null/undefined
            return defect;
        });
        return defects;
    } catch (error) {
        console.error('Error while fetching defects:', error);
        throw error;
    }
};

// Add a new defect
export const addDefect = async (formData) => {
    console.log('Adding defect:', formData);
    try {
        const response = await axios.post('https://home-savvy-lambda.vercel.app/defects', formData);

        const { defect, uploadUrl } = response.data;

        if (formData.photo) {
            const uploadResponse = await axios.post(uploadUrl, formData.photo, {
                headers: {
                    'Content-Type': formData.photo.type
                }
            });
            console.log('Upload response:', uploadResponse);
        }

        return response.data;
    } catch (error) {
        console.error('Error while adding defect:', error);
        throw error;
    }
};
