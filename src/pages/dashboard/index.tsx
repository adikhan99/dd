import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuthCredentials } from '@store/apps/auth';
import { DialogueInfo } from '@views/dashboard/DialogueInfo';
import { NavigationTiles } from '@views/dashboard/NavigationTiles';
import { UserGuides } from '@views/dashboard/UserGuides';
import { WelcomeSection } from '@views/dashboard/WelcomeSection';

const Dashboard: React.FC = () => {
  const { authValues } = useAuthCredentials(); 
  if (!authValues.user && !authValues.token) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Unauthenticated state (Won't be used in any case since unauthenticated users are redirected to /login)
  if (!authValues.user) {
    return (
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h6">You need to log in to access this page.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1200px' }}>
      <WelcomeSection user={authValues.user} />
      <NavigationTiles />
      <DialogueInfo />
      <UserGuides />
    </Box>
  );
};

(Dashboard as any).authProps = {
  allowedRoles: ['admin', 'staff'],
  adminStaffPermissions: ['view_dashboard']
}

export default Dashboard;