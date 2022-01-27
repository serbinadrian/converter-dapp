import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CopyOrEditIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import propTypes from 'prop-types';
import style from './style';

const WalletAddressInfo = ({ walletAddress, isWalletAvailable }) => {
  return (
    <>
      <Stack direction="row" spacing={2} marginBottom={2} alignItems="center">
        <WalletIcon sx={style.icon} color="grey" />
        <Typography variant="caption" color="text.primary">
          {walletAddress}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="text" startIcon={<CopyOrEditIcon />}>
          Copy
        </Button>
        {!isWalletAvailable ? (
          <Button variant="text" startIcon={<CopyOrEditIcon />}>
            Edit
          </Button>
        ) : null}
        <Button variant="text" color="error" startIcon={<LogoutIcon />}>
          Disconnect
        </Button>
      </Stack>
    </>
  );
};

WalletAddressInfo.propTypes = {
  walletAddress: propTypes.string.isRequired,
  isWalletAvailable: propTypes.bool.isRequired
};

export default WalletAddressInfo;
