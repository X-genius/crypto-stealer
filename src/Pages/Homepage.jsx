import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../Components/ErrorBoundary';

const Banner = React.lazy(() => import('../Components/Banner/Banner'));
const CoinsTable = React.lazy(() => import('../Components/CoinsTable'));

const Homepage = () => {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <Suspense fallback={<div>Loading...</div>}>
          <Banner />
          <CoinsTable />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Homepage;
