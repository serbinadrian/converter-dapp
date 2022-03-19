import SnetDataGrid from '../../components/snet-data-grid';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import { useConversionHistoryHook } from './hooks/conversionHistoryHook';

const cols = ['Date', 'Chain Type', 'From', 'To', 'Status', ''];

const TxnHistoryTable = () => {
  const { address } = useWalletHook();
  const { conversionHistory, getConversionHistory, isLoading } = useConversionHistoryHook(address);

  return <SnetDataGrid loading={isLoading} refreshTxnHistory={getConversionHistory} columns={cols} rows={conversionHistory} />;
};

export default TxnHistoryTable;
