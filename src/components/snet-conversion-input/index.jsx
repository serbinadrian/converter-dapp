import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Stack, Typography } from '@mui/material';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import BlockchainDropdown from './BlockchainDropdown';
import InputWithAssetDropdown from './InputWithAssetDropdown';
import { styles } from './styles';

const SnetConversionOptions = ({
  walletAddress,
  tokenPair,
  tokenPairs,
  handleSelectToken,
  // old data
  handleBlockchainSelect,
  selectedBlockchain,
  direction,
  blockchains,
  onInputChange,
  inputValue,
  readOnly,
  id
}) => {
  const state = useSelector((state) => state);
  const { wallets } = state.wallet;

  const onSelectBlockchain = (event) => {
    const blockchain = event.target.value;
    handleBlockchainSelect(blockchain);
  };

  const onSelectToken = (event) => {
    const token = event.target.value;
    handleSelectToken(token);
  };

  return (
    <>
      <Stack spacing={1} direction="row" alignItems="center" marginBottom={2} justifyContent="space-between" id={`conversion-direction-${id}`}>
        <Stack spacing={1} direction="row" alignItems="center">
          <Typography minWidth="60px" variant="h5">
            {direction}
          </Typography>
          {blockchains ? (
            <BlockchainDropdown value={selectedBlockchain} handleSelect={onSelectBlockchain} tokens={blockchains} id="snet-conversion-input" />
          ) : null}
        </Stack>
        <Stack spacing={1} direction="row" alignItems="center" id={`wallet-address-${id}`}>
          <WalletIcon color="grey" sx={styles.walletIconSize} />
          <Typography sx={styles.walletNotSelected}>{walletAddress}</Typography>
        </Stack>
      </Stack>
      <InputWithAssetDropdown
        id={`snet-conversion-value-${id}`}
        readOnly={readOnly}
        onInputChange={onInputChange}
        inputValue={inputValue}
        value={tokenPair}
        handleSelect={onSelectToken}
        tokenPairs={tokenPairs}
      />
    </>
  );
};

SnetConversionOptions.propTypes = {
  blockchains: propTypes.arrayOf(propTypes.object),
  tokenPairs: propTypes.arrayOf(propTypes.object),
  walletAddress: propTypes.string,
  handleSelectToken: propTypes.func.isRequired,
  // old data
  direction: propTypes.string.isRequired,
  onInputChange: propTypes.func,
  inputValue: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  readOnly: propTypes.bool,
  tokenPair: propTypes.object,
  id: propTypes.string.isRequired,
  selectedBlockchain: propTypes.object.isRequired,
  handleBlockchainSelect: propTypes.func.isRequired
};

SnetConversionOptions.defaultProps = {
  blockchains: [],
  tokenPairs: [],
  readOnly: false,
  walletAddress: 'Wallet Not Selected'
};

export default SnetConversionOptions;
