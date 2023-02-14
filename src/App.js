import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import rout from './routes';

const history = createBrowserHistory();

const HomePage = lazy(() =>
  import(
    'components/HomePageMovies/HomePageMovies' /* webpackChunkName: "home-page" */
  )
);

const SearchPage = lazy(() =>
  import(
    'components/SearchPageMovies/SearchPageMovies' /* webpackChunkName: "search-page" */
  )
);

const DetailsPage = lazy(() =>
  import(
    'components/DetailsPageMovie/DetailsPageMovie' /* webpackChunkName: "details-page" */
  )
);

const App = () => (
  <>
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path={rout.home} element={<HomePage />} />
        <Route path={`${rout.search}/*`} element={<SearchPage />} />
        <Route
          path={`${rout.details}/*`}
          history={history}
          element={<DetailsPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </>
);
export default App;
