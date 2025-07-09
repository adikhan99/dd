import {
  Box,
  Collapse,
  Switch,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControlLabel,
  Typography
} from '@mui/material';
import Icon from 'src/@core/components/icon';
import { PermissionItem } from 'src/types/userTypes';
import styles from './Modal.module.css';

interface PermissionComponentProps {
  permission: PermissionItem;
  index: number;
  expanded: boolean;
  onToggleExpand: () => void;
  onParentPermissionChange: (index: number) => void;
  onChildPermissionChange: (parentIndex: number, childIndex: number) => void;
}

export const PermissionComponent = ({
  permission,
  index,
  expanded,
  onToggleExpand,
  onParentPermissionChange,
}: PermissionComponentProps) => {
  return (
    <Box className={styles.permissionItem}>
      <ListItem
        button
        onClick={onToggleExpand}
        className={styles.permissionHeader}
      >
        <Box className={styles.toggleIcon}>
          <Icon
            icon={expanded ? 'tabler:chevron-down' : 'tabler:chevron-right'}
            color="white"
            fontSize={16}
          />
        </Box>
        <ListItemText sx={{ fontWeight: 'bold' }} primary={permission.label} />
        <ListItemSecondaryAction>
          {permission.count}
          <Switch
            edge="end"
            checked={permission.checked}
            onChange={() => onParentPermissionChange(index)}
          />
        </ListItemSecondaryAction>
      </ListItem>


      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box className={styles.permissionContent}>
          {permission.children?.map((child, childIndex) => (
            <Box key={childIndex} sx={{ mb: childIndex < permission.children!.length - 1 ? 3 : 0 }}>
              <FormControlLabel
                control={
                  <Switch
                  />
                }
                label={
                  <Box>
                    <Typography >{child.label}</Typography>
                    <Typography variant="body2">
                      {child.description}
                    </Typography>
                  </Box>
                }
                sx={{
                  m: 0,
                  opacity: permission.checked ? 0.7 : 1
                }}
              />
            </Box>
          ))}
        </Box>
      </Collapse>

    </Box>
  );
};