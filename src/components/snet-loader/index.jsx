import { Box, Typography, CircularProgress } from '@mui/material';
import propTypes from 'prop-types';
import SnetDialog from '../snet-dialog';

const SnetLoader = ({ isDialogOpen, onDialogClose, dialogTitle, dialogBody }) => {
  return (
    <SnetDialog isDialogOpen={isDialogOpen} onDialogClose={onDialogClose} dialogTitle={dialogTitle} showClosebutton={false}>
      <Box sx={{ padding: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 4 }}>
          <CircularProgress />
        </Box>
        <Typography variant="body2">{dialogBody}</Typography>
      </Box>
    </SnetDialog>
  );
};

SnetLoader.propTypes = {
  isDialogOpen: propTypes.bool.isRequired,
  onDialogClose: propTypes.func.isRequired,
  dialogTitle: propTypes.func.isRequired,
  dialogBody: propTypes.func.isRequired
};

export default SnetLoader;
