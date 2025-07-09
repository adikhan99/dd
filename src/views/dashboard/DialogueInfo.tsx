import { Box, Typography } from '@mui/material';
import styles from './DashboardView.module.css';

export const DialogueInfo = () => {
  return (
    <Box className={styles.infoSection}>
      <h3>
        What is Dialogue?
        </h3>
      <Typography variant="body1" paragraph sx={{ color: '#5f6c7b' }}>
        Dialogue is AIC's official communication platform designed to streamline conversations between the school and parents. Built with simplicity and purpose, Dialogue enables real-time messaging, broadcast alerts, and secure updates — all while keeping parent engagement high and staff communication organized.
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: '#5f6c7b' }}>
        Whether it's attendance, fees, or general updates, Dialogue ensures every message reaches the right parent, at the right time, with the right context.
      </Typography>
    </Box>
  );
};