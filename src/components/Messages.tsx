import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

// Define a type for the message data entries
type MessageData = {
  dataKey: string;
  value: number;
  color: string;
  percentage: number;
};

// Define the color palette
const COLORS: string[] = ['#036440', '#274d68', '#9b9898'];

// Define the data for the messages
const messageData: MessageData[] = [
  { dataKey: 'Sent Messages', value: 273000, color: COLORS[0], percentage: (273000 / 510611) * 100 },
  { dataKey: 'Read Messages', value: 151667, color: COLORS[1], percentage: (151667 / 510611) * 100 },
  { dataKey: 'Unread Messages', value: 85944, color: COLORS[2], percentage: (85944 / 510611) * 100 },
];

// Calculate the total messages for percentage calculation
const totalMessages: number = messageData.reduce((acc, item) => acc + item.value, 0);

const Messages: React.FC = () => {
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
        height: isSmallScreen ? 'auto' : '132px',
        boxSizing: 'border-box',
      }}
    >
      {/* Heading */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#000000',
          fontSize: isSmallScreen ? '14px' : '16px',
          textAlign: 'left',
        }}
      >
        Messages
      </Typography>

      {/* Custom Multi-colored Progress Bar */}
      <Box
        sx={{
          position: 'relative',
          height: '18px',
          backgroundColor: '#E0E0E0',
          overflow: 'hidden',
          marginBottom: isSmallScreen ? '10px' : '20px',
          borderRadius: '4px',
        }}
      >
        {/* Layer each part of the progress bar based on the percentage */}
        {messageData.map((item, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              height: '100%',
              width: `${(item.value / totalMessages) * 100}%`,
              backgroundColor: item.color,
              left: `${messageData
                .slice(0, index)
                .reduce((acc, prev) => acc + (prev.value / totalMessages) * 100, 0)}%`,
            }}
          />
        ))}
      </Box>

      {/* Navigation below progress bar */}
      <Box
        mt={2}
        display="flex"
        flexDirection={isSmallScreen ? 'column' : 'row'}
        justifyContent={isSmallScreen ? 'center' : 'space-around'}
        alignItems= 'left'
        gap={isSmallScreen ? 1 : 0}
      >
        {messageData.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" mb={isSmallScreen ? 1 : 0}>
            {/* Small circle for each color */}
            <Box
              sx={{
                width: 15,
                height: 15,
                borderRadius: '50%',
                backgroundColor: item.color,
                mr: 1,
                flexShrink: 0,
              }}
            />
            {/* Value and DataKey */}
            <Typography
              variant="body2"
              sx={{
                color: 'grey',
                fontWeight: '500',
                fontSize: isSmallScreen ? '10px' : '11px',
                textAlign: 'left',
              }}
            >
              {item.value} {item.dataKey}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Messages;
