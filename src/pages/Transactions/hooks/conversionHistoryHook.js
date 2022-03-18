import { useState, useEffect } from 'react';
import axios from '../../../utils/Axios';
import { bigNumberSubtract, convertFromCogs } from '../../../utils/bignumber';

export const useConversionHistoryHook = (address) => {
  const [conversionHistory, setConversionHistory] = useState([]);
  const [pageSize] = useState(10);
  const [pageNumber] = useState(1);

  const formatSingleEntity = (entity) => {
    const chainType = `${entity.from_token.symbol} - ${entity.to_token.symbol}`;
    const fromDirection = entity.from_token.blockchain.symbol;
    const toDirection = entity.to_token.blockchain.symbol;
    const conversionDirection = `${fromDirection}_TO_${toDirection}`;
    const conversionId = entity.conversion.id;

    const depositAmount = convertFromCogs(entity.conversion.deposit_amount, entity.from_token.allowed_decimal);
    const receievingAmount = convertFromCogs(entity.conversion.claim_amount, entity.to_token.allowed_decimal);
    const conversionFees = bigNumberSubtract(depositAmount, receievingAmount);
    const conversionInfo = {
      conversionId,
      amount: entity.conversion.claim_amount,
      depositAddress: entity.wallet_pair.deposit_address,
      depositAmount,
      receievingAmount,
      conversionFees,
      pair: { from_token: entity.from_token, to_token: entity.to_token },
      wallet: entity.wallet_pair
    };

    return {
      id: conversionId,
      fromAddress: entity.wallet_pair.from_address,
      toAddress: entity.wallet_pair.to_address,
      status: entity.conversion.status,
      depositAmount: entity.conversion.deposit_amount,
      claimAmount: entity.conversion.claim_amount,
      feeAmount: entity.conversion.fee_amount,
      lastUpdatedAt: entity.conversion.updated_at,
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
        const { data } = await axios.get('/conversion/history', {
          params: {
            page_number: pageNumber,
            page_size: pageSize,
            address
          }
        });

        formatConversionHistory(data.items);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getConversionHistory();
  }, [address]);

  return {
    conversionHistory
  };
};
