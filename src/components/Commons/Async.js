import React from 'react';
import loadable from '@loadable/component';
import Loader from './Loader';

const Async = loadable(props => import(/* webpackPrefetch: true */ `containers/${props.page}`), {
  fallback: <Loader />,
});

export default Async;
