import { Typography } from '@mui/material';
import { lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import TxnHistoryTable from './TxnHistoryTable';
import { useStyles } from './styles';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import SnetButton from '../../components/snet-button';
import SnetConnectWallet from '../../components/snet-connect-wallets';

const GeneralLayout = lazy(() => import('../../layouts/GeneralLayout'));

const Transactions = () => {
  const classes = useStyles();

  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const state = useSelector((state) => state);
  const { wallets } = state.wallet;
  const { entities } = state.blockchains;

  const toggleWalletConnecting = () => {
    setIsWalletConnecting(!isWalletConnecting);
  };

  return (
    <GeneralLayout>
      {isWalletConnecting ? <SnetConnectWallet isDialogOpen={isWalletConnecting} onDialogClose={toggleWalletConnecting} blockchains={entities} /> : null}
      <div className={classes.transactionHistoryContainer}>
        <Typography>Transactions History</Typography>
        {!isEmpty(wallets) ? (
          <TxnHistoryTable />
        ) : (
          <div className={classes.EmptyTransactionHistoryContainer}>
            <Typography>Wallet not connected.</Typography>
            <Typography variant="body2" marginY={3}>
              Please connect both your wallets to view the transaction history
            </Typography>
            <SnetButton name="Connect Wallets" variant="outlined" onClick={toggleWalletConnecting} />
          </div>
        )}
      </div>
    </GeneralLayout>
  );
};

export default Transactions;
