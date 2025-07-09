import React from 'react';
import { Box, Grid, List, ListItem } from '@mui/material';
import styles from './SupportView.module.css';
import SupportContactCard from '@components/SupportContactCard';

interface SupportTeamMember {
    name: string;
    position: string;
    email: string;
    extension: string;
    photo: string;
}

const supportTeam: SupportTeamMember[] = [
    {
        name: 'Abdus Sami Patel',
        position: 'ERP Consultant (Technical)',
        email: 'bcconsultant6@aic.wa.edu.au',
        extension: '294',
        photo: '/images/support/sami.png'
    },
    {
        name: 'Saba Salman',
        position: 'ERP Consultant (Functional)',
        email: 'bcconsultant7@aic.wa.edu.au',
        extension: '298',
        photo: '/images/support/saba.png'
    }
];

const supportAreas: string[] = [
    'Technical issues (login, message errors, etc.)',
    'Training for sending broadcasts',
    'Assistance in using Dialogue\'s features',
    'Troubleshooting parent replies or message statuses',
    'Understanding reports and analytics',
    'Account and user role management'
];

const SupportView: React.FC = () => {
    return (
        <Box>
            <h2>For Support, Please Contact:</h2>

            {/* Support Team Cards */}
            <Grid container spacing={3} className={styles.cardGrid}>
                {supportTeam.map((member, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <SupportContactCard member={member} />
                    </Grid>
                ))}
            </Grid>

            <h2>We Provide Support For:</h2>
            <List component="ul" className={styles.supportList}>
                {supportAreas.map((area, index) => (
                    <ListItem component="li" key={index} className={styles.supportListItem}>
                        {area}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default SupportView;
