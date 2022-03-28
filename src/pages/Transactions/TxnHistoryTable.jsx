import propTypes from 'prop-types';
import SnetDataGrid from '../../components/snet-data-grid';
import useConversionHistoryHook from './hooks/conversionHistoryHook';

const TxnHistoryTable = ({ address }) => {
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

TxnHistoryTable.propTypes = {
  address: propTypes.any
};
export default TxnHistoryTable;
