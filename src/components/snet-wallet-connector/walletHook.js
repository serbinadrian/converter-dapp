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
      setWalletAddress(web3.utils.toChecksumAddress(account));
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

  const getLatestBlock = async () => {
    const block = await web3.eth.getBlockNumber();
    return block;
  };

  const signMessage = async (tokenPaidId, amount, fromAddress, toAddress) => {
    const blockNumber = await getLatestBlock();
    const message = await web3.utils.soliditySha3(
      { type: 'string', value: tokenPaidId },
      { type: 'string', value: amount },
      { type: 'string', value: fromAddress },
      { type: 'string', value: toAddress },
      { type: 'uint256', value: blockNumber }
    );

    const hash = await web3.eth.personal.sign(message, fromAddress);
    return hash;
  };

  const disconnectWallet = () => {
    web3Modal.clearCachedProvider();
    setWalletAddress(null);
  };

  const getTokenContractBalance = async (abi, tokenAddress) => {
    const contract = new web3.eth.Contract(abi, tokenAddress);
    const balance = await contract.methods.balanceOf(tokenAddress).call();
    return balance;
  };

  const approveSpender = async (abi, tokenAddress, spenderAddress, limit) => {
    const contract = new web3.eth.Contract(abi, tokenAddress);
    const estimateGasPrice = await contract.methods.approve(spenderAddress, limit).estimateGas({ from: address });
    console.log('approveSpender estimateGasPrice', estimateGasPrice);
    contract.methods
      .approve(spenderAddress, limit)
      .send({ from: address, gasPrice: estimateGasPrice })
      .on('transactionHash', (hash) => {
        console.log('approveSpender transactionHash', hash);
      })
      .on('error', (error, receipt) => {
        console.log('approveSpender error', error.toString());
        console.log('approveSpender error receipt', receipt.toString());
      });
  };

  const checkAllowance = async (abi, contractAddress, ownerAddress, spenderAddress) => {
    const contract = new web3.eth.Contract(abi, contractAddress);
    const estimateGasPrice = await contract.methods.allowance(ownerAddress, spenderAddress).estimateGas({ from: address });
    console.log('checkAllowance estimateGasPrice', estimateGasPrice);
    const response = await contract.methods.allowance(ownerAddress, spenderAddress).call();
    console.log('allowance response', response);
    return response;
  };

  const lockTokens = async (abi, contractAddress, amount) => {
    const amountToLock = BigInt(amount);

    console.log('contractAddress', contractAddress);

    const contract = new web3.eth.Contract(abi, contractAddress);
    const estimateGasPrice = await contract.methods.lockTokens(amountToLock).estimateGas({ from: address });
    console.log('estimateGasPrice', estimateGasPrice);
    contract.methods
      .lockTokens(amountToLock)
      .send({ from: address, gasPrice: estimateGasPrice })
      .on('transactionHash', (hash) => {
        console.log('transactionHash', hash);
      })
      .on('error', (error, receipt) => {
        console.log('lockTokens error', error.toString());
        console.log('lockTokens error receipt', receipt.toString());
      });
  };

  return {
    approveSpender,
    getTokenContractBalance,
    checkAllowance,
    openWallet,
    disconnectWallet,
    isConnected,
    address,
    signMessage,
    getLatestBlock,
    lockTokens
  };
};
