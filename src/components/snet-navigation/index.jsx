import { useState } from 'react';
import propTypes from 'prop-types';
import WalletMenu from './WalletMenu';
import SnetConnectWallet from '../snet-connect-wallets';

const SnetNavigation = ({ blockchains }) => {
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const toggleWalletConnecting = () => {
    setIsWalletConnecting(!isWalletConnecting);
  };

  return (
    <>
      <SnetConnectWallet isDialogOpen={isWalletConnecting} onDialogClose={toggleWalletConnecting} blockchains={blockchains} />
      <WalletMenu openConnectedWallets={toggleWalletConnecting} />
    </>
  );
};

SnetNavigation.propTypes = {
  blockchains: propTypes.arrayOf(propTypes.object)
};

export default SnetNavigation;
