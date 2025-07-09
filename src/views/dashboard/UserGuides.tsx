import { Box } from '@mui/material';
import styles from './DashboardView.module.css';

export const UserGuides = () => {
  return (
    <Box className={styles.userGuidesSection}>
      <h3>User Guides</h3>
      <a href='/user-guide.pdf' className={styles.userGuideLink} target="_blank">Staff User Guide</a>
    </Box>
  );
};