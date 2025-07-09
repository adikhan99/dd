import { InfoOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';

const AdditionalMessageBox = () => {
    return (
        <Box sx={{ width: '100%', alignItems: 'center', gap: '1rem' }}>
            <Box
                sx={{
                    bgcolor: "#dce8dc",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    position: 'absolute',
                    width: '100%',
                    bottom: '0px',
                    boxShadow: '0 0 21px 0 #19191940',
                }}
            >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: '15px', }}>
                    <Box>
                        <InfoOutlined sx={{
                            color: "#fff",
                            width: 30,
                            height: 30,
                            background: "#27652b",
                            padding: '3px',
                            borderRadius: '5px',
                        }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ color: "#27652b", fontWeight: 500 }}>
                            24 hours limit
                        </Typography>
                        <Typography sx={{ color: "#27652b", lineHeight: 1.6 }}>
                            You cannot send additional messages until the parent responds. Once the parent replies, the 24-hour conversation window will reopen, and messaging will resume as normal.
                        </Typography>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            
                        }}></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AdditionalMessageBox;
