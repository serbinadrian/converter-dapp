import propTypes from 'prop-types';
import { toLocalDateTime } from '../../utils/Date';
import Columns from './Columns';
import Rows from './Rows';

const SnetDataGrid = ({ columns, rows }) => {
  return (
    <>
      <Columns columns={columns} />
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
  columns: propTypes.arrayOf(propTypes.string).isRequired,
  rows: propTypes.arrayOf(propTypes.string).isRequired
};

export default SnetDataGrid;
