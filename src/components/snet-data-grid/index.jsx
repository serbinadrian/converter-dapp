import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toLocalDateTime } from '../../utils/Date';
import Columns from './Columns';
import Rows from './Rows';
import { setAdaConversionInfo, setConversionDirection, setActiveStep } from '../../services/redux/slices/tokenPairs/tokenPairSlice';
import { setFromAddress, setToAddress } from '../../services/redux/slices/wallet/walletSlice';
import { availableBlockchains, conversionStatuses, conversionSteps } from '../../utils/ConverterConstants';
import paths from '../../router/paths';
import { useStyles } from './styles';

const SnetDataGrid = ({ columns, rows }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResume = (conversionInfo, conversionStatus) => {
    const activeStep = conversionStatus === conversionStatuses.WAITING_FOR_CLAIM ? conversionSteps.CLAIM_TOKENS : conversionSteps.BURN_TOKENS;

    const { wallet } = conversionInfo;

    dispatch(setFromAddress(wallet.from_address));
    dispatch(setToAddress(wallet.to_address));
    dispatch(setAdaConversionInfo(conversionInfo));
    dispatch(setConversionDirection(availableBlockchains.CARDANO));
    dispatch(setActiveStep(activeStep));
    navigate(paths.Converter);
  };

  return (
    <div className={classes.transactionHistoryTable}>
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
            transactions={row.transactions}
            conversionDirection={row.conversionDirection}
            handleResume={() => handleResume(row.conversionInfo, row.status)}
          />
        );
      })}
    </div>
  );
};

SnetDataGrid.propTypes = {
  columns: propTypes.arrayOf(propTypes.string).isRequired,
  rows: propTypes.arrayOf(propTypes.string).isRequired
};

export default SnetDataGrid;
