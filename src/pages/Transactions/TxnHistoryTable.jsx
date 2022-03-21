import SnetDataGrid from '../../components/snet-data-grid';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import { useConversionHistoryHook } from './hooks/conversionHistoryHook';

const TxnHistoryTable = () => {
  const { address } = useWalletHook();
  const { conversionHistory } = useConversionHistoryHook(address);

  return <SnetDataGrid rows={conversionHistory} />;
};

export default TxnHistoryTable;
