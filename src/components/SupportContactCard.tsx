import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';

interface SupportContactCardProps {
    member: {
        name: string;
        position: string;
        email: string;
        extension: string;
        photo: string;
    };
}

const SupportContactCard: React.FC<SupportContactCardProps> = ({ member }) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <Avatar
                        alt={member.name}
                        src={member.photo}
                        sx={{ width: 80, height: 80, marginRight: 2 }}
                    />
                    <Box>
                        <Typography variant="h6" component="div">
                            {member.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {member.position}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                    <Email sx={{ marginRight: 1, color: 'primary.main' }} />
                    <Typography variant="body1">
                        <a
                            href={`mailto:${member.email}`}
                            style={{
                                color: 'inherit',
                                textDecoration: 'underline',
                            }}
                        >
                            {member.email}
                        </a>
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Phone sx={{ marginRight: 1, color: 'primary.main' }} />
                    <Typography variant="body1">
                        Ext: {member.extension}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SupportContactCard;
