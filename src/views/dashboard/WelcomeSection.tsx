import { Box } from '@mui/material';
import { User } from '@ts-types/generated';
import styles from './DashboardView.module.css';

interface WelcomeSectionProps {
  user: User | null;
}

export const WelcomeSection = ({ user }: WelcomeSectionProps) => {
  const displayName = user?.username || 'User';
  
  return (
    <Box className={styles.welcomeSection}>
      <h2>Welcome, {displayName}</h2>
    </Box>
  );
};