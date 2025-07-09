import { useState } from 'react';
import { Box, Typography, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions, useTheme, Divider } from '@mui/material';
import CustomButton from '@components/common-components/Button';

interface DisclaimerModalProps {
  open: boolean;
  onClose: () => void;
}

const DisclaimerModal = ({ open, onClose }: DisclaimerModalProps) => {
  const theme = useTheme();
  const [acceptedAuthorization, setAcceptedAuthorization] = useState(false);

  const handleClose = () => {
    if (acceptedAuthorization) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown
      sx={{
        '& .MuiDialog-paper': {
          padding: theme.spacing(4),
          borderRadius: theme.shape.borderRadius
        }
      }}
    >
      <DialogTitle>
        <h2>
        Disclaimer (to be accepted before sign-in):
        </h2>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <Box mb={3}>
        <h4><i>⚠️ Security Notice</i></h4>
        <Typography variant="body2">
                <i>This application is intended for use by authorized staff of the Australian Islamic College (AIC) only. Unauthorized access or use of this system is strictly prohibited and may constitute a breach of cybersecurity laws. All activity is monitored and recorded. By proceeding, you acknowledge and accept this condition.
                </i></Typography>
        </Box>
        <Box mb={3}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={acceptedAuthorization}
                onChange={(e) => setAcceptedAuthorization(e.target.checked)}
              />
            }
            label={
              <Typography variant="body2">
                I acknowledge that I am an authorized AIC user and understand that any unauthorized access may result in legal action.
              </Typography>
            }
          
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <CustomButton
          variant="outlined"
          onClick={handleClose}
          disabled={!acceptedAuthorization}
          className='disclaimer-button'
        >
          Ok
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default DisclaimerModal;