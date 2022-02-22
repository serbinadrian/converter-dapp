import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import isNil from 'lodash/isNil';
import propTypes from 'prop-types';
import { useState } from 'react';
import Button from '../snet-button';
import style from './style';
import WalletAddressInfo from './WalletAddressInfo';
import WalletAddressInput from './WalletAddressInput';

const BlockchainList = ({
  blockchain,
  blockchainLogo,
  onSaveAddress,
  blockChainConnectInfo,
  isWalletAvailable,
  walletAddress,
  disconnectWallet,
  openWallet
}) => {
  const [showInput, setShowInput] = useState(false);

  const showOrHideInput = () => {
    setShowInput(!showInput);
  };

  const saveAddress = (address) => {
    showOrHideInput();
    if (address.length > 0) {
      onSaveAddress(address);
    }
  };

  const isWalletAddressAvailable = () => {
    return !isNil(walletAddress) && !showInput;
  };

  const onCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
  };

  return (
    <Box sx={style.box} divider>
      <Grid spacing={2} container sx={style.grid} minWidth="0">
        <Grid item sm={isWalletAddressAvailable() ? 6 : 4} sx={style.flex}>
          <Avatar alt={blockchain} src={blockchainLogo} />
          <ListItemText primary={blockchain} sx={style.blockchain} />
        </Grid>
        {!isWalletAddressAvailable() ? (
          <Grid item sm={4}>
            <ListItemText
              secondary={
                <Typography sx={style.blockchainInfo} component="span" variant="body2" color="text.primary">
                  {blockChainConnectInfo}
                </Typography>
              }
            />
          </Grid>
        ) : null}
        <Grid item sm={isWalletAddressAvailable() ? 6 : 4}>
          {isWalletAddressAvailable() ? (
            <WalletAddressInfo
              onCopyAddress={() => onCopyAddress(walletAddress)}
              onDisconnect={() => {
                if (!isWalletAvailable) {
                  showOrHideInput();
                }
                disconnectWallet();
              }}
              onEdit={showOrHideInput}
              walletAddress={walletAddress}
              isWalletAvailable={isWalletAvailable}
            />
          ) : null}
          {showInput ? <WalletAddressInput onSaveAddress={saveAddress} blockchain={blockchain} onCancel={showOrHideInput} /> : null}
          {isNil(walletAddress) && !showInput ? (
            <Button
              onClick={() => {
                if (!isWalletAvailable) {
                  showOrHideInput();
                } else {
                  openWallet();
                }
              }}
              name={isWalletAvailable ? 'Connect' : 'Add'}
              variant="outlined"
            />
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

BlockchainList.propTypes = {
  blockchain: propTypes.string.isRequired,
  blockchainLogo: propTypes.string.isRequired,
  blockChainConnectInfo: propTypes.string.isRequired,
  isWalletAvailable: propTypes.bool.isRequired,
  walletAddress: propTypes.string,
  onSaveAddress: propTypes.func,
  disconnectWallet: propTypes.func,
  openWallet: propTypes.func
};

export default BlockchainList;
