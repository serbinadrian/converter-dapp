import { toUpper } from 'lodash';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { bigNumberSubtract, convertFromCogs } from '../../../utils/bignumber';
import { availableBlockchains, conversionDirections } from '../../../utils/ConverterConstants';
import { getConversionTransactionHistory, getTransactionData } from '../../../utils/HttpRequests';

const useConversionHistoryHook = (address) => {
  const [isLoading, setIsLoading] = useState(true);
  const [conversionHistory, setConversionHistory] = useState([]);
  const [pageSizes] = useState([5, 10, 20]);
  const [paginationSize, setPaginationSize] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState('');
  const [totalNoOfTransaction, setTotalNoOfTransaction] = useState(0);
  const { entities } = useSelector((state) => state.blockchains);
  const [expanded, setExpanded] = useState({});

  const onItemSelect = (value) => {
    setPageSize(value);
  };

  const onPageChange = (value) => {
    setPageNumber(value);
  };

  const setExpandedValue = (id, value) => {
    const expandedData = { ...expanded };
    if (value) {
      expandedData[id] = value;
    } else {
      delete expandedData[id];
    }
    setExpanded(expandedData);
  };

  const formatSingleEntity = (entity, ethereumRequired, cardanoRequired) => {
    const chainType = `${entity.from_token.blockchain.name} - ${entity.to_token.blockchain.name}`;
    const fromDirection = entity.from_token.blockchain.symbol;
    const toDirection = entity.to_token.blockchain.symbol;
    const conversionDirection = `${fromDirection}_TO_${toDirection}`;
    const conversionId = entity.conversion.id;

    const depositAmount = convertFromCogs(entity.conversion.deposit_amount, entity.from_token.allowed_decimal);
    const receivingAmount = convertFromCogs(entity.conversion.claim_amount, entity.to_token.allowed_decimal);
    const conversionFees = bigNumberSubtract(depositAmount, receivingAmount);
    const confirmationRequired = conversionDirection === conversionDirections.ETH_TO_ADA ? ethereumRequired : cardanoRequired;
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
      chainType,
      conversionDirection,
      conversionInfo,
      confirmationRequired
    };
  };

  const formatConversionHistory = async (history) => {
    const [ethereumConfiramtions] = entities.filter((entity) => toUpper(entity.name) === availableBlockchains.ETHEREUM);
    const [cardanoConfiramtions] = entities.filter((entity) => toUpper(entity.name) === availableBlockchains.CARDANO);
    const ethereumRequired = ethereumConfiramtions?.block_confirmation;
    const cardanoRequired = cardanoConfiramtions?.block_confirmation;
    let conversionIds = [];
    let formatted = history.map((conversion) => {
      conversionIds = [...conversionIds, conversion.conversion.id];
      return formatSingleEntity(conversion, ethereumRequired, cardanoRequired);
    });
    try {
      const conversionIdsTnx = Object.keys(expanded).filter((obj) => conversionIds.indexOf(obj) !== -1);
      const response = await Promise.all(conversionIdsTnx.map((conversionId) => getTransactionData(conversionId)));
      response.forEach((element, index) => {
        formatted = formatted.map((data) => {
          if (data.id === conversionIdsTnx[index]) {
            data.transactions = element;
          }
          return data;
        });
      });
    } catch (error) {
      console.log(error);
    }
    setConversionHistory(formatted);
  };

  const formatTransactionHistory = (transaction, conversionId) => {
    const formatted = conversionHistory.map((data) => {
      if (data.id === conversionId) {
        data.transactions = transaction;
      }
      return data;
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
        setTotalNoOfTransaction(meta.total_records);
        setPaginationInfo(`Page ${meta.page_number} of ${meta.page_count}`);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getTransactionHistory = async (conversionId) => {
    if (conversionId) {
      try {
        setIsLoading(true);
        const data = await getTransactionData(conversionId);
        formatTransactionHistory(data, conversionId);
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

  useEffect(() => {
    const interval = setInterval(() => {
      getConversionHistory();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [address, pageSize, pageNumber, expanded]);

  return {
    pageNumber,
    conversionHistory,
    getConversionHistory,
    getTransactionHistory,
    isLoading,
    onItemSelect,
    pageSizes,
    paginationSize,
    onPageChange,
    paginationInfo,
    totalNoOfTransaction,
    expanded,
    setExpandedValue
  };
};

export default useConversionHistoryHook;
