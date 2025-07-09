import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from './Button';

interface DialogProps {
  title: any;
  message?: string;
  isOpen: boolean;
  onClose: () => void;
  actions?: { label: string; onClick: () => void; color?: 'primary' | 'secondary' }[];
  sx?: object;
  children?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  showDivider?: boolean;
}

const CustomDialog: React.FC<DialogProps> = ({ 
  title, 
  message, 
  isOpen, 
  onClose, 
  actions, 
  sx, 
  children,
  maxWidth = 'sm',
  fullWidth = true,
  showDivider = true
}) => {
  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      sx={sx}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <DialogTitle sx={{ 
        pb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {showDivider && <Divider />}
      {children ? (
        <DialogContent>
          {children}
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      )}
      {actions && (
        <>
          {showDivider && <Divider />}
          <DialogActions sx={{ p: theme => `${theme.spacing(3)} !important` }}>
            {actions.map((action) => (
              <CustomButton
                key={action.label}
                onClick={action.onClick}
                color={action.color || 'secondary'}
                variant="contained"
              >
                {action.label}
              </CustomButton>
            ))}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default CustomDialog;