import { lazy } from 'react';
import Stack from '@mui/material/Stack';

const GeneralLayout = lazy(() => import('../../layouts/GeneralLayout'));
const ConverterForm = lazy(() => import('./ConverterForm'));
const WelcomeBox = lazy(() => import('./WelcomeBox'));

const Converter = () => {
  return (
    <GeneralLayout>
      <Stack direction="row" alignItems="start" justifyContent="space-between">
        <WelcomeBox />
        <ConverterForm />
      </Stack>
    </GeneralLayout>
  );
};

export default Converter;
