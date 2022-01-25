import { lazy } from 'react';

const GeneralLayout = lazy(() => import('../../layouts/GeneralLayout'));

const Converter = () => {
  return <GeneralLayout />;
};

export default Converter;
