import BigNumber from 'bignumber.js';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useWalletHook } from '../../../components/snet-wallet-connector/walletHook';
import { bigNumberSubtract, convertFromCogs, convertToValueFromPercentage } from '../../../utils/bignumber';
import { generateConversionID, updateTransactionStatus } from '../../../utils/HttpRequests';

const useERC20TokenHook = () => {
  const [authorizationRequired, setAuthorizationRequired] = useState(false);
  const [conversionEnabled, setConversionEnabled] = useState(false);
  const [loader, setLoader] = useState({ isLoading: false, message: '', title: '' });
  const [txnInfo, setTxnInfo] = useState({ txnLink: null, txnAmount: 0, tokenName: '', tokenSymbol: '' });

  const { tokens } = useSelector((state) => state.tokenPairs);

  const { balanceFromWallet, checkAllowance, approveSpender, getLatestBlock, signMessage, conversionOut, convertToCogs, getWalletAddress } = useWalletHook();

  const resetTxnInfo = () => {
    setTxnInfo({ ...txnInfo, txnLink: null });
  };

  const getConversionId = async (tokenpairId, amount, fromTokenAddress, toAddress) => {
    try {
      setLoader({ isLoading: true, message: 'Please sign from your wallet...', title: 'Wallet Interaction' });
      const blockNumber = await getLatestBlock();
      const personalSignature = await signMessage(tokenpairId, amount, fromTokenAddress, toAddress);
      const conversionResponse = await generateConversionID(tokenpairId, amount, personalSignature, blockNumber, fromTokenAddress, toAddress);
      return {
        conversionId: conversionResponse.id,
        signature: conversionResponse.signature,
        amount,
        depositAddress: conversionResponse.deposit_address,
        depositAmount: conversionResponse.deposit_amount
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const convertEthToAda = async (contractAddress, amount, conversionId, signature, decimals) => {
    try {
      setLoader({ isLoading: true, message: 'Please confirm transaction from your wallet...', title: 'Wallet Interaction' });
      const transactionHash = await conversionOut(contractAddress, amount, conversionId, signature, decimals);
      await updateTransactionStatus(conversionId, transactionHash);
      return `${process.env.REACT_APP_ETHERSCAN_TXN_BASE_URL}/${transactionHash}`;
    } catch (error) {
      console.log(JSON.stringify(error));
      throw error;
    }
  };

  const disableButtons = () => {
    setAuthorizationRequired(false);
    setConversionEnabled(false);
  };

  const mintERC20Tokens = async (tokenPairId, amount, fromAddress) => {
    try {
      disableButtons();
      const [pair] = tokens.filter((token) => token.from_token.id === tokenPairId);
      const decimals = pair.from_token.allowed_decimal;
      const amountInCogs = convertToCogs(amount, decimals);
      const toAddress = await getWalletAddress();
      const conversionInfo = await getConversionId(pair.id, amountInCogs, fromAddress, toAddress);
      const depositAmount = convertFromCogs(conversionInfo.depositAmount, decimals);
      let conversionFees = 0;
      if (!isEmpty(pair.conversion_fee)) {
        conversionFees = convertToValueFromPercentage(depositAmount, pair.conversion_fee.percentage_from_source);
      }
      const receivingAmount = bigNumberSubtract(depositAmount, conversionFees);
      return { ...conversionInfo, depositAmount, pair, receivingAmount, conversionFees };
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setConversionEnabled(true);
      setLoader({ isLoading: false, message: '', title: '' });
    }
  };

  const burnERC20Tokens = async (tokenPairId, amount, toAddress) => {
    try {
      disableButtons();
      const [pair] = tokens.filter((token) => token.from_token.id === tokenPairId);
      const contractAddress = pair.contract_address;
      const fromAddress = await getWalletAddress();
      console.log(`Burning ${amount} ${pair.from_token.symbol} from ${fromAddress} to ${toAddress}`);
      const amountInCogs = convertToCogs(amount, pair.from_token.allowed_decimal);
      const { conversionId, signature } = await getConversionId(pair.id, amountInCogs, fromAddress, toAddress);
      const txnLink = await convertEthToAda(contractAddress, amount, conversionId, signature, pair.from_token.allowed_decimal);
      setTxnInfo({ txnLink, txnAmount: amount, tokenName: pair.from_token.name, tokenSymbol: pair.from_token.symbol });
    } catch (error) {
      console.log('Error on burnERC20Tokens', error);
      throw error;
    } finally {
      setConversionEnabled(true);
      setLoader({ isLoading: false, message: '', title: '' });
    }
  };

  const approveSpendLimit = async (tokenPairId) => {
    try {
      disableButtons();
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
      setAuthorizationRequired(true);
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
      console.log('Allowance is ', allowanceAmount);

      setAuthorizationRequired(new BigNumber(allowanceAmount).lt(conversionAmount));
      setConversionEnabled(new BigNumber(allowanceAmount).gte(conversionAmount));
    } catch (error) {
      console.log('Get Allowance Info Error', error);
      throw error;
    }
  };

  const fetchWalletBalance = async (tokenContractAddress) => {
    try {
      return await balanceFromWallet(tokenContractAddress);
    } catch (error) {
      console.log('Fetch Wallet Balance error', error);
      throw error;
    }
  };

  return {
    mintERC20Tokens,
    fetchWalletBalance,
    getAllowanceInfo,
    conversionEnabled,
    authorizationRequired,
    approveSpendLimit,
    loader,
    burnERC20Tokens,
    txnInfo,
    resetTxnInfo
  };
};

export default useERC20TokenHook;
