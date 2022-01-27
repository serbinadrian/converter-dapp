import { useState } from 'react';
import upperCase from 'lodash/upperCase';
import { useWeb3React } from '@web3-react/core';

import WalletNotConnectedMenu from './WalletNotConnectedMenu';
import SnetDialog from '../snet-dialog';
import SnetBlockchainList from '../snet-blockchains-list';

const SnetNavigation = () => {
  //   const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const { account } = useWeb3React();

  const toggleWalletConnecting = () => {
    setIsWalletConnecting(!isWalletConnecting);
  };

  const openAvailableWalletOptions = () => {
    toggleWalletConnecting();
  };

  const availableBlockchains = [
    {
      id: 1,
      name: 'Ethereum',
      logo: 'https://logos-world.net/wp-content/uploads/2020/12/Ethereum-Symbol.png',
      blockChainConnectInfo: 'Connect to your Etherium wallet',
      isExtensionAvailable: true
    },
    {
      id: 3,
      name: 'Cardano',
      logo: 'https://c.tenor.com/4hza808FnG4AAAAC/cardano-logo.gif',
      blockChainConnectInfo: 'Add your Cardano wallet address',
      isExtensionAvailable: false
    }
  ];

  const getWalletAddress = (blockchain) => {
    const blockchainName = upperCase(blockchain);
    if (blockchainName === 'ETHEREUM') {
      return account;
    }
    if (blockchainName === 'CARDANO') {
      return '0x0';
    }
    return null;
  };

  return (
    <>
      <SnetDialog dialogTitle="Connect Wallets" onDialogClose={toggleWalletConnecting} isDialogOpen={isWalletConnecting}>
        {availableBlockchains.map((blockchain) => {
          return (
            <SnetBlockchainList
              key={blockchain.id}
              blockchain={blockchain.name}
              blockchainLogo={blockchain.logo}
              blockChainConnectInfo={blockchain.blockChainConnectInfo}
              isWalletAvailable={blockchain.isExtensionAvailable}
              walletAddress={getWalletAddress(blockchain.name)}
            />
          );
        })}
      </SnetDialog>
      <WalletNotConnectedMenu onConnectWallets={openAvailableWalletOptions} />
    </>
  );
};

export default SnetNavigation;
