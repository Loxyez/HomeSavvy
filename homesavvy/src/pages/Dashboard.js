import React from 'react';

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
} from "@mui/material";

function Dashboard() {

  const rows = [
    {
      id: 1,
      place: "Living Room",
      details: "Crack in the wall near the window",
      status: "Pending",
      progress: "Not Started",
    },
    {
      id: 2,
      place: "Master Bedroom",
      details: "Water leakage in the corner",
      status: "In Progress",
      progress: "50%",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Place</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.place}</TableCell>
                <TableCell>{row.details}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.progress}</TableCell>
                <TableCell>
                  <Button variant="contained" size="small">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Dashboard;