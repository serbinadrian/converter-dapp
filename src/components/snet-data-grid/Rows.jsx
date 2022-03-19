import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import WarningIcon from '@mui/icons-material/Warning';
import SuccessIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import propTypes from 'prop-types';
import CardActions from '@mui/material/CardActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { utcToLocalDateTime } from '../../utils/Date';
import Transactions from './Transactions';
import { conversionStatuses, conversionDirections } from '../../utils/ConverterConstants';
import { useStyles } from './styles';
import SnetButton from '../snet-button';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const Rows = ({
  date,
  fromToken,
  toToken,
  depositAmount,
  receivingAmount,
  fromAddress,
  toAddress,
  chainType,
  status,
  transactions,
  conversionDirection,
  handleResume
}) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const conversionStatus = (status, onContinue) => {
    let component;
    switch (status) {
      case conversionDirection === conversionDirections.ADA_TO_ETH && conversionStatuses.USER_INITIATED:
        component = <SnetButton name="View" onClick={onContinue} variant="outlined" />;
        break;

      case conversionStatuses.PROCESSING:
        component = <HourglassBottomIcon fontSize="small" color="primary" />;
        break;

      case conversionStatuses.SUCCESS:
        component = <SuccessIcon fontSize="small" color="success" />;
        break;

      case conversionStatuses.WAITING_FOR_CLAIM:
        component = <SnetButton name="Continue" onClick={onContinue} variant="outlined" />;
        break;

      default:
        component = <WarningIcon fontSize="small" color="warning" />;
        break;
    }

    return component;
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" paddingY={2} className={classes.transactionDataRow}>
        <Typography textTransform="uppercase" variant="caption" color="grey">
          {utcToLocalDateTime(date)}
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography textTransform="uppercase" variant="caption" color="grey">
            {chainType}
          </Typography>
        </Box>
        <Box width="120px" overflow="hidden">
          <Typography textTransform="uppercase" variant="body2" color="grey">
            {depositAmount} {fromToken}
          </Typography>
          <Typography textOverflow="ellipsis" overflow="hidden" textTransform="uppercase" variant="caption" color="grey">
            {fromAddress}
          </Typography>
        </Box>
        <Box width="120px" overflow="hidden">
          <Typography textAlign="left" variant="body2" color="grey">
            {receivingAmount} {toToken}
          </Typography>
          <Typography textAlign="left" textOverflow="ellipsis" overflow="hidden" variant="caption" color="grey">
            {toAddress}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          {conversionStatus(status, handleResume)}
          {status !== conversionStatuses.WAITING_FOR_CLAIM && status !== conversionStatuses.USER_INITIATED ? (
            <Typography variant="caption">{status}</Typography>
          ) : null}
        </Box>
        <CardActions disableSpacing>
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box display="flex" justifyContent="space-between" className={classes.expandedData}>
          {transactions.map((transaction) => {
            return <Transactions key={transaction.id} transaction={transaction} conversionDirection={conversionDirection} />;
          })}
        </Box>
      </Collapse>
    </>
  );
};

Rows.propTypes = {
  date: propTypes.string.isRequired,
  fromToken: propTypes.string.isRequired,
  toToken: propTypes.string.isRequired,
  fromAddress: propTypes.string.isRequired,
  toAddress: propTypes.string.isRequired,
  chainType: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
  transactions: propTypes.arrayOf(propTypes.any).isRequired,
  conversionDirection: propTypes.string.isRequired,
  handleResume: propTypes.func.isRequired,
  depositAmount: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  receivingAmount: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired
};

export default Rows;
