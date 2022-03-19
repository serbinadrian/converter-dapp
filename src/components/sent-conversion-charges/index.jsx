import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import propTypes from 'prop-types';

const ConversionCharges = ({ conversionFee, conversionSymbol }) => {
  return (
    <Box display="flex" alignItems="center" paddingY={2}>
      <InfoIcon fontSize="15px" color="secondary" />
      <Typography marginLeft={1} color="grey" fontSize="14px">
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
