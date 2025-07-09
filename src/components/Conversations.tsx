import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MailOutline } from '@mui/icons-material';

const COLORS = ['#274d68', '#446e8c', '#036440', '#64a374', '#ca3c18'];

const totalValue = 273000;
const conversationsData = [
    { dataKey: 'Active', value: 27, color: COLORS[0] },
    { dataKey: 'Unassigned', value: 5, color: COLORS[1] },
    { dataKey: 'Resolved', value: 60, color: COLORS[2] },
    { dataKey: 'Pending', value: 7, color: COLORS[3] },
    { dataKey: 'Escalated', value: 10, color: COLORS[4] },
];

// Function to calculate percentage
const calculatePercentage = (value: number) => ((value / totalValue) * 100).toFixed(0);

const Conversations: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                padding: '20px',
                width: '100%',
                maxWidth: isSmallScreen ? '95%' : isMediumScreen ? '80%' : '100%',
                margin: '0 auto',
                boxSizing: 'border-box',
                height: '100%',
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: isSmallScreen ? 'center' : 'space-between',
                mb: 2,
            }}
        >
            {/* Pie Chart Section */}
            <Box position="relative" width={isSmallScreen ? '100%' : '50%'} mb={isSmallScreen ? 2 : 0}>
                <ResponsiveContainer width="100%" height={isSmallScreen ? 200 : 300}>
                    <PieChart>
                        <Pie
                            data={conversationsData}
                            dataKey="value"
                            nameKey="dataKey"
                            fontSize={isSmallScreen ? '10px' : '11px'}
                            fontWeight={'500'}
                            cx="50%"
                            cy="50%"
                            outerRadius={isSmallScreen ? 70 : isMediumScreen ? 90 : 100}
                            innerRadius={isSmallScreen ? 40 : isMediumScreen ? 60 : 70}
                            fill="#3B82F6"
                            labelLine={false}
                            label={({ value }) => `${value} (${calculatePercentage(value)}%)`}
                        >
                            {conversationsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                {/* Text inside the pie chart */}
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    sx={{
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MailOutline fontSize="large" style={{ color: 'grey' }} />
                    <Typography variant="h6" color="black" textAlign="center" fontWeight={'500'}>
                        273000
                    </Typography>
                    <Typography variant="body2" color="grey" textAlign="center" fontSize={'11px'}>
                        Total Broadcasts
                    </Typography>
                </Box>
            </Box>

            {/* Conversations Data Section */}
            <Box
                width={isSmallScreen ? '100%' : '40%'}
                ml={isSmallScreen ? 0 : 4}
                textAlign="left"
                mt={isSmallScreen ? 2 : 0}
            >
                <Typography
                    variant="h6"
                    gutterBottom
                    style={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: '15px',
                        textAlign: 'left',
                    }}
                >
                    Conversations
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                    {conversationsData.map((entry, index) => (
                        <Box
                            key={index}
                            display="flex"
                            alignItems="center"
                            width="100%"
                            mb={1}
                            sx={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <Box
                                sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    backgroundColor: entry.color,
                                    mr: 1,
                                    flexShrink: 0,
                                }}
                            />
                            <Typography
                                variant="body2"
                                fontSize={'11px'}
                                fontWeight={'500'}
                                sx={{
                                    width: isSmallScreen ? 'auto' : '150px',
                                    textAlign: 'left',
                                    mr: 1,
                                }}
                            >
                                {entry.dataKey}
                            </Typography>
                            <Typography
                                variant="body2"
                                fontSize={'11px'}
                                fontWeight={'500'}
                                sx={{
                                    width: isSmallScreen ? 'auto' : '100px',
                                    textAlign: 'right',
                                }}
                            >
                                {entry.value}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Conversations;
