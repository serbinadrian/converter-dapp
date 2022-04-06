import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import SnetLinearLoader from '../components/snet-linear-loader';
import paths from './paths';

const Converter = lazy(() => import('../pages/Converter'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Transactions = lazy(() => import('../pages/Transactions'));
const Contact = lazy(() => import('../pages/Contact'));

const routes = () => {
  return (
    <Suspense fallback={<SnetLinearLoader />}>
      <Routes>
        <Route path={paths.Transactions} element={<Transactions />} />
        <Route path={paths.Converter} element={<Converter />} />
        <Route path={paths.NotFound} element={<NotFound />} />
        <Route path={paths.Contact} element={<Contact />} />
      </Routes>
    </Suspense>
  );
};

export default routes;
