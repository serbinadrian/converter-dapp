import SnetDataGrid from '../../components/snet-data-grid';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import useConversionHistoryHook from './hooks/conversionHistoryHook';

const TxnHistoryTable = () => {
  const { address } = useWalletHook();
  const { onPageChange, pageNumber, conversionHistory, getConversionHistory, isLoading, onItemSelect, pageSizes, paginationSize, paginationInfo } =
    useConversionHistoryHook(address);

  return (
    <SnetDataGrid
      pageSizes={pageSizes}
      onItemSelect={onItemSelect}
      loading={isLoading}
      refreshTxnHistory={getConversionHistory}
      rows={conversionHistory}
      paginationSize={paginationSize}
      currentPage={pageNumber}
      onPageChange={onPageChange}
      paginationInfo={paginationInfo}
    />
  );
};

export default TxnHistoryTable;
