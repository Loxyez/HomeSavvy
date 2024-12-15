import React, { useEffect, useState } from 'react';
import { getDefects, updateDefect } from '../api/defectService';
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
  DialogActions,
  CircularProgress
} from "@mui/material";
import { Visibility as VisibilityIcon, Edit as EditIcon } from '@mui/icons-material';
import UpdateStatusDialog from './UpdateStatusDialog';

function Dashboard() {
  const [defects, setDefects] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [selectedDefect, setSelectedDefect] = React.useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const defects = await getDefects();
        setDefects(defects);
        setLoading(false);
      } catch (error) {
        console.error('Error while fetching defects:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleImageLoad = () => {
    setImageLoading(false); // Set loading to false when image is loaded
  };

  const fetchData = async () => {
    try {
      const defects = await getDefects();
      setDefects(defects);
    } catch (error) {
      console.error('Error while fetching defects:', error);
    }
  };

  const handleViewDefect = (defect) => {
    setSelectedDefect(defect);
    setOpenDialog(true);
    setImageLoading(true);  // Set imageLoading to true when dialog is opened
  };

  const handleOpenDialog = (defect) => {
    setSelectedDefect(defect);
    setOpenDialog(true);
    setImageLoading(true);  // Reset the image loading state for each dialog open
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDefect(null);
  };

  const handleOpenDialogEdit = (defect) => {
    setSelectedDefect(defect);
    setOpenDialogEdit(true);
  };

  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
    setSelectedDefect(null);
  };

  const handleUpdate = async (updatedData) => {
    try {
      setLoading(true);
      await updateDefect(selectedDefect.defect_id, updatedData);
      fetchData();
      setLoading(false);
    } catch (error) {
      console.error('Failed to update defect:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        รายการ Defect ของบ้าน 1088/45
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button variant="contained" onClick={() => navigate('/add-defect')}>
          Add Defect
        </Button>
      </div>

      {/* Show loading spinner while fetching defects */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>สถานที่</TableCell>
                <TableCell>รายละเอียด</TableCell>
                <TableCell>สถานะ</TableCell>
                <TableCell>ความคืบหน้า</TableCell>
                <TableCell>ดูรูปภาพ / อัพเดตสถานะ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {defects.map((defect) => (
                <TableRow key={defect.defect_id}>
                  <TableCell>{defect.place}</TableCell>
                  <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{defect.detail}</TableCell>
                  <TableCell>{defect.status === "Pending" ? "รอทำการแก้ไข" : defect.status}</TableCell>
                  <TableCell>{defect.progress === "Not Started" ? "รอดำเนินการ" : defect.progress}</TableCell>
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
                    <Button variant="outlined" onClick={() => handleOpenDialogEdit(defect)}>
                      อัพเดทสถานะ
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {selectedDefect && (
        <UpdateStatusDialog
          open={openDialogEdit}
          onClose={handleCloseDialogEdit}
          onSubmit={handleUpdate}
          initialData={selectedDefect}
        />
      )}

      {/* Dialog to view defect details and images */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>ข้อมูล Defects</DialogTitle>
        <DialogContent>
          {selectedDefect && (
            <>
              <Typography variant="h6">สถานที: {selectedDefect.place}</Typography>
              <Typography variant="body1">รายละเอียด: {selectedDefect.detail}</Typography>
              <Typography variant="body2">สถานะ: {selectedDefect.status === "Pending" ? "รอทำการแก้ไข" : selectedDefect.status}</Typography>
              <Typography variant="body2">ความคืบหน้า: {selectedDefect.progress === "Not Started" ? "รอดำเนินการ" : selectedDefect.progress}</Typography>

              <Box sx={{ mt: 2 }}>
                {imageLoading && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                  </Box>
                )}

                {selectedDefect.pictures.map((picture, index) => (
                  <img
                    key={index}
                    src={`${picture}`}
                    alt={`Defect ${selectedDefect.defect_id} Image ${index + 1}`}
                    style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                    onLoad={handleImageLoad} // Trigger the loading state change once image is loaded
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