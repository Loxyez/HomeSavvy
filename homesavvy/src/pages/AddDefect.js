import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDefect } from '../api/defectService';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';

const AddDefect = () => {
  const [formData, setFormData] = useState({
    place: '',
    detail: '',
    photo: null, // To store the file
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    console.log('File Selected:', e.target.files[0]); // Log the file
    setFormData({ ...formData, photo: e.target.files[0] });
  };  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear errors
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('place', formData.place);
      formDataToSend.append('detail', formData.detail);

      if (formData.photo) {
        formDataToSend.append('picture', formData.photo);
      }

      // Log FormData
      for (var pair of formDataToSend.entries()) {
          console.log(pair[0]+ ', ' + pair[1]); 
      }

      // get return from await addDefect(formDataToSend)
      await addDefect(formDataToSend);
      setLoading(false);
      navigate('/dashboard'); // Redirect after successful submission
    } catch (err) {
      console.error('Failed to add defect:', err);
      setError('Failed to add defect. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          เพิมรายการ Defect ใหม่
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
            label="สถานที่"
            name="place"
            value={formData.place}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="รายระเอียด"
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
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'บันทึกข้อมูล'
            )}
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
            fullWidth
            onClick={() => navigate('/')}
          >
            ยกเลิก
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddDefect;
