import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useWeb3React } from '@web3-react/core';
import propTypes from 'prop-types';
import SnetDialog from '../snet-dialog';
import WalletConnectButton from './WalletConnectButton';
import WalletsMetadata from './wallets-meta';
import style from './style';

const SnetWalletConnector = ({ isDialogOpen, onWalletClose }) => {
  const { active, activate, account } = useWeb3React();

  const handleWalletConnect = async (walletConnector) => {
    console.log('active', active);
    if (!active) {
      await activate(walletConnector);
      onWalletClose();
    } else {
      console.log('account', account);
    }
  };

  return (
    <SnetDialog onDialogClose={onWalletClose} isDialogOpen={isDialogOpen} dialogTitle="Connect to a wallet">
      <WalletConnectButton
        onConnect={() => handleWalletConnect(WalletsMetadata.METAMASK.connector)}
        name={WalletsMetadata.METAMASK.name}
        description={WalletsMetadata.METAMASK.description}
        imageSrc={WalletsMetadata.METAMASK.imageSrc}
      />
      <Divider sx={style.divider}>
        <Typography variant="caption" color="gray">
          Or
        </Typography>
      </Divider>
      <WalletConnectButton
        onConnect={() => handleWalletConnect(WalletsMetadata.WALLETCONNECT.connector)}
        name={WalletsMetadata.WALLETCONNECT.name}
        description={WalletsMetadata.WALLETCONNECT.description}
        imageSrc={WalletsMetadata.WALLETCONNECT.imageSrc}
      />
    </SnetDialog>
  );
};

SnetWalletConnector.propTypes = {
  isDialogOpen: propTypes.bool.isRequired,
  onWalletClose: propTypes.func.isRequired
};

export default SnetWalletConnector;
