import { Stack, Typography } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BlockchainDropdown from './BlockchainDropdown';
import InputWithAssetDropdown from './InputWithAssetDropdown';
import { styles } from './styles';

const SnetConversionOptions = () => {
  return (
    <>
      <Stack spacing={1} direction="row" alignItems="center" marginBottom={2} justifyContent="space-between">
        <Stack spacing={1} direction="row" alignItems="center">
          <Typography variant="body2">FROM</Typography>
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

export default SnetConversionOptions;
