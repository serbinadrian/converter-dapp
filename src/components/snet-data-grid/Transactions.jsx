import { Typography, Box, Link } from '@mui/material';
import propTypes from 'prop-types';
import { utcToLocalDateTime } from '../../utils/Date';
import { conversionDirections, txnOperations } from '../../utils/ConverterConstants';
import { useStyles } from './styles';

const Transactions = ({ transaction, conversionDirection }) => {
  const classes = useStyles();
  const txnHashLink = (txnHash) => {
    if (conversionDirection === conversionDirections.ETH_TO_ADA && transaction.transaction_operation === txnOperations.TOKEN_BURNT) {
      return `${process.env.REACT_APP_ETHERSCAN_TXN_BASE_URL}/${txnHash}`;
    }

    if (conversionDirection === conversionDirections.ADA_TO_ETH && transaction.transaction_operation === txnOperations.TOKEN_MINTED) {
      return `${process.env.REACT_APP_ETHERSCAN_TXN_BASE_URL}/${txnHash}`;
    }

    return `${process.env.REACT_APP_CARDANOSCAN_TXN_BASE_URL}/${txnHash}`;
  };

  return (
    <div className={classes.expandedDataWrapper}>
      <Typography variant="caption" textAlign="left">
        {utcToLocalDateTime(transaction.created_at)}
      </Typography>
      <Typography variant="caption" textAlign="left">
        {transaction.transaction_operation}
      </Typography>
      <Typography variant="caption" textAlign="left">
        {transaction.status}
      </Typography>
      <Typography variant="caption" textAlign="left">
        {transaction.transaction_amount}
      </Typography>
      <Link href={txnHashLink(transaction.transaction_hash)} underline="none" target="_blank" rel="noopener noreferrer">
        <Typography variant="caption" textAlign="left">
          {transaction.transaction_hash}
        </Typography>
      </Link>
    </div>
  );
};

Transactions.propTypes = {
  transaction: propTypes.object.isRequired,
  conversionDirection: propTypes.string.isRequired
};

export default Transactions;
