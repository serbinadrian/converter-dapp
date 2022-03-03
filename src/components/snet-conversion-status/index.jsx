import { Box, Button, Grid, Typography } from '@mui/material';
import propTypes from 'prop-types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SnetDialog from '../snet-dialog';
import ColorCodes from '../../assets/theme/colorCodes';
import SnetButton from '../snet-button';

const SnetConversionStatus = ({ link, isDialogOpen, onDialogClose, title, amount, tokenName }) => {
  const openLink = () => {
    window.open(link, '_blank');
  };

  return (
    <SnetDialog isDialogOpen={isDialogOpen} onDialogClose={onDialogClose} title={title} showClosebutton>
      <Grid xs={12} padding={4}>
        <Box paddingY={2} display="flex" alignItems="center">
          <CheckCircleOutlineIcon color="success" />
          <Typography align="center" color="grey" variant="body2" marginLeft={2}>
            Tokens conversion successfully initiated.
          </Typography>
        </Box>
        <Box minWidth={640}>
          <Typography variant="body2" marginY={2}>
            Transaction Receipt
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between" padding={4} sx={{ backgroundColor: `${ColorCodes.lightGray} !important` }}>
            <Typography variant="body2">Tokens Converted</Typography>
            <Typography variant="body1">
              {amount} {tokenName}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-evenly" padding={4}>
            <Button variant="text" onClick={openLink}>
              View transaction history
            </Button>
            <SnetButton onClick={onDialogClose} name="Finish" />
          </Box>
        </Box>
      </Grid>
    </SnetDialog>
  );
};

SnetConversionStatus.propTypes = {
  title: propTypes.string.isRequired,
  isDialogOpen: propTypes.bool.isRequired,
  onDialogClose: propTypes.func.isRequired,
  link: propTypes.string.isRequired,
  amount: propTypes.string.isRequired,
  tokenName: propTypes.string.isRequired
};

export default SnetConversionStatus;
