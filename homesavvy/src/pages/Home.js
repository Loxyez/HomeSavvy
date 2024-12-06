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
        // <div>
        //     <h1>Welcome to Defect Tracker for 1088/45</h1>
        //     <p>
        //         This is the home page for the Defect Tracker for 1088/45. You can use this app to track defects in your projects.
        //     </p>
        // </div>
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