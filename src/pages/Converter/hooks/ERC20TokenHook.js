import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useWalletHook } from '../../../components/snet-wallet-connector/walletHook';
import { generateConversionID } from '../../../utils/HttpRequests';

export const useERC20TokenHook = () => {
  const [authorizationRequired, setAuthorizationRequired] = useState(false);
  const [conversionEnabled, setConversionEnabled] = useState(false);
  const [loader, setLoader] = useState({ isLoading: false, message: '', title: '' });

  const { tokens } = useSelector((state) => state.tokenPairs);

  const { balanceFromWallet, checkAllowance, approveSpender, getLatestBlock, address, signMessage, conversionOut } = useWalletHook();

  const getConversionId = async (tokenpairId, amount, toAddress) => {
    try {
      setLoader({ isLoading: true, message: 'Please sign from your wallet...', title: 'Wallet Interaction' });
      const amountForConversion = amount;
      const blockNumber = await getLatestBlock();
      const fromTokenAddress = address;
      const personalSignature = await signMessage(tokenpairId, amountForConversion, fromTokenAddress, toAddress);
      const { id, signature } = await generateConversionID(tokenpairId, amountForConversion, personalSignature, blockNumber, fromTokenAddress, toAddress);
      return { conversionId: id, signature, amountForConversion };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const convertEthToAda = async (contractAddress, amount, conversionId, signature, decimals) => {
    try {
      setLoader({ isLoading: true, message: 'Please confirm transaction from your wallet...', title: 'Wallet Interaction' });
      const response = await conversionOut(contractAddress, amount, conversionId, signature, decimals);
      return `${process.env.REACT_APP_ETHERSCAN_TXN_BASE_URL}/${response.transactionHash}`;
    } catch (error) {
      console.log(JSON.stringify(error));
      throw error;
    }
  };

  const burnERC20Tokens = async (tokenPairId, amount, toTokenAddress) => {
    try {
      const [pair] = tokens.filter((token) => token.from_token.id === tokenPairId);
      const contractAddress = pair.contract_address;
      const { conversionId, amountForConversion, signature } = await getConversionId(pair.id, amount, toTokenAddress);
      const txnLink = await convertEthToAda(contractAddress, amountForConversion, conversionId, signature, pair.from_token.allowed_decimal);
      return txnLink;
    } catch (error) {
      console.log('burnerc20', error);
    } finally {
      setLoader({ isLoading: false, message: '', title: '' });
    }
  };

  const approveSpendLimit = async (tokenPairId) => {
    try {
      setLoader({ isLoading: true, message: 'Approving spend limit...', title: 'Approving' });
      const [pair] = tokens.filter((token) => token.from_token.id === tokenPairId);
      const spenderAddress = pair.contract_address;
      const tokenContractAddress = pair.from_token.token_address;

      console.log('Authorization Token Contract Address:', tokenContractAddress);
      console.log('Authorization Spender address', spenderAddress);

      await approveSpender(tokenContractAddress, spenderAddress);
      setConversionEnabled(true);
      setAuthorizationRequired(false);
    } catch (error) {
      const e = error.message || error;
      throw e;
    } finally {
      setLoader({ isLoading: false, message: '', title: '' });
    }
  };

  const getAllowanceInfo = async (tokenPairId, conversionAmount) => {
    try {
      const [pair] = tokens.filter((token) => token.from_token.id === tokenPairId);
      const spenderAddress = pair.contract_address;
      const tokenContractAddress = pair.from_token.token_address;
      const allowanceAmount = await checkAllowance(tokenContractAddress, spenderAddress);

      setAuthorizationRequired(allowanceAmount < conversionAmount);
      setConversionEnabled(allowanceAmount >= conversionAmount);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWalletBalance = async (tokenContractAddress) => {
    try {
      return await balanceFromWallet(tokenContractAddress);
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchWalletBalance, getAllowanceInfo, conversionEnabled, authorizationRequired, approveSpendLimit, loader, burnERC20Tokens };
};
