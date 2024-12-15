import React, { useEffect, useState } from 'react';
import { getDefects } from '../api/defectService';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { Visibility as VisibilityIcon, Edit as EditIcon } from '@mui/icons-material';
import config from '../utils/config';

function Dashboard() {

  const [defects, setDefects] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedDefect, setSelectedDefect] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const defects = await getDefects();
        setDefects(defects);
      } catch (error) {
        console.error('Error while fetching defects:', error);
      }
    };
    fetchData();
  }, []);

  const handleViewDefect = (defect) => {
    setSelectedDefect(defect);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDefect(null);
  }

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Defect Reports 1088/45
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button variant="contained" onClick={() => navigate('/add-defect')}>
          Add Defect
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Place</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {defects.map((defect) => (
              <TableRow key={defect.defect_id}>
                <TableCell>{defect.place}</TableCell>
                <TableCell>{defect.detail}</TableCell>
                <TableCell>{defect.status}</TableCell>
                <TableCell>{defect.progress}</TableCell>
                <TableCell>
                  {/* Button to show pictures in a dialog */}
                  {defect.pictures && defect.pictures.length > 0 && (
                    <IconButton
                      onClick={() => handleViewDefect(defect)}
                      color="primary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  )}
                  {' '}
                  <Button variant="contained" size="small">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog to view defect details and images */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Defect Details</DialogTitle>
        <DialogContent>
          {selectedDefect && (
            <>
              <Typography variant="h6">Place: {selectedDefect.place}</Typography>
              <Typography variant="body1">Detail: {selectedDefect.detail}</Typography>
              <Typography variant="body2">Status: {selectedDefect.status}</Typography>
              <Typography variant="body2">Progress: {selectedDefect.progress}</Typography>

              <Box sx={{ mt: 2 }}>
                {selectedDefect.pictures.map((picture, index) => (
                  <img
                    key={index}
                    src={`${picture}`}
                    alt={`Defect ${selectedDefect.defect_id} Image ${index + 1}`}
                    style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                  />
                ))}
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Dashboard;