import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import snetBlackLogo from '../../assets/images/bridge_logo.svg';
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
    </Box>
  );
};

export default BridgeLogo;
