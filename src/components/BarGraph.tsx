import React from 'react';
import { BarChart, Bar, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList, LabelProps } from 'recharts';
import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';

interface DataItem {
  dataKey: string;
  value: number;
  color: string;
}

interface CustomLabelProps extends LabelProps {
  payload?: {
    color: string;
  };
}

const COLORS = ['#01253f', '#036440', '#274d68', '#519663', '#025896'];

const data: DataItem[] = [
  { dataKey: 'Read rate', value: 80, color: COLORS[0] },
  { dataKey: 'Response rate', value: 65, color: COLORS[1] },
  { dataKey: 'Event RSVP rate', value: 90, color: COLORS[2] },
  { dataKey: 'Meeting Scheduling rate', value: 40, color: COLORS[3] },
  { dataKey: 'Attendance alert acknowledgement', value: 50, color: COLORS[4] },
];

const CustomLegend: React.FC = () => (
  <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" ml={2}>
    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', color: 'black', fontSize: '15px', textAlign: 'left' }}>
      Broadcasts
    </Typography>
    {data.map((entry, index) => (
      <Box key={index} display="flex" alignItems="center" mb={1}>
        <Box
          sx={{
            width: 15,
            height: 15,
            borderRadius: '50%',
            backgroundColor: entry.color,
            mr: 1,
            flexShrink: 0,
          }}
        />
        <Typography variant="body2" fontSize={'11px'} fontWeight={'500'} sx={{ width: '200px', textAlign: 'left' }}>
          {entry.dataKey}
        </Typography>
      </Box>
    ))}
  </Box>
);

const CustomLabel: React.FC<CustomLabelProps> = ({ x, y, width, value, payload }) => {
  if (!payload) return null;
  const barColor = payload.color;
  
  
  return (
    <text
      x={Number(x) + Number(width) / 2}
      y={Number(y) - 5}
      fill={barColor}
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ fontWeight: 'bold', fontSize: '11px' }}
    >
      {`${value}%`}
    </text>
  );
};

const BarGraph: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        width: '100%',
        maxWidth: isSmallScreen ? '95%' : isTabletScreen ? '80%' : '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        height:'100%',
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        alignItems: isSmallScreen ? 'center' : 'flex-start',
      }}
    >
      {/* Bar Chart Section */}
      <Box
        sx={{
          width: isSmallScreen ? '100%' : '50%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'left' }}>
          Rate
        </Typography>

        <ResponsiveContainer width="100%" height={isSmallScreen ? 200 : isTabletScreen ? 300 : 400}>
          <BarChart data={data} margin={{ top: 5, right: 30, bottom: 5 }} barGap={5}>
            <YAxis
              domain={[0, 100]}
              ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              tickFormatter={(tick) => `${tick}%`}
              tick={{ fontSize: '12px', fontWeight: '500' }}
            />
            <Tooltip />
            <Bar dataKey="value" barSize={isSmallScreen ? 15 : isTabletScreen ? 25 : 40} background={{ fill: '#f2f2f2' }}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList dataKey="value" content={<CustomLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Custom Legend Section */}
      <Box
        sx={{
          flexGrow: 1,
          width: isSmallScreen ? '100%' : '30%',
          mt: isSmallScreen ? 2 : 0,
          ml: isSmallScreen ? 0 : 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center vertically
          height: isSmallScreen ? 'auto' : '100%', // Adjust height for proper centering
        }}
      >
        <CustomLegend />
      </Box>
    </Box>
  );
};

export default BarGraph;
