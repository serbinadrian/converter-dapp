import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import isNil from 'lodash/isNil';
import propTypes from 'prop-types';
import { useState } from 'react';
import Button from '../snet-button';
import SnetWalletConnector from '../snet-wallet-connector';
import style from './style';
import WalletAddressInfo from './WalletAddressInfo';
import WalletAddressInput from './WalletAddressInput';

const BlockchainList = ({ blockchain, blockchainLogo, onSaveAddress, blockChainConnectInfo, isWalletAvailable, walletAddress }) => {
  const [showInput, setShowInput] = useState(false);
  const [showWalletmodal, setShowWalletmodal] = useState(false);

  const showOrHideInput = () => {
    setShowInput(!showInput);
  };

  const saveAddress = (address) => {
    showOrHideInput();
    if (address.length > 0) {
      onSaveAddress(address);
    }
  };

  const showOrHideWalletconnectModal = () => {
    setShowWalletmodal(!showWalletmodal);
  };

  return (
    <>
      <SnetWalletConnector isDialogOpen={showWalletmodal} onWalletClose={showOrHideWalletconnectModal} />
      <Box sx={style.box} divider>
        <Grid spacing={2} container sx={style.grid}>
          <Grid item sm={4} sx={style.flex}>
            <Avatar alt={blockchain} src={blockchainLogo} />
            <ListItemText primary={blockchain} sx={style.blockchain} />
          </Grid>
          <Grid item sm={4}>
            <ListItemText
              secondary={
                <Typography sx={style.blockchainInfo} component="span" variant="body2" color="text.primary">
                  {blockChainConnectInfo}
                </Typography>
              }
            />
          </Grid>
          <Grid item sm={4}>
            {!isNil(walletAddress) && !showInput ? (
              <WalletAddressInfo onEdit={showOrHideInput} walletAddress={walletAddress} isWalletAvailable={isWalletAvailable} />
            ) : null}
            {showInput ? <WalletAddressInput onSaveAddress={saveAddress} blockchain={blockchain} onCancel={showOrHideInput} /> : null}
            {isNil(walletAddress) && !showInput ? (
              <Button
                onClick={() => {
                  if (!isWalletAvailable) {
                    showOrHideInput();
                  } else {
                    showOrHideWalletconnectModal();
                  }
                }}
                name={isWalletAvailable ? 'Connect' : 'Add'}
                variant="outlined"
              />
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

BlockchainList.propTypes = {
  blockchain: propTypes.string.isRequired,
  blockchainLogo: propTypes.string.isRequired,
  blockChainConnectInfo: propTypes.string.isRequired,
  isWalletAvailable: propTypes.bool.isRequired,
  walletAddress: propTypes.string,
  onSaveAddress: propTypes.func
};

export default BlockchainList;
