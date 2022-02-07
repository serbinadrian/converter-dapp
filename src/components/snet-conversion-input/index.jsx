import { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import propTypes from 'prop-types';
import BlockchainDropdown from './BlockchainDropdown';
import InputWithAssetDropdown from './InputWithAssetDropdown';
import { styles } from './styles';

const SnetConversionOptions = ({ direction, blockchains, onInputChange, inputValue }) => {
  const [selectedBlockchain, setSelectedBlockchain] = useState(blockchains[0]);
  const [blockchainTokenPairs, setBlockchainTokenpairs] = useState([]);
  const [selectedToken, setSelectedToken] = useState({});

  const onSelectBlockchain = (event) => {
    const blockchain = event.target.value;
    setSelectedBlockchain(blockchain);
    setBlockchainTokenpairs(blockchain.pairs);
  };

  const onSelectToken = (event) => {
    const token = event.target.value;
    setSelectedToken(token);
  };

  return (
    <>
      <Stack spacing={1} direction="row" alignItems="center" marginBottom={2} justifyContent="space-between">
        <Stack spacing={1} direction="row" alignItems="center">
          <Typography variant="body2">{direction}</Typography>
          {blockchains ? <BlockchainDropdown value={selectedBlockchain} handleSelect={onSelectBlockchain} tokens={blockchains} /> : null}
        </Stack>
        <Stack spacing={1} direction="row" alignItems="center">
          <WalletIcon color="grey" sx={styles.walletIconSize} />
          <Typography sx={styles.walletNotSelected}>Wallet Not Selected</Typography>
        </Stack>
      </Stack>
      <InputWithAssetDropdown
        onInputChange={onInputChange}
        inputValue={inputValue}
        value={selectedToken}
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
  inputValue: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired
};

SnetConversionOptions.defaultProps = {
  blockchains: []
};

export default SnetConversionOptions;
