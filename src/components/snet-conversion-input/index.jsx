import { Stack, Typography } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import propTypes from 'prop-types';
import BlockchainDropdown from './BlockchainDropdown';
import InputWithAssetDropdown from './InputWithAssetDropdown';
import { styles } from './styles';

const SnetConversionOptions = ({ direction }) => {
  return (
    <>
      <Stack spacing={1} direction="row" alignItems="center" marginBottom={2} justifyContent="space-between">
        <Stack spacing={1} direction="row" alignItems="center">
          <Typography variant="body2">{direction}</Typography>
          <BlockchainDropdown />
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
  direction: propTypes.string.isRequired
};

export default SnetConversionOptions;
