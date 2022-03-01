import { DataGrid } from '@mui/x-data-grid';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import { useConversionHistoryHook } from './hooks/conversionHistoryHook';

const columns = [
  { field: 'id', hide: true },
  { field: 'lastUpdatedAt', headerName: 'DATE' },
  { field: 'chainType', headerName: 'CHAIN TYPE' },
  { field: 'fromAddress', headerName: 'FROM' },
  { field: 'toAddress', headerName: 'TO' },
  { field: 'status', headerName: 'STATUS' }
];

const TxnHistoryTable = () => {
  const { address } = useWalletHook();
  const { conversionHistory } = useConversionHistoryHook(address);

  return (
    <div style={{ height: '600px' }}>
      <DataGrid rows={conversionHistory} columns={columns} pagination />
    </div>
  );
};

export default TxnHistoryTable;
