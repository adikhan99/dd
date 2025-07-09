import { Grid, Card, CardContent, Typography, Link } from '@mui/material';
import styles from './DashboardView.module.css';

const tiles = [
  { 
    title: 'Broadcast', 
    path: '/broadcast-message', 
    description: 'Send messages to multiple parents',
    variant: 'secondary'
  },
  { 
    title: 'Individual Message', 
    path: '/individual-message', 
    description: 'Send a message to a single parent',
    variant: 'secondary'
  },
  { 
    title: 'Inbox', 
    path: '/inbox', 
    description: 'View and manage received messages',
    variant: 'secondary'
  },
  { 
    title: 'Roles and Permissions', 
    path: '/roles-and-permissions', 
    description: 'Manage user access levels',
    variant: 'secondary'
  },
  { 
    title: 'Support', 
    path: '/support', 
    description: 'Get help with the platform',
    variant: 'secondary'
  },
];

export const NavigationTiles = () => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {tiles.map((tile) => (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={tile.title}>
          <Card className={`${styles.tileCard} ${tile.variant === 'primary' ? styles.primaryTile : styles.secondaryTile}`}>
            <Link href={tile.path} underline="none" sx={{ display: 'block', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom className={styles.tileTitle}>
                  {tile.title}
                </Typography>
                <Typography variant="body2" className={styles.tileDescription}>
                  {tile.description}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};