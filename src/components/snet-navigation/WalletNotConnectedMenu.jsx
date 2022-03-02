import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import propTypes from 'prop-types';
import SnetButton from '../snet-button';
import BridgeLogo from './BridgeLogo';
import useMenubarStyles from './style';

const WalletNotConnectedMenu = ({ onConnectWallets }) => {
  const classes = useMenubarStyles();

  return (
    <AppBar position="static" color="white" sx={{ padding: 2 }}>
      <Box className={classes.items}>
        <BridgeLogo />
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
