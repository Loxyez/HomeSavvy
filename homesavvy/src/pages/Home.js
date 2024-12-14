import React from 'react';
import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent
} from "@mui/material";

export default function Home() {
    return (
        <Box sx={{ flexGrow: 1, mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to HomeSavvy
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                        <Typography variant="h6">Manage Defects</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Easily manage and update your house defect reports.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                        <Typography variant="h6">Upload Images</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Upload images of defects for better tracking.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                    <Typography variant="h6">Real-time Updates</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Track the progress of your reported issues.
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>
            </Grid>
        </Box>
    );
}