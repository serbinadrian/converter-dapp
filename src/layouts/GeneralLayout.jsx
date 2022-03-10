import Container from '@mui/material/Container';
import propTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menubar from '../components/snet-navigation';
import { getAvailableBlockchains } from '../services/redux/slices/blockchain/blockchainActions';
import SnetFooter from '../components/snet-footer';

const GeneralLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { entities } = useSelector((state) => state.blockchains);
  useEffect(() => {
    if (entities.length < 1) {
      dispatch(getAvailableBlockchains());
    }
  }, []);

  return (
    <>
      <Menubar blockchains={entities} />
      <Container sx={{ marginTop: 8 }}>{children}</Container>
      <SnetFooter />
    </>
  );
};

GeneralLayout.propTypes = {
  children: propTypes.node.isRequired
};

export default GeneralLayout;
