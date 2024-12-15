import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const UpdateStatusDialog = ({ open, onClose, onSubmit, initialData }) => {
  const [status, setStatus] = useState(initialData.status || '');
  const [progress, setProgress] = useState(initialData.progress || '');

  const handleSubmit = () => {
    onSubmit({ status, progress });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Status and Progress</DialogTitle>
        <DialogContent>
            <FormControl fullWidth margin="normal">
                <InputLabel>สถานะ</InputLabel>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <MenuItem value="Pending">รอทำการแก้ไข</MenuItem>
                <MenuItem value="กำลังดำเนินการแก้ไข">กำลังดำเนินการแก้ไข</MenuItem>
                <MenuItem value="ไม่สามารถแก้ไขได้">ไม่สามารถแก้ไขได้</MenuItem>
                <MenuItem value="แก้ไขเรียบร้อย">แก้ไขเรียบร้อย</MenuItem>
                <MenuItem value="การดำเนินการล่าช้า">การดำเนินการล่าช้า</MenuItem>
                <MenuItem value="รอวัสดุ">รอวัสดุ</MenuItem>
                <MenuItem value="ระงับชั่วคราว">ระงับชั่วคราว</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>ความคืบหน้า</InputLabel>
                <Select value={progress} onChange={(e) => setProgress(e.target.value)}>
                <MenuItem value="Not Started">รอดำเนินการแก้ไข</MenuItem>
                <MenuItem value="กำลังดำเนินการเก็บรายระเอียด">กำลังดำเนินการเก็บรายระเอียด</MenuItem>
                <MenuItem value="รอของสำหรับติดตั้ง">รอของสำหรับติดตั้ง</MenuItem>
                <MenuItem value="พร้อมติดตั้ง">พร้อมติดตั้ง</MenuItem>
                <MenuItem value="การติดตั้งเสร็จสิ้น">การติดตั้งเสร็จสิ้น</MenuItem>
                <MenuItem value="พร้อมส่งมอบ">พร้อมส่งมอบ</MenuItem>
                <MenuItem value="เสร็จสมบูรณ์">เสร็จสมบูรณ์</MenuItem>
                </Select>
            </FormControl>
        </DialogContent>

        <DialogActions>
            <Button onClick={onClose} color="secondary">Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">Update</Button>
        </DialogActions>
    </Dialog>
  );
};

export default UpdateStatusDialog;
