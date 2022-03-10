import Container from '@mui/material/Container';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menubar from '../components/snet-navigation';
import SnetModal from '../components/snet-modal';
import { getAvailableBlockchains } from '../services/redux/slices/blockchain/blockchainActions';
import { useWalletHook } from '../components/snet-wallet-connector/walletHook';

const GeneralLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { entities } = useSelector((state) => state.blockchains);
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const { userNetworkId } = useWalletHook();

  useEffect(() => {
    if (entities.length < 1) {
      dispatch(getAvailableBlockchains());
    }
  }, []);

  useEffect(() => {
    console.log('@@@@@@@@@@@@@@@@', process.env.REACT_APP_INFURA_NETWORK_ID, userNetworkId);
    if (process.env.REACT_APP_INFURA_NETWORK_ID !== userNetworkId) {
      setOpenModal(true);
    }
  }, []);

  return (
    <>
      <SnetModal open={openModal} handleClose={handleClose} heading="Unsupported Network" message="Please Switch to Ethereum MAINNET Network" />
      <Menubar blockchains={entities} />
      <Container sx={{ marginTop: 8 }}>{children}</Container>
    </>
  );
};

GeneralLayout.propTypes = {
  children: propTypes.node.isRequired
};

export default GeneralLayout;
