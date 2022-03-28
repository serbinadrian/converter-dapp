import { Typography } from '@mui/material';
import { lazy, useState } from 'react';
import TxnHistoryTable from './TxnHistoryTable';
import { useSelector } from 'react-redux';
import { useStyles } from './styles';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import SnetButton from '../../components/snet-button';
import SnetConnectWallet from '../../components/snet-connect-wallets';

const GeneralLayout = lazy(() => import('../../layouts/GeneralLayout'));

const Transactions = () => {
  const classes = useStyles();
  const { address } = useWalletHook();
  const { entities } = useSelector((state) => state.blockchains);
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);

  const toggleWalletConnecting = () => {
    setIsWalletConnecting(!isWalletConnecting);
  };

  return (
    <GeneralLayout>
      <SnetConnectWallet isDialogOpen={isWalletConnecting} onDialogClose={toggleWalletConnecting} blockchains={entities} />
      <div className={classes.transactionHistoryContainer}>
        <Typography>Transactions History</Typography>
        {address ? (
          <TxnHistoryTable address={address} />
        ) : (
          <div className={classes.EmptyTransactionHistoryContainer}>
            <Typography>Wallet not connected.</Typography>
            <Typography variant="body2" marginY={3}>
              Please connect your wallet to view the transaction history.
            </Typography>
            <SnetButton name="Connect Wallets" variant="outlined" onClick={toggleWalletConnecting} />
          </div>
        )}
      </div>
    </GeneralLayout>
  );
};

export default Transactions;
