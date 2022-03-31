import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import store from 'store';
import { useDispatch } from 'react-redux';
import isNil from 'lodash/isNil';
import WalletMenu from './WalletMenu';
import SnetConnectWallet from '../snet-connect-wallets';
import { availableBlockchains } from '../../utils/ConverterConstants';
import { useWalletHook } from '../snet-wallet-connector/walletHook';
import { setWallets } from '../../services/redux/slices/wallet/walletSlice';

const SnetNavigation = ({ blockchains }) => {
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [cardanoAddress, setCardanoAddress] = useState(null);
  const { address } = useWalletHook();
  const toggleWalletConnecting = () => {
    setIsWalletConnecting(!isWalletConnecting);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const cachedCardanoAddress = store.get(availableBlockchains.CARDANO) ?? null;
    setCardanoAddress(cachedCardanoAddress);
  });

  const getWalletPairs = () => {
    return {
      [availableBlockchains.ETHEREUM]: address,
      [availableBlockchains.CARDANO]: cardanoAddress
    };
  };

  const setWalletAddresses = () => {
    dispatch(setWallets(getWalletPairs()));
  };

  useEffect(() => {
    // Fetching wallet addresses from cache
    if (!isNil(address) && !isNil(cardanoAddress)) {
      setWalletAddresses();
    }
  }, [address, cardanoAddress]);

  return (
    <>
      <SnetConnectWallet isDialogOpen={isWalletConnecting} onDialogClose={toggleWalletConnecting} blockchains={blockchains} />
      <WalletMenu openConnectedWallets={toggleWalletConnecting} />
    </>
  );
};

SnetNavigation.propTypes = {
  blockchains: propTypes.arrayOf(propTypes.object)
};

export default SnetNavigation;
