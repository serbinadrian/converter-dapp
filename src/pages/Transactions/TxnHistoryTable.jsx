import SnetDataGrid from '../../components/snet-data-grid';
import { useWalletHook } from '../../components/snet-wallet-connector/walletHook';
import useConversionHistoryHook from './hooks/conversionHistoryHook';

const TxnHistoryTable = () => {
  const { address } = useWalletHook();
  const {
    onPageChange,
    pageNumber,
    conversionHistory,
    getConversionHistory,
    isLoading,
    onItemSelect,
    pageSizes,
    paginationSize,
    paginationInfo,
    totalNoOfTransaction,
    getTransactionHistory,
    expanded,
    setExpandedValue
  } = useConversionHistoryHook(address);

  return (
    <SnetDataGrid
      pageSizes={pageSizes}
      onItemSelect={onItemSelect}
      loading={isLoading}
      getTransactionHistory={getTransactionHistory}
      refreshTxnHistory={getConversionHistory}
      rows={conversionHistory}
      paginationSize={paginationSize}
      currentPage={pageNumber}
      onPageChange={onPageChange}
      paginationInfo={paginationInfo}
      totalNoOfTransaction={totalNoOfTransaction}
      expanded={expanded}
      setExpandedValue={setExpandedValue}
    />
  );
};

export default TxnHistoryTable;
