import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
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
import { conversionStatuses, conversionDirections, conversionStatusMessages } from '../../utils/ConverterConstants';
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
      case conversionStatuses.USER_INITIATED:
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
      <Grid container spacing={2} className={classes.transactionDataRow}>
        <Grid item xs={6} md={2}>
          <Typography textTransform="uppercase" align="left">
            {utcToLocalDateTime(date)}
          </Typography>
        </Grid>
        <Grid item xs={6} md={2}>
          <Typography textTransform="uppercase" align="left">
            {chainType}
          </Typography>
        </Grid>
        <Grid item xs={6} md={2} flexDirection="column" className={classes.alignRight}>
          <Typography textTransform="uppercase">
            {depositAmount} {fromToken}
          </Typography>
          <Typography textOverflow="ellipsis" overflow="hidden" textTransform="uppercase" variant="caption" color="grey">
            {fromAddress}
          </Typography>
        </Grid>
        <Grid item xs={6} md={2} flexDirection="column" className={classes.alignRight}>
          <Typography textTransform="uppercase">
            {receivingAmount} {toToken}
          </Typography>
          <Typography textOverflow="ellipsis" overflow="hidden" variant="caption" color="grey">
            {toAddress}
          </Typography>
        </Grid>
        <Grid item xs={6} md={2} align="center" className={classes.statusData}>
          <div className={classes.statusValueContainer}>
            <Typography data-status-type={status} className={classes.value}>
              {conversionStatusMessages[status]}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6} md={2} className={classes.expandArrowContainer} justifyContent="flex-end">
          {conversionStatus(status, handleResume)}
          <CardActions disableSpacing>
            {transactions.length > 0 ? (
              <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                <ExpandMoreIcon />
              </ExpandMore>
            ) : null}
          </CardActions>
        </Grid>
      </Grid>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box display="flex" justifyContent="space-between" className={classes.expandedData}>
          <div className={classes.expandedDataWrapper}>
            <Grid container className={classes.expandedDataCol}>
              <Grid item xs={6} md={2}>
                <Typography>Date</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography>Process Status</Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography>Status</Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography>Transaction</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography>Detail</Typography>
              </Grid>
            </Grid>
            {transactions.map((transaction) => {
              return (
                <Grid key={transaction.id} container className={classes.expandedDataRows}>
                  <Transactions transaction={transaction} conversionDirection={conversionDirection} />
                </Grid>
              );
            })}
          </div>
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
