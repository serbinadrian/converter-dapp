import { Typography } from '@mui/material';
import { lazy } from 'react';
import TxnHistoryTable from './TxnHistoryTable';
import { useStyles } from './styles';

const GeneralLayout = lazy(() => import('../../layouts/GeneralLayout'));

const Transactions = () => {
  const classes = useStyles();
  return (
    <GeneralLayout>
      <div className={classes.transactionHistoryContainer}>
        <Typography>Transactions History</Typography>
        <TxnHistoryTable />
      </div>
    </GeneralLayout>
  );
};

export default Transactions;
