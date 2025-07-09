import { useRouter } from 'next/router';
import { Typography, Container } from '@mui/material';
import BroadcastLogsTable from 'src/views/broadcast-management/BroadcastLogsTable';
import { PermissionsEnum } from '@utils/constants';

const BroadcastLogPage = () => {
    const router = useRouter();
    const { broadcast_id } = router.query; // Access the dynamic route parameter

    // Ensure the broadcastId is available before rendering
    if (!broadcast_id || typeof broadcast_id !== 'string') {
        return <Typography variant="h6" color="error">Broadcast ID not found!</Typography>;
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Broadcast Logs Detail
            </Typography>
            <BroadcastLogsTable broadcastId={broadcast_id} />
        </Container>
    );
}


BroadcastLogPage.authProps = {
    allowedRoles: [],
    allowedPermission: [PermissionsEnum.BROADCAST_MESSAGE_MODULE, PermissionsEnum.BROADCAST_MESSAGE_SEND_BROADCAST]
}
export default BroadcastLogPage
