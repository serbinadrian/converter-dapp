import propTypes from 'prop-types';
import { Box, Divider, Typography } from '@mui/material';

const Columns = ({ columns }) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        {columns.map((column) => {
          return (
            <Typography key={column} textTransform="uppercase" variant="caption" color="grey">
              {column}
            </Typography>
          );
        })}
      </Box>
      <Divider />
    </>
  );
};

Columns.propTypes = {
  columns: propTypes.arrayOf(propTypes.string).isRequired
};

export default Columns;
