import Web3 from 'web3';
import isNil from 'lodash/isNil';
import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import round from 'lodash/round';
import BigNumber from 'bignumber.js';
import { splitSignature } from '@ethersproject/bytes';
import WalletConnectProvider from '@walletconnect/web3-provider';
import ERC20TokenABI from '../../contracts/erc20-abi/abi/SingularityNetToken.json';
import TokenConversionManagerABI from '../../contracts/singularitynet-token-manager/abi/TokenConversionManager.json';

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

  const convertToCogs = (amount, decimals) => {
    const amountInCogs = new BigNumber(amount).times(10 ** decimals);
    return amountInCogs.toString();
  };

  const convertAsReadableAmount = (balanceInCogs, decimals) => {
    const rawbalance = new BigNumber(balanceInCogs).dividedBy(new BigNumber(10 ** decimals));
    return round(rawbalance, 2);
  };

  const balanceFromWallet = async (tokenContractAddress) => {
    try {
      const contract = new web3.eth.Contract(ERC20TokenABI, tokenContractAddress);
      const balanceInCogs = await contract.methods.balanceOf(address).call();
      const decimals = await contract.methods.decimals().call();
      const symbol = await contract.methods.symbol().call();
      const balance = convertAsReadableAmount(balanceInCogs, decimals);

      return { symbol, balance };
    } catch (error) {
      throw error.toString();
    }
  };

  const approveSpender = async (tokenContractAddress, spenderAddress) => {
    const limitInCogs = new BigNumber(1000000).multipliedBy(new BigNumber(10 ** 8));
    const contract = new web3.eth.Contract(ERC20TokenABI, tokenContractAddress);
    const estimateGasPrice = await contract.methods.approve(spenderAddress, limitInCogs).estimateGas({ from: address });
    console.log('approveSpender estimateGasPrice', estimateGasPrice);
    contract.methods
      .approve(spenderAddress, limitInCogs)
      .send({ from: address, gasPrice: estimateGasPrice })
      .on('transactionHash', (hash) => {
        console.log('approveSpender transactionHash', hash);
      })
      .on('error', (error, receipt) => {
        console.log('approveSpender error', error.toString());
        console.log('approveSpender error receipt', receipt.toString());
      });
  };

  const checkAllowance = async (tokenContractAddress, walletAddress, spenderAddress) => {
    const contract = new web3.eth.Contract(ERC20TokenABI, tokenContractAddress);
    const allowanceInCogs = await contract.methods.allowance(walletAddress, spenderAddress).call();
    const decimals = await contract.methods.decimals().call();
    return convertAsReadableAmount(allowanceInCogs, decimals);
  };

  const conversionOut = async (contractAddress, amountToLock, conversionId, signature, decimals) => {
    console.log('contractAddress', contractAddress);
    console.log('decimals', decimals);
    const amount = web3.utils.toNumber(convertToCogs(amountToLock, decimals));
    const { v, r, s } = splitSignature(signature);
    const hexifiedConsversionId = web3.utils.toHex(conversionId);
    console.log('hexifiedConsversionId', hexifiedConsversionId);
    console.log('v', v);
    console.log('r', r);
    console.log('s', s);
    console.log('amountToLock', amount);
    const contract = new web3.eth.Contract(TokenConversionManagerABI, contractAddress);
    const gasPrice = await contract.methods.conversionOut(amount, hexifiedConsversionId, v, r, s).estimateGas({ from: address });
    console.log('gasLimit - ', gasPrice);

    contract.methods
      .conversionOut(amount, hexifiedConsversionId, v, r, s)
      .send({ from: address, gasPrice: gasPrice * 2 })
      .on('transactionHash', (hash) => {
        console.log('transactionHash', hash);
      })
      .on('error', (error, receipt) => {
        console.log('conversionOut error', error.toString());
        console.log('conversionOut error receipt', receipt.toString());
      });
  };

  return {
    approveSpender,
    checkAllowance,
    openWallet,
    disconnectWallet,
    isConnected,
    address,
    signMessage,
    getLatestBlock,
    conversionOut,
    balanceFromWallet,
    convertToCogs
  };
};
