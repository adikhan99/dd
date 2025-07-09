import { Box, Typography } from '@mui/material';
import Icon from 'src/@core/components/icon';
import styles from './Modal.module.css';

export const AdminInfoBox = () => (
  <Box className={styles.adminInfoBox}>
    <Box className={styles.infoIcon}>
      <Icon icon={'tabler:info-circle'} color="white" fontSize={16} />
    </Box>
    <Typography sx={{ color: 'secondary.main' }}>
      The Admin role has access to all features in Dialogue.
    </Typography>
  </Box>
);