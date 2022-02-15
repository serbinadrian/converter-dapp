import { useState } from 'react';
import upperCase from 'lodash/upperCase';
import propTypes from 'prop-types';
import store from 'store';

import WalletNotConnectedMenu from './WalletNotConnectedMenu';
import SnetDialog from '../snet-dialog';
import SnetBlockchainList from '../snet-blockchains-list';
import { useWalletHook } from '../snet-wallet-connector/walletHook';

const availableBlockchains = {
  ETHEREUM: 'ETHEREUM',
  CARDANO: 'CARDANO'
};

const SnetNavigation = ({ blockchains }) => {
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [cardanoAddress, setCardanoAddress] = useState(null);
  const { address, openWallet, disconnectWallet } = useWalletHook();

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

  const onSaveAddress = async (address) => {
    setCardanoAddress(address);
    await store.set(availableBlockchains.CARDANO, address);
  };

  return (
    <>
      <SnetDialog dialogTitle="Connect Wallets" onDialogClose={toggleWalletConnecting} isDialogOpen={isWalletConnecting}>
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
              disconnectWallet={disconnectWallet}
            />
          );
        })}
      </SnetDialog>
      <WalletNotConnectedMenu onConnectWallets={openAvailableWalletOptions} />
    </>
  );
};

SnetNavigation.propTypes = {
  blockchains: propTypes.arrayOf(propTypes.object)
};

export default SnetNavigation;
