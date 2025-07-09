import { Box, Typography, Switch } from '@mui/material';
import styles from './Modal.module.css';

interface AdminToggleProps {
  isAdmin: boolean;
  onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AdminToggleComponent = ({ isAdmin, onToggle }: AdminToggleProps) => (
  <Box className={styles.adminToggle}>
    <Switch checked={isAdmin} onChange={onToggle} />
    <Typography className={styles.adminToggleLabel}>Admin</Typography>
  </Box>
);