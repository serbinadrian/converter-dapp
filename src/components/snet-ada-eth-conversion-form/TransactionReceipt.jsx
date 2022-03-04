import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Stack, Typography, Box } from '@mui/material';
import propTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ColorCodes from '../../assets/theme/colorCodes';
import SnetButton from '../snet-button';

const TransactionReceipt = ({ receiptLines }) => {
  return (
    <>
      <Stack direction="column" alignItems="center" marginY={6} spacing={2} justifyContent="center">
        <CheckCircleOutlineIcon color="success" fontSize="large" />
        <Typography variant="h3" color="grey">
          Tokens conversion successfully completed.
        </Typography>
      </Stack>
      <Typography variant="h5" fontWeight="bold">
        Transaction Receipt
      </Typography>
      <List>
        <ListItem sx={{ backgroundColor: ColorCodes.lightGray, padding: 2 }} divider color="grey" alignItems="flex-start">
          <Box width="100%" display="flex" justifyContent="space-between">
            <Typography variant="h5" color="grey">
              Tokens deposited
            </Typography>
            <Typography variant="h5" color="grey">
              4.008 AGIX
            </Typography>
          </Box>
        </ListItem>
      </List>
      <Box display="flex" alignItems="center" justifyContent="space-evenly" padding={4}>
        <SnetButton variant="text" name="View transaction history" />
        <SnetButton name="Finish" />
      </Box>
    </>
  );
};

TransactionReceipt.propTypes = {
  receiptLines: propTypes.arrayOf(propTypes.object).isRequired
};

export default TransactionReceipt;
