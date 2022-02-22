import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import upperCase from 'lodash/upperCase';
import propTypes from 'prop-types';
import { Divider, Box, Typography, Link } from '@mui/material';
import isNil from 'lodash/isNil';
import store from 'store';

import WalletNotConnectedMenu from './WalletNotConnectedMenu';
import WalletConnectedMenu from './WalletConnectedMenu';
import SnetDialog from '../snet-dialog';
import SnetBlockchainList from '../snet-blockchains-list';
import { useWalletHook } from '../snet-wallet-connector/walletHook';
import SnetSnackbar from '../snet-snackbar';
import SnetButton from '../snet-button';
import { setSignature, setWallets } from '../../services/redux/slices/wallet/walletSlice';

const availableBlockchains = {
  ETHEREUM: 'ETHEREUM',
  CARDANO: 'CARDANO'
};

const SnetNavigation = ({ blockchains }) => {
  const [enableAgreeButton, setEnableAgreeButton] = useState(false);
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [cardanoAddress, setCardanoAddress] = useState(null);
  const [error, setError] = useState({ showError: false, message: '' });
  const { address, openWallet, disconnectWallet, signMessage } = useWalletHook();
  const state = useSelector((state) => state);
  const { tokens } = state.tokenPairs;
  const { wallets } = state.wallet;

  const dispatch = useDispatch();

  const enableOrDisableAgreebutton = () => {
    const isCardanoAddressAvailable = !isNil(cardanoAddress);
    const isEthereumAddressAvailable = !isNil(address);

    const addressessAvailable = isCardanoAddressAvailable && isEthereumAddressAvailable;
    setEnableAgreeButton(addressessAvailable);
  };

  useEffect(() => {
    const cachedCardanoAddress = store.get(availableBlockchains.CARDANO) ?? null;
    setCardanoAddress(cachedCardanoAddress);
  });

  useEffect(() => {
    enableOrDisableAgreebutton();
  }, [cardanoAddress, address]);

  const toggleWalletConnecting = () => {
    setIsWalletConnecting(!isWalletConnecting);
  };

  const openAvailableWalletOptions = () => {
    toggleWalletConnecting();
  };

  const getWalletAddress = (blockchain) => {
    const blockchainName = upperCase(blockchain);
    if (blockchainName === availableBlockchains.ETHEREUM) {
      return address;
    }
    if (blockchainName === availableBlockchains.CARDANO) {
      return cardanoAddress;
    }
    return null;
  };

  const getWalletPairs = () => {
    return [{ [availableBlockchains.CARDANO]: cardanoAddress }, { [availableBlockchains.ETHEREUM]: address }];
  };

  const onSaveAddress = async (address) => {
    setCardanoAddress(address);
    await store.set(availableBlockchains.CARDANO, address);
  };

  const onClickDisconnectWallet = (blockchain) => {
    const blockchainName = upperCase(blockchain);
    if (blockchainName === availableBlockchains.ETHEREUM) {
      disconnectWallet();
    }
    if (blockchainName === availableBlockchains.CARDANO) {
      setCardanoAddress(null);
      store.remove(availableBlockchains.CARDANO);
    }
  };

  const getSignatureFromWallet = async () => {
    try {
      setEnableAgreeButton(false);
      const [pair] = tokens;
      const tokenPairdId = pair.id;
      const amountToLock = 1;
      const signature = await signMessage(tokenPairdId, amountToLock, address, cardanoAddress);

      dispatch(setWallets(getWalletPairs()));
      dispatch(setSignature(signature));
      toggleWalletConnecting();
    } catch (e) {
      const message = e.message.toString() ?? e.toString();
      setError({ showError: true, message });
    } finally {
      setEnableAgreeButton(true);
    }
  };

  const closeError = () => {
    setError({ showError: false, message: '' });
  };

  return (
    <>
      <SnetSnackbar open={error.showError} message={error.message} onClose={closeError} />
      <SnetDialog title="Connect Wallets" onDialogClose={toggleWalletConnecting} isDialogOpen={isWalletConnecting}>
        {blockchains.map((blockchain) => {
          return (
            <SnetBlockchainList
              key={blockchain.id}
              blockchain={blockchain.name}
              blockchainLogo={blockchain.logo}
              blockChainConnectInfo={blockchain.description}
              isWalletAvailable={blockchain.is_extension_available}
              walletAddress={getWalletAddress(blockchain.name)}
              onSaveAddress={onSaveAddress}
              openWallet={openWallet}
              disconnectWallet={() => onClickDisconnectWallet(blockchain.name)}
            />
          );
        })}
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Box display="flex" justifyContent="end" alignItems="center">
          <Typography variant="caption" marginRight={2}>
            By connecting to the wallets, you agree to our <Link href="#terms">Terms & Conditions</Link>
          </Typography>
          <SnetButton onClick={getSignatureFromWallet} disabled={!enableAgreeButton} name="Agree & Sign" />
        </Box>
      </SnetDialog>
      {wallets.length > 0 ? (
        <WalletConnectedMenu openConnectedWallets={openAvailableWalletOptions} />
      ) : (
        <WalletNotConnectedMenu onConnectWallets={openAvailableWalletOptions} />
      )}
    </>
  );
};

SnetNavigation.propTypes = {
  blockchains: propTypes.arrayOf(propTypes.object)
};

export default SnetNavigation;
