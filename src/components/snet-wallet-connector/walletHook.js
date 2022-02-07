import Web3 from 'web3';
import isNil from 'lodash/isNil';
import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
const INFURA_NETWORK_ID = process.env.REACT_APP_INFURA_NETWORK_ID;
const INFURA_NETWORK_NAME = INFURA_NETWORK_ID === '1' ? 'mainnet' : 'ropsten';

let web3 = null;
let provider = null;

const providerOptions = {
  injected: {
    package: null
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_KEY
    }
  }
};

const web3Modal = new Web3Modal({
  network: INFURA_NETWORK_NAME,
  cacheProvider: true,
  providerOptions
});

export const useWalletHook = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setWalletAddress] = useState(null);

  const subscribeProvider = async (provider) => {
    if (!provider.on) {
      return;
    }
    provider.on('accountsChanged', async (accounts) => {
      const [address] = accounts;
      setWalletAddress(address);
    });
    provider.on('chainChanged', async (chainId) => {
      const networkId = await web3.eth.net.getId();
      console.log('chainChanged', chainId, networkId);
    });
    provider.on('networkChanged', async (networkId) => {
      const chainId = await web3.eth.net.chainId();
      console.log('networkChanged', networkId, chainId);
    });
  };

  const openWallet = async () => {
    try {
      provider = await web3Modal.connect();
      subscribeProvider(provider);
      await provider.enable();

      web3 = new Web3(provider);
      const [account] = await web3.eth.getAccounts();
      setWalletAddress(account);
      return web3;
    } catch (error) {
      throw new Error(error.toString());
    }
  };

  const initializeConnection = () => {
    const connected = !isNil(web3Modal.cachedProvider);
    setIsConnected(connected);
    if (connected) {
      openWallet();
    }
  };

  useEffect(() => {
    initializeConnection();
  }, []);

  const signMessage = async (message) => {
    const checkSumAddress = web3.utils.toChecksumAddress(address);
    const hash = await web3.eth.personal.sign(message, checkSumAddress);
    console.log('signedMessage', hash);
    console.log('address', checkSumAddress);
    return hash;
  };

  const disconnectWallet = () => {
    web3Modal.clearCachedProvider();
    setWalletAddress(null);
  };

  return { openWallet, disconnectWallet, isConnected, address, signMessage };
};
