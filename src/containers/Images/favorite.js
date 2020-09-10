import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeSelectCollection } from 'containers/App/selectors';

import saga from 'containers/App/saga';
import reducer from 'containers/App/reducer';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { fetchCollection } from 'containers/App/action';
import { Loader } from 'components/Commons';
import { ImageList } from 'components/BoostML';

const FavoriteImages = ({ collection, fetchCollection }) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCollection('pixabay-favorite-images', '', {});
  }, [fetchCollection]);

  useEffect(() => {
    if (collection) {
      const { data } = collection;
      setLoading(collection.loading);
      if (collection.data) {
        setState(data);
      }
    }
  }, [collection]);

  const render = <ImageList data={state} />;

  return (
    <div>
      <h1 className="text-center py-4">Favorite Images</h1>
      {loading ? <Loader /> : render}
    </div>
  );
};

const withReducer = injectReducer({ key: 'crud', reducer });
const withSaga = injectSaga({ key: 'crud', saga });

const mapStateToProps = createStructuredSelector({
  collection: makeSelectCollection('pixabay-favorite-images'),
});

const mapDispatchToProps = {
  fetchCollection,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withReducer, withSaga, withConnect)(FavoriteImages);
