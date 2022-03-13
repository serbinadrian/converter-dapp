import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useWalletHook } from '../../../components/snet-wallet-connector/walletHook';
import { generateConversionID } from '../../../utils/HttpRequests';

export const useERC20TokenHook = () => {
  const [authorizationRequired, setAuthorizationRequired] = useState(false);
  const [conversionEnabled, setConversionEnabled] = useState(false);
  const [loader, setLoader] = useState({ isLoading: false, message: '', title: '' });
  const [txnInfo, setTxnInfo] = useState({ txnLink: null, txnAmount: 0, tokenName: null, tokenSymbol: null });

  const { tokens } = useSelector((state) => state.tokenPairs);

  const { balanceFromWallet, checkAllowance, approveSpender, getLatestBlock, address, signMessage, conversionOut, convertToCogs } = useWalletHook();

  const getConversionId = async (tokenpairId, amount, toAddress) => {
    try {
      setLoader({ isLoading: true, message: 'Please sign from your wallet...', title: 'Wallet Interaction' });
      const blockNumber = await getLatestBlock();
      const fromTokenAddress = address;
      const personalSignature = await signMessage(tokenpairId, amount, fromTokenAddress, toAddress);
      const { id, signature } = await generateConversionID(tokenpairId, amount, personalSignature, blockNumber, fromTokenAddress, toAddress);
      return { conversionId: id, signature, amount };
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
      const amountInCogs = convertToCogs(amount, pair.from_token.allowed_decimal);
      // const amountInCogs = amount;
      const { conversionId, signature } = await getConversionId(pair.id, amountInCogs, toTokenAddress);
      const txnLink = await convertEthToAda(contractAddress, amount, conversionId, signature, pair.from_token.allowed_decimal);
      setTxnInfo({ txnLink, txnAmount: amount, tokenName: pair.from_token.name, tokenSymbol: pair.from_token.symbol });
    } catch (error) {
      console.log('Error on burnERC20Tokens', error);
      throw error;
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

  const disableApprovalAndConversionChecks = () => {
    setConversionEnabled(true);
    setAuthorizationRequired(false);
  };

  return {
    disableApprovalAndConversionChecks,
    fetchWalletBalance,
    getAllowanceInfo,
    conversionEnabled,
    authorizationRequired,
    approveSpendLimit,
    loader,
    burnERC20Tokens,
    txnInfo
  };
};
