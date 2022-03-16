import { Typography } from '@mui/material';
import moment from 'moment';

const SecondaryFooter = () => {
  return <Typography>Copyright © {moment().format('YYYY')} SingularityNET All rights reserved.</Typography>;
};

export default SecondaryFooter;
