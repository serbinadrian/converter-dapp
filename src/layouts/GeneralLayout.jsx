import propTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menubar from '../components/snet-navigation';
import { getAvailableBlockchains } from '../services/redux/slices/blockchain/blockchainActions';
import { useStyles } from './styles';

const GeneralLayout = ({ children }) => {
  const classes = useStyles();
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
      <div className={classes.mainContainer}>
        <div className={classes.mainContainerWrapper}>{children}</div>
      </div>
    </>
  );
};

GeneralLayout.propTypes = {
  children: propTypes.node.isRequired
};

export default GeneralLayout;
