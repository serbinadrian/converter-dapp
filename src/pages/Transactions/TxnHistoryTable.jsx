import SnetDataGrid from '../../components/snet-data-grid';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import { useConversionHistoryHook } from './hooks/conversionHistoryHook';

const cols = ['Date', 'Chain Type', 'From', 'To', 'Status', ''];

const TxnHistoryTable = () => {
  const { address } = useWalletHook();
  const { conversionHistory } = useConversionHistoryHook(address);

  return <SnetDataGrid columns={cols} rows={conversionHistory} />;
};

export default TxnHistoryTable;
