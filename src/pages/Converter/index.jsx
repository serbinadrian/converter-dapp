import { lazy } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { availableBlockchains } from '../../utils/ConverterConstants';

const GeneralLayout = lazy(() => import('../../layouts/GeneralLayout'));
const ConverterForm = lazy(() => import('./ConverterForm'));
const WelcomeBox = lazy(() => import('./WelcomeBox'));
const ADATOERC20ETH = lazy(() => import('./ADATOERC20ETH'));
const ERC20TOADA = lazy(() => import('./ERC20TOADA'));

const Converter = () => {
  const { tokenPairs, blockchains } = useSelector((state) => state);
  const { conversionDirection } = tokenPairs;

  return (
    <GeneralLayout>
      {conversionDirection === availableBlockchains.CARDANO ? (
        <Grid display="flex" justifyContent="center">
          <Grid item>
            <ADATOERC20ETH />
          </Grid>
        </Grid>
      ) : (
        <Grid display="flex" alignItems="flex-start" container spacing={2}>
          <Grid item xs={12} md={5}>
            <WelcomeBox />
          </Grid>
          <Grid item xs={12} md={7}>
            <ERC20TOADA />
          </Grid>
        </Grid>
      )}
    </GeneralLayout>
  );
};

export default Converter;
