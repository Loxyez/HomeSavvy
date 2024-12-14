import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDefect } from '../api/defectService';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const AddDefect = () => {
  const [formData, setFormData] = useState({
    place: '',
    detail: '',
    photo: null, // To store the file
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, photo: file }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear errors

    console.log('Form Data:', formData);

    try {
      const formDataToSend = new FormData(); // Create FormData object
      formDataToSend.append('place', formData.place);
      formDataToSend.append('detail', formData.detail);

      // Append file if selected
      if (formData.photo) {
        formDataToSend.append('picture', formData.photo);
      }

      await addDefect(formDataToSend);
      navigate('/dashboard'); // Redirect after successful submission
    } catch (err) {
      console.error('Failed to add defect:', err);
      setError('Failed to add defect. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Defect
        </Typography>

        {/* Display Error */}
        {error && (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        )}

        {/* Add Defect Form */}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            label="Place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Detail"
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />

          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: '16px', marginBottom: '16px' }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Submit
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
            fullWidth
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddDefect;