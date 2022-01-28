import { lazy } from 'react';
import Grid from '@mui/material/Grid';

const GeneralLayout = lazy(() => import('../../layouts/GeneralLayout'));
const ConverterForm = lazy(() => import('./ConverterForm'));
const WelcomeBox = lazy(() => import('./WelcomeBox'));

const Converter = () => {
  return (
    <GeneralLayout>
      <Grid display="flex" alignItems="flex-start" container spacing={2}>
        <Grid item xs={12} md={5}>
          <WelcomeBox />
        </Grid>
        <Grid item xs={12} md={7}>
          <ConverterForm />
        </Grid>
      </Grid>
    </GeneralLayout>
  );
};

export default Converter;
