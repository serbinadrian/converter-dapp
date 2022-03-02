import AppBar from '@mui/material/AppBar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import useMenubarStyles from './style';
import Paths from '../../router/paths';
import BridgeLogo from './BridgeLogo';

const WalletConnectedMenu = ({ openConnectedWallets }) => {
  const classes = useMenubarStyles();
  const state = useSelector((state) => state);
  const { wallets } = state.wallet;

  return (
    <AppBar position="static" color="white" sx={{ padding: 2 }}>
      <Box className={classes.items}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <BridgeLogo />
          <Box display="flex" marginLeft={12}>
            <Link to={Paths.Converter}>
              <Typography variant="body2" marginRight={6}>
                Home
              </Typography>
            </Link>
            <Link to={Paths.Transactions}>
              <Typography variant="body2">Transactions</Typography>
            </Link>
          </Box>
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
