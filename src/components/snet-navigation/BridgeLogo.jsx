import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import snetBlackLogo from '../../assets/images/singnet_black_logo.svg';
import useMenubarStyles from './style';
import Paths from '../../router/paths';

const BridgeLogo = () => {
  const classes = useMenubarStyles();
  const navigate = useNavigate();

  const onClickLogo = () => {
    navigate(Paths.Converter);
  };

  return (
    <Box onClick={onClickLogo} className={`${classes.flex} ${classes.cursor}`}>
      <img src={snetBlackLogo} alt="SingNet Logo" className={classes.logo} />
      <Typography variant="h5">Bridge</Typography>
    </Box>
  );
};

export default BridgeLogo;
