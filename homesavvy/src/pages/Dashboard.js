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
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Chip
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
  const [filter, setFilter] = useState('');
  const [progressFilter, setProgressFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  const progressMapping = {
    'Not Started': 'รอดำเนินการ',
    'In Progress': 'กำลังดำเนินการ',
    'Completed': 'เสร็จสิ้น',
  };
  
  const statusMapping = {
    'Pending': 'รอดำเนินการ',
  };

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Update filter when user selects a value
  };

  const handleProgressFilterChange = (event) => {
    setProgressFilter(event.target.value); // Update filter when user selects a value
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value); // Update filter when user selects a value
  };

  const filteredDefects = defects.filter((defect) => 
    (!filter || defect.place.includes(filter)) && 
    (!progressFilter || defect.progress.includes(progressFilter)) &&
    (!statusFilter || defect.status.includes(statusFilter))
  );

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

  const uniquePlaces = [...new Set(defects.map(defect => defect.place))].sort();
  const uniqueProgress = [...new Set(defects.map(defect => defect.progress))].sort();
  const uniqueStatus = [...new Set(defects.map(defect => defect.status))].sort();

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        รายการ Defect ของบ้าน 1088/45 รอบแรก
      </Typography>


      {/* Filter Section */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: 2, // Adds spacing between filters
          mb: 3 // Bottom margin
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>สถานที่</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="เลือกสถานที่">
            <MenuItem value="">ทั้งหมด</MenuItem>
            {uniquePlaces.map((place) => (
              <MenuItem key={place} value={place}>{place}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>ความคืบหน้า</InputLabel>
          <Select value={progressFilter} onChange={handleProgressFilterChange} label="เลือกความคืบหน้า">
            <MenuItem value="">ทั้งหมด</MenuItem>
            {uniqueProgress.map((progress) => (
              <MenuItem key={progress} value={progress}>
                {progressMapping[progress] || progress}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>สถานะ</InputLabel>
          <Select value={statusFilter} onChange={handleStatusFilterChange} label="เลือกสถานะ">
            <MenuItem value="">ทั้งหมด</MenuItem>
            {uniqueStatus.map((status) => (
              <MenuItem key={status} value={status}>
                {statusMapping[status] || status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button variant="contained" onClick={() => navigate('/add-defect')}>
          Add Defect
        </Button>
      </div>
      
      {/* show note that table can scroll left right */}
      <Typography variant="body2" align="center" gutterBottom>
        หมายเหตุ: สามารถเลื่อนตารางซ้ายขวาได้
      </Typography>

      {/* Show loading spinner while fetching defects */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f4f4f4"}}>
                <TableCell>สถานที่</TableCell>
                <TableCell>รายละเอียด</TableCell>
                <TableCell>ดูรูปภาพ / อัพเดตสถานะ</TableCell>
                <TableCell>สถานะ</TableCell>
                <TableCell>ความคืบหน้า</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDefects.map((defect) => (
                <TableRow key={defect.defect_id}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                    '&:hover': { backgroundColor: '#e0f7fa' },
                    cursor: 'pointer'
                  }}
                >
                  <TableCell>{defect.place}</TableCell>
                  <TableCell>
                    <Tooltip title={defect.detail}>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', maxWidth: '200px' }}>
                        {defect.detail}
                      </span>
                    </Tooltip>
                  </TableCell>
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
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={defect.status === "Pending" ? "รอทำการแก้ไข" : defect.status}
                      color={defect.status === "Pending" ? "warning" : "success"}
                      variant="outlined"
                      size="small"
                    />
                    <IconButton color="primary" onClick={() => handleOpenDialogEdit(defect)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{defect.progress === "Not Started" ? "รอดำเนินการ" : defect.progress}</TableCell>
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