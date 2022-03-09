import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Stack, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ColorCodes from '../../assets/theme/colorCodes';
import SnetButton from '../snet-button';
import Paths from '../../router/paths';

const TransactionReceipt = ({ receiptLines, txnHash }) => {
  const navigate = useNavigate();

  const onClickFinish = () => {
    navigate(Paths.Transactions);
  };

  const openLink = () => {
    const link = `${process.env.REACT_APP_ETHERSCAN_TXN_BASE_URL}/${txnHash}`;
    window.open(link, '_blank');
  };

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
        {receiptLines.map((line) => {
          return (
            <ListItem key={line.id} sx={{ backgroundColor: ColorCodes.lightGray, padding: 2 }} divider color="grey" alignItems="flex-start">
              <Box width="100%" display="flex" justifyContent="space-between">
                <Typography variant="h5" color="grey">
                  {line.label}
                </Typography>
                <Typography variant="h5" color="grey">
                  {line.value}
                </Typography>
              </Box>
            </ListItem>
          );
        })}
      </List>
      <Box display="flex" alignItems="center" justifyContent="space-evenly" padding={4}>
        <SnetButton onClick={openLink} variant="text" name="View transaction history" />
        <SnetButton name="Finish" onClick={onClickFinish} />
      </Box>
    </>
  );
};

TransactionReceipt.propTypes = {
  receiptLines: propTypes.arrayOf(propTypes.object),
  txnHash: propTypes.string
};

TransactionReceipt.defaultProps = {
  receiptLines: [],
  txnHash: ''
};

export default TransactionReceipt;
