import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, size } from 'lodash';
import propTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from './styles';
import Paths from '../../../router/paths';
import SnetButton from '../../snet-button';

const WalletMenu = ({ openConnectedWallets }) => {
  const classes = useStyles();
  const location = useLocation();
  const { pathname } = location;
  const state = useSelector((state) => state);
  const { wallets } = state.wallet;

  const splitLocation = pathname.split('/');

  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const stopProgationOfEventToHeader = (e) => {
    e.stopPropagation();
  };

  const toggleMobileMenu = (e) => {
    stopProgationOfEventToHeader(e);
    setOpenMobileMenu(!openMobileMenu);
  };

  if (!openMobileMenu) {
    return (
      <Box className={classes.hamburger} onClick={toggleMobileMenu}>
        <span />
        <span />
        <span />
      </Box>
    );
  }

  return (
    <Box className={classes.hamburgerNavContainer}>
      <div className={classes.closeMenuIcon}>
        <CloseIcon onClick={toggleMobileMenu} />
      </div>
      <Box className={classes.navAndWalletActionsContainer}>
        <ul className={classes.humburgerNavigations}>
          <li className={splitLocation[1] === '' ? classes.active : ''}>
            <Link to={Paths.Converter}>Home</Link>
          </li>
          <li className={splitLocation[1] === 'transactions' ? classes.active : ''}>
            <Link to={Paths.Transactions}>Transactions</Link>
          </li>
          <li className={splitLocation[1] === 'contact' ? classes.active : ''}>
            <Link to={Paths.Contact}>Contact</Link>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

WalletMenu.propTypes = {
  openConnectedWallets: propTypes.func.isRequired
};

export default WalletMenu;
