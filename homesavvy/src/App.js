import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddDefect from "./pages/AddDefect";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HomeSavvy D.T.A
          </Typography>
          <Button color="inherit" href="/">หน้าหลัก</Button>
          <Button color="inherit" href="/dashboard">กระดานรายละเอียด</Button>
        </Toolbar>
      </AppBar>

      {/* Main Routes */}
      <Box sx={{ p: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-defect" element={<AddDefect />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
