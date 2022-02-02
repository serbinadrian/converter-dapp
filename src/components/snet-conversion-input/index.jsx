import { Stack, Typography } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import propTypes from 'prop-types';
import BlockchainDropdown from './BlockchainDropdown';
import InputWithAssetDropdown from './InputWithAssetDropdown';
import { styles } from './styles';

const SnetConversionOptions = ({ direction, tokens, blockchains }) => {
  return (
    <>
      <Stack spacing={1} direction="row" alignItems="center" marginBottom={2} justifyContent="space-between">
        <Stack spacing={1} direction="row" alignItems="center">
          <Typography variant="body2">{direction}</Typography>
          <BlockchainDropdown tokens={blockchains} />
          {tokens.length > 0 ? <BlockchainDropdown tokens={blockchains} /> : null}
        </Stack>
        <Stack spacing={1} direction="row" alignItems="center">
          <WalletIcon color="grey" sx={styles.walletIconSize} />
          <Typography sx={styles.walletNotSelected}>Wallet Not Selected</Typography>
        </Stack>
      </Stack>
      <InputWithAssetDropdown />
    </>
  );
};

SnetConversionOptions.propTypes = {
  direction: propTypes.string.isRequired,
  tokens: propTypes.arrayOf(propTypes.object),
  blockchains: propTypes.arrayOf(propTypes.object)
};

SnetConversionOptions.defaultProps = {
  blockchains: [],
  tokens: []
};

export default SnetConversionOptions;
