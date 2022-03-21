import propTypes from 'prop-types';
import { toLocalDateTime } from '../../utils/Date';
import Columns from './Columns';
import Rows from './Rows';

const SnetDataGrid = ({ rows }) => {
  return (
    <>
      <Columns />
      {rows.map((row) => {
        return (
          <Rows
            key={row.id}
            date={toLocalDateTime(row.lastUpdatedAt)}
            fromToken={row.fromToken}
            chainType={row.chainType}
            fromAddress={row.fromAddress}
            toAddress={row.toAddress}
            toToken={row.toToken}
            status={row.status}
          />
        );
      })}
    </>
  );
};

SnetDataGrid.propTypes = {
  rows: propTypes.arrayOf(propTypes.string).isRequired
};

export default SnetDataGrid;
