import { useState, useEffect } from 'react';
import { bigNumberSubtract, convertFromCogs } from '../../../utils/bignumber';
import { getConversionTransactionHistory } from '../../../utils/HttpRequests';

export const useConversionHistoryHook = (address) => {
  const [isLoading, setIsLoading] = useState(true);
  const [conversionHistory, setConversionHistory] = useState([]);
  const [pageSizes] = useState([5, 10, 20, 50, 100]);
  const [paginationSize, setPaginationSize] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState('');

  const onItemSelect = (value) => {
    setPageSize(value);
  };

  const onPageChange = (value) => {
    setPageNumber(value);
  };

  const formatSingleEntity = (entity) => {
    const chainType = `${entity.from_token.blockchain.symbol} - ${entity.to_token.blockchain.symbol}`;
    const fromDirection = entity.from_token.blockchain.symbol;
    const toDirection = entity.to_token.blockchain.symbol;
    const conversionDirection = `${fromDirection}_TO_${toDirection}`;
    const conversionId = entity.conversion.id;

    const depositAmount = convertFromCogs(entity.conversion.deposit_amount, entity.from_token.allowed_decimal);
    const receivingAmount = convertFromCogs(entity.conversion.claim_amount, entity.to_token.allowed_decimal);
    const conversionFees = bigNumberSubtract(depositAmount, receivingAmount);
    const conversionInfo = {
      conversionId,
      amount: entity.conversion.claim_amount,
      depositAddress: entity.wallet_pair.deposit_address,
      depositAmount,
      receivingAmount,
      conversionFees,
      pair: { from_token: entity.from_token, to_token: entity.to_token },
      wallet: entity.wallet_pair
    };

    return {
      id: conversionId,
      fromAddress: entity.wallet_pair.from_address,
      toAddress: entity.wallet_pair.to_address,
      status: entity.conversion.status,
      depositAmount,
      receivingAmount,
      claimAmount: entity.conversion.claim_amount,
      feeAmount: entity.conversion.fee_amount,
      lastUpdatedAt: entity.conversion.created_at,
      fromToken: entity.from_token.symbol,
      toToken: entity.to_token.symbol,
      transactions: entity.transactions,
      chainType,
      conversionDirection,
      conversionInfo
    };
  };

  const formatConversionHistory = (history) => {
    const formatted = history.map((conversion) => {
      return formatSingleEntity(conversion);
    });

    setConversionHistory(formatted);
  };

  const getConversionHistory = async () => {
    if (address) {
      try {
        setIsLoading(true);
        const data = await getConversionTransactionHistory(address, pageNumber, pageSize);
        const { meta, items } = data;
        formatConversionHistory(items);
        setPaginationSize(meta.page_count);
        setPageNumber(meta.page_number);
        setPaginationInfo(`Page ${meta.page_number} of ${meta.page_count}`);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getConversionHistory();
  }, [address, pageSize, pageNumber]);

  return {
    conversionHistory,
    getConversionHistory,
    isLoading,
    onItemSelect,
    pageSizes,
    paginationSize,
    onPageChange,
    paginationInfo
  };
};
