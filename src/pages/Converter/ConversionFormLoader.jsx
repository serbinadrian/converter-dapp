import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const SkeletonLoader = () => {
  return (
    <Box>
      <Skeleton height="150px" animation="wave" />
      <Stack direction="row" justifyContent="center">
        <Skeleton width="50px" height="50px" variant="circular" animation="wave" />
      </Stack>
      <Skeleton height="150px" animation="wave" />
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Skeleton height="80px" width="40%" animation="wave" />
        <Skeleton height="80px" width="40%" animation="wave" />
      </Stack>
    </Box>
  );
};

export default SkeletonLoader;
