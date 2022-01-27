import { lazy } from 'react';

const GeneralLayout = lazy(() => import('../../layouts/GeneralLayout'));
const ConverterForm = lazy(() => import('./ConverterForm'));

const Converter = () => {
  return (
    <GeneralLayout>
      <ConverterForm />
    </GeneralLayout>
  );
};

export default Converter;
