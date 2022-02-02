import { useState } from 'react';
import upperCase from 'lodash/upperCase';
import { useWeb3React } from '@web3-react/core';
import propTypes from 'prop-types';

import WalletNotConnectedMenu from './WalletNotConnectedMenu';
import SnetDialog from '../snet-dialog';
import SnetBlockchainList from '../snet-blockchains-list';

const availableBlockchains = {
  ETHEREUM: 'ETHEREUM',
  CARDANO: 'CARDANO'
};

const SnetNavigation = ({ blockchains }) => {
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const { account } = useWeb3React();

  const toggleWalletConnecting = () => {
    setIsWalletConnecting(!isWalletConnecting);
  };

  const openAvailableWalletOptions = () => {
    toggleWalletConnecting();
  };

  const getWalletAddress = (blockchain) => {
    const blockchainName = upperCase(blockchain);
    if (blockchainName === availableBlockchains.ETHEREUM) {
      return account;
    }
    if (blockchainName === availableBlockchains.CARDANO) {
      return null;
    }
    return null;
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
