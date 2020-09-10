import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import { Async, ScrollToTop } from 'components/Commons';
import routes from './routes';
import NoAuthLayout from 'themes/NoAuth';

const App = () => {
  const availabelRoutes = routes;

  const routeRenderer = (Layout = NoAuthLayout, pageComponent) => () => {
    return (
      <Layout>
        <Async page={pageComponent} />
      </Layout>
    );
  };

  const routeListRedenrer = availabelRoutes => {
    let render = [];
    availabelRoutes.forEach(({ pageComponent, layout, isExact, path }) => {
      render.push(
        <Route
          key={`${pageComponent}-root`}
          path={path}
          exact={isExact}
          render={routeRenderer(layout, pageComponent)}
        />,
      );
    });
    return render;
  };

  return (
    <ScrollToTop>
      <Helmet titleTemplate="%s - BoostML" defaultTitle="BoostML">
        <meta name="description" content="Goldbell CMS" />
      </Helmet>
      <Switch>{routeListRedenrer(availabelRoutes)}</Switch>{' '}
    </ScrollToTop>
  );
};

export default App;
