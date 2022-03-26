import { Grid, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import SnetAlert from '../../components/snet-alert';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import { getPendingConversionCount } from '../../utils/HttpRequests';

const PendingTxnAlert = () => {
  const [isPendingTxns, setPendingTxns] = useState(false);
  const { getWalletAddress, address } = useWalletHook();

  const fetchPendingTransactionCounts = async () => {
    try {
      const wallet = await getWalletAddress();
      const { each } = await getPendingConversionCount(wallet);
      const pendingTxnCount = (each.PROCESSING ?? 0) + (each.CLAIM_INITIATED ?? 0) + (each.USER_INITIATED ?? 0) + (each.WAITING_FOR_CLAIM ?? 0);
      setPendingTxns(pendingTxnCount > 0);
    } catch (error) {
      console.log('fetchPendingTransactionCounts', error);
    }
  };

  useEffect(() => {
    fetchPendingTransactionCounts();
  }, [address]);

  return isPendingTxns ? (
    <Grid container>
      <Grid item xs={10} marginBottom={2}>
        <SnetAlert
          error={
            <Link underline="none" href="/transactions">
              You have pending transactions. Please view the details on the transactions page.
            </Link>
          }
        />
      </Grid>
    </Grid>
  ) : null;
};

export default PendingTxnAlert;
