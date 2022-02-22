import AppBar from '@mui/material/AppBar';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import snetBlackLogo from '../../assets/images/singnet_black_logo.svg';
import useMenubarStyles from './style';

const WalletConnectedMenu = ({ openConnectedWallets }) => {
  const classes = useMenubarStyles();
  const state = useSelector((state) => state);
  const { wallets } = state.wallet;

  return (
    <AppBar position="static" color="white" sx={{ padding: 2 }}>
      <Box className={classes.items}>
        <Box className={classes.flex}>
          <img src={snetBlackLogo} alt="SingNet Logo" className={classes.logo} />
          <Typography variant="h6">Bridge</Typography>
        </Box>
        <Box onClick={openConnectedWallets} className={classes.flex} sx={{ cursor: 'pointer' }}>
          <IconButton>
            <AccountBalanceWalletIcon />
          </IconButton>
          <Box sx={{ textAlign: 'left', marginLeft: 2 }}>
            <Typography variant="body2" marginBottom={-1.5}>
              Wallet Account
            </Typography>
            <Typography variant="caption" color="primary">
              {wallets.length} Connected
            </Typography>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};

WalletConnectedMenu.propTypes = {
  openConnectedWallets: propTypes.func.isRequired
};

export default WalletConnectedMenu;
