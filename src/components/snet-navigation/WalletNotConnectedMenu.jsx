import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import propTypes from 'prop-types';
import snetBlackLogo from '../../assets/images/singnet_black_logo.svg';
import SnetButton from '../snet-button';
import useMenubarStyles from './style';

const WalletNotConnectedMenu = ({ onConnectWallets }) => {
  const classes = useMenubarStyles();

  return (
    <AppBar position="static" color="white" sx={{ padding: 2 }}>
      <Box className={classes.items}>
        <Box className={classes.flex}>
          <img src={snetBlackLogo} alt="SingNet Logo" className={classes.logo} />
          <Typography variant="h6">Bridge</Typography>
        </Box>
        <Box>
          <SnetButton name="Connect Wallets" onClick={onConnectWallets} />
        </Box>
      </Box>
    </AppBar>
  );
};

WalletNotConnectedMenu.propTypes = {
  onConnectWallets: propTypes.func.isRequired
};

export default WalletNotConnectedMenu;
