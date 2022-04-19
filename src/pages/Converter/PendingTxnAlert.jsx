import { Link } from '@mui/material';
import { isEmpty, size } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SnetAlert from '../../components/snet-alert';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import { getPendingConversionCount } from '../../utils/HttpRequests';

const PendingTxnAlert = () => {
  const [isPendingTxns, setPendingTxns] = useState(false);
  const { getWalletAddress } = useWalletHook();
  const state = useSelector((state) => state);
  const { wallets } = state.wallet;

  const fetchPendingTransactionCounts = async () => {
    try {
      const wallet = await getWalletAddress();
      if (!isEmpty(wallets)) {
        const { each } = await getPendingConversionCount(wallet);
        const pendingTxnCount = (each.PROCESSING ?? 0) + (each.CLAIM_INITIATED ?? 0) + (each.USER_INITIATED ?? 0) + (each.WAITING_FOR_CLAIM ?? 0);
        setPendingTxns(pendingTxnCount > 0);
      }
    } catch (error) {
      console.log('fetchPendingTransactionCounts', error);
    }
  };

  useEffect(() => {
    if (size(wallets) > 1) {
      fetchPendingTransactionCounts();
    }
  }, [wallets]);

  return isPendingTxns && size(wallets) > 1 ? (
    <SnetAlert
      error={
        <p>
          You have pending transactions. Please view the details on the transactions page
          <Link underline="none" href="/transactions">
            Click here
          </Link>
        </p>
      }
      type="info"
    />
  ) : null;
};

export default PendingTxnAlert;
