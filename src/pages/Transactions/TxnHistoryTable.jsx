import SnetDataGrid from '../../components/snet-data-grid';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import { useConversionHistoryHook } from './hooks/conversionHistoryHook';

const cols = ['Date', 'Chain Type', 'From', 'To', 'Status', ''];

const TxnHistoryTable = () => {
  const { address } = useWalletHook();
  const { conversionHistory } = useConversionHistoryHook(address);

  return (
    <div style={{ height: '600px' }}>
      <SnetDataGrid columns={cols} rows={conversionHistory} />
    </div>
  );
};

export default TxnHistoryTable;
