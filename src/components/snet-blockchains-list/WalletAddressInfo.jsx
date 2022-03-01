import { Typography } from '@mui/material';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CopyOrEditIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import propTypes from 'prop-types';
import style from './style';

const WalletAddressInfo = ({ onCopyAddress, walletAddress, isWalletAvailable, onEdit, onDisconnect }) => {
  const [copyBtn, setCopyBtn] = useState('Copy');

  const onClickCopy = () => {
    onCopyAddress(walletAddress);
    setCopyBtn('Copied');
    setTimeout(() => {
      setCopyBtn('Copy');
    }, 5000);
  };

  return (
    <>
      <Stack direction="row" spacing={2} marginBottom={2} alignItems="center">
        <WalletIcon sx={style.icon} color="grey" />
        <Typography variant="caption" color="text.primary" textOverflow="ellipsis" overflow="hidden">
          {walletAddress}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="text" onClick={onClickCopy} startIcon={<CopyOrEditIcon />}>
          {copyBtn}
        </Button>
        {!isWalletAvailable ? (
          <Button onClick={onEdit} variant="text" startIcon={<CopyOrEditIcon />}>
            Edit
          </Button>
        ) : null}
        <Button onClick={onDisconnect} variant="text" color="error" startIcon={<LogoutIcon />}>
          Disconnect
        </Button>
      </Stack>
    </>
  );
};

WalletAddressInfo.propTypes = {
  walletAddress: propTypes.string.isRequired,
  isWalletAvailable: propTypes.bool.isRequired,
  onEdit: propTypes.func,
  onDisconnect: propTypes.func,
  onCopyAddress: propTypes.func
};

export default WalletAddressInfo;
