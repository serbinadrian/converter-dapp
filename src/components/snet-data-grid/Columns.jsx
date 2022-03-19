import propTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useStyles } from './styles';

const Columns = ({ columns }) => {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="space-between" marginBottom={2}>
      {columns.map((column) => {
        return (
          <Typography key={column} className={classes.colName} textTransform="uppercase">
            {column}
          </Typography>
        );
      })}
    </Box>
  );
};

Columns.propTypes = {
  columns: propTypes.arrayOf(propTypes.string).isRequired
};

export default Columns;
