import { lazy } from 'react';
import Grid from '@mui/material/Grid';

const GeneralLayout = lazy(() => import('../../layouts/GeneralLayout'));
const ConverterForm = lazy(() => import('./ConverterForm'));
const WelcomeBox = lazy(() => import('./WelcomeBox'));

const Converter = () => {
  return (
    <GeneralLayout>
      <Grid display="flex" container spacing={2}>
        <Grid item xs={12} md={4}>
          <WelcomeBox />
        </Grid>
        <Grid item xs={12} md={8}>
          <ConverterForm />
        </Grid>
      </Grid>
    </GeneralLayout>
  );
};

export default Converter;
