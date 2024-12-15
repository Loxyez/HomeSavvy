import React from 'react';
import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Button,
} from "@mui/material";
import {
    CheckCircle,
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1, mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to HomeSavvy
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                        <Typography variant="h6">AP-Pleno Fashio-Ramintha 1088/45</Typography>
                            <Button
                                onClick={() => {
                                    navigate('/dashboard');
                                }}
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2, width: '100%' }}
                                startIcon={<CheckCircle />}
                            >
                                ไปทีหน้าตรวจสอบสถานะ
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}