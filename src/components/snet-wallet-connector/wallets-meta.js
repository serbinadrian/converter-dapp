import Metamask from '../../assets/images/metamask.png';
import WalletConnect from '../../assets/images/walletconnect.svg';
import { injected, walletconnect } from './wallet-connectors';

const wallets = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    description: 'Easy-to-use browser extension.',
    imageSrc: Metamask
  },
  WALLETCONNECT: {
    connector: walletconnect,
    name: 'Wallet Connect',
    description: 'Connect to 100+ wallets with a QR code.',
    imageSrc: WalletConnect
  }
};

export default wallets;
