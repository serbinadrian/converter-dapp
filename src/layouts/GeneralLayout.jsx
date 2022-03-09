// import Web3 from 'web3';
// import Web3Modal from 'web3modal';
import Container from '@mui/material/Container';
import propTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menubar from '../components/snet-navigation';
import SnetModal from '../components/snet-modal';
import { getAvailableBlockchains } from '../services/redux/slices/blockchain/blockchainActions';
import { useWalletHook } from '../components/snet-wallet-connector/walletHook';

const GeneralLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { entities } = useSelector((state) => state.blockchains);
  const address = useWalletHook();

  useEffect(() => {
    if (entities.length < 1) {
      dispatch(getAvailableBlockchains());
    }
  }, []);

  useEffect(() => {
    console.log('ADDRESSSS', address);
  }, []);

  return (
    <>
      <SnetModal open={false} heading="Unsupported Network" message="Please Switch to Ethereum MAINNET Network" />
      <Menubar blockchains={entities} />
      <Container sx={{ marginTop: 8 }}>{children}</Container>
    </>
  );
};

GeneralLayout.propTypes = {
  children: propTypes.node.isRequired
};

export default GeneralLayout;
