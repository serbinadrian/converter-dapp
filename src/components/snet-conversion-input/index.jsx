import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Stack, Typography } from '@mui/material';
import { toUpper } from 'lodash';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import propTypes from 'prop-types';
import BlockchainDropdown from './BlockchainDropdown';
import InputWithAssetDropdown from './InputWithAssetDropdown';
import { styles } from './styles';

const SnetConversionOptions = ({ tokenPair, direction, blockchains, onInputChange, inputValue, readOnly, handleSelectToken, id }) => {
  const [selectedBlockchain, setSelectedBlockchain] = useState([]);
  const [blockchainTokenPairs, setBlockchainTokenpairs] = useState([]);
  const [walletAddress, setWalletAddress] = useState(undefined);

  const state = useSelector((state) => state);
  const { wallets } = state.wallet;

  const onSelectBlockchain = (event) => {
    const blockchain = event.target.value;
    setSelectedBlockchain(blockchain);
    setBlockchainTokenpairs(blockchain.pairs);
  };

  const onSelectToken = (event) => {
    const token = event.target.value;
    handleSelectToken(token);
  };

  const getAddressByBlockchain = (blockchainName) => {
    if (blockchainName.length > 0) {
      const [address] = wallets.filter((wallet) => wallet[blockchainName]);
      setWalletAddress(address[blockchainName]);
    }
  };

  useEffect(() => {
    getAddressByBlockchain(toUpper(selectedBlockchain.name));
  }, [wallets]);

  useEffect(() => {
    const [defaultBlockchain] = blockchains;
    const [defaultTokenPair] = defaultBlockchain.pairs;
    setSelectedBlockchain(defaultBlockchain);
    setBlockchainTokenpairs(defaultBlockchain.pairs);
    handleSelectToken(defaultTokenPair);
  }, []);

  return (
    <>
      <Stack spacing={1} direction="row" alignItems="center" marginBottom={2} justifyContent="space-between" id={`conversion-direction-${id}`}>
        <Stack spacing={1} direction="row" alignItems="center">
          <Typography variant="body2">{direction}</Typography>
          {blockchains ? (
            <BlockchainDropdown value={selectedBlockchain} handleSelect={onSelectBlockchain} tokens={blockchains} id="snet-conversion-input" />
          ) : null}
        </Stack>
        <Stack spacing={1} direction="row" alignItems="center">
          <WalletIcon color="grey" sx={styles.walletIconSize} />
          {walletAddress ? (
            <Typography sx={styles.walletNotSelected}>{walletAddress}</Typography>
          ) : (
            <Typography sx={styles.walletNotSelected}>Wallet Not Selected</Typography>
          )}
        </Stack>
      </Stack>
      <InputWithAssetDropdown
        readOnly={readOnly}
        onInputChange={onInputChange}
        inputValue={inputValue}
        value={tokenPair}
        handleSelect={onSelectToken}
        tokenPairs={blockchainTokenPairs}
      />
    </>
  );
};

SnetConversionOptions.propTypes = {
  direction: propTypes.string.isRequired,
  blockchains: propTypes.arrayOf(propTypes.object),
  onInputChange: propTypes.func,
  inputValue: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  readOnly: propTypes.bool,
  handleSelectToken: propTypes.func.isRequired,
  tokenPair: propTypes.object,
  id: propTypes.string.isRequired
};

SnetConversionOptions.defaultProps = {
  blockchains: [],
  readOnly: false
};

export default SnetConversionOptions;
