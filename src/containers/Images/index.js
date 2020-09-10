import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeSelectCollection } from 'containers/App/selectors';

import saga from 'containers/App/saga';
import reducer from 'containers/App/reducer';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { fetchRecord, addToFavorite, checkInFavorite, removeToFavorite } from 'containers/App/action';
import { Loader } from 'components/Commons';
import ImageItem from 'components/BoostML/ImageItem';

const ImageContainer = ({
  match,
  fetchRecord,
  record,
  addToFavorite,
  checkInFavorite,
  inFavorite,
  removeToFavorite,
}) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      fetchRecord('pixabay-single-image', match.params.id, '');
      checkInFavorite('boostML.favorite', 'favorites', match.params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.id]);

  useEffect(() => {
    if (inFavorite && inFavorite.data) {
      const existed = inFavorite.data.filter(item => +item.id === +match.params.id)[0];
      setIsFavorite(existed ? existed.isFavorite : false);
    }
  }, [inFavorite, match.params.id]);

  useEffect(() => {
    if (record) {
      setLoading(record.loading);
      if (record.record) setState(record.record);
    }
  }, [record]);

  const setFavorite = data => {
    addToFavorite('boostML.favorite', 'favorites', data);
  };

  const removeFavorite = id => {
    removeToFavorite('boostML.favorite', 'favorites', id);
  };

  const render = (
    <ImageItem state={state} setFavorite={setFavorite} isFavorite={isFavorite} removeFavorite={removeFavorite} />
  );

  return (
    <div>
      <Link to="/" className="py-2 text-secondary d-block">
        Back to Dashboard
      </Link>
      <h1 className="text-center py-4">Image Detail</h1>
      {loading ? <Loader /> : render}
    </div>
  );
};

const withReducer = injectReducer({ key: 'crud', reducer });
const withSaga = injectSaga({ key: 'crud', saga });

const mapStateToProps = createStructuredSelector({
  record: makeSelectCollection('pixabay-single-image'),
  inFavorite: makeSelectCollection('boostML.favorite'),
});

const mapDispatchToProps = {
  fetchRecord,
  addToFavorite,
  checkInFavorite,
  removeToFavorite,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withReducer, withSaga, withConnect)(ImageContainer);
