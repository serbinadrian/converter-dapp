import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import propTypes from 'prop-types';
import { useStyles } from './styles';

const ConversionCharges = ({ conversionFee, conversionSymbol }) => {
  const classes = useStyles();
  return (
    <Box className={classes.conversionChargesContainer}>
      <Tooltip title="Amount charged by SingularityNET for conversion ">
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Typography>
        Conversion Charges: {conversionFee} {conversionSymbol}
      </Typography>
    </Box>
  );
};

ConversionCharges.propTypes = {
  conversionFee: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  conversionSymbol: propTypes.string.isRequired
};

export default ConversionCharges;
