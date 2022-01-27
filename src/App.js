import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './components/snet-wallet-connector/wallet-connectors';
import Router from './router';

const App = () => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Router />
  </Web3ReactProvider>
);

export default App;
