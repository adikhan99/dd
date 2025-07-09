import { Skeleton } from "@mui/material"
import { Box, Typography } from "@mui/material"

export default function StudentPhotoSkeleton() {
    return (
        <Box sx={{ mx: "auto", p: 2 }}>
            {/* Header Section */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" component="div" sx={{ display: "flex", alignItems: "center" }}>
                    <Skeleton width={150} height={32} />
                </Typography>
            </Box>

            {/* Student Selection Section */}
            <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'flexStart', mb: 4, pl: 1 }}>
                <Box sx={{
                    width: '230px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Skeleton variant="circular" width={80} height={80} sx={{ mr: 2 }} />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Skeleton width={150} height={24} />
                    </Box>
                </Box>
            </Box>

            {/* Message Category Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                    <Skeleton width={180} height={32} />
                </Typography>
                <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 1 }} />
            </Box>
        </Box>
    )
}
