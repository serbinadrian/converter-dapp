import { Typography } from '@mui/material';
import dayjs from 'dayjs';

const SecondaryFooter = () => {
  return <Typography>Copyright © {dayjs().format('YYYY')} SingularityNET All rights reserved.</Typography>;
};

export default SecondaryFooter;
