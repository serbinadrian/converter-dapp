import { useState } from 'react';
import propTypes from 'prop-types';

import { Pagination, Box, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SnetPagination = ({ paginationInfo, onItemSelect, pageSizes, paginationSize, currentPage, onPageChange }) => {
  const [page, setPage] = useState(pageSizes[0]);

  const handleChange = (event) => {
    const { value } = event.target;
    setPage(value);
    onItemSelect(value);
  };

  const handlePagination = (e, value) => {
    onPageChange(value);
  };

  return (
    <Box marginTop={4} display="flex" justifyContent="space-between" alignItems="center">
      <Pagination onChange={handlePagination} color="primary" shape="rounded" count={paginationSize} page={currentPage} />
      <Box alignItems="center">
        <FormControl fullWidth>
          <InputLabel id="pagination-count-label">Items</InputLabel>
          <Select size="small" labelId="pagination-count-label" id="pagination-select" value={page} label="Items" onChange={handleChange}>
            {pageSizes.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Typography variant="caption" color="gray">
          {paginationInfo}
        </Typography>
      </Box>
    </Box>
  );
};

SnetPagination.propTypes = {
  onItemSelect: propTypes.func.isRequired,
  pageSizes: propTypes.arrayOf(propTypes.number).isRequired,
  paginationSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
  paginationInfo: propTypes.string.isRequired
};

export default SnetPagination;
