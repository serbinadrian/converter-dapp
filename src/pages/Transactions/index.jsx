import { Typography } from '@mui/material';
import { lazy } from 'react';
import SnetPaper from '../../components/snet-paper';
import TxnHistoryTable from './TxnHistoryTable';

const GeneralLayout = lazy(() => import('../../layouts/GeneralLayout'));

const Transactions = () => {
  return (
    <GeneralLayout>
      <SnetPaper>
        <Typography marginBottom={2}>Transactions History</Typography>
        <TxnHistoryTable />
      </SnetPaper>
    </GeneralLayout>
  );
};

export default Transactions;
