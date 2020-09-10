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
import { fetchRecord, addToFavorite, checkInFavorite, removeToFavorite } from 'containers/App/action';
import { Loader } from 'components/Commons';
import { Button } from 'reactstrap';

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
    <div className="text-center">
      <div>
        <img src={state.webformatURL} alt="web" />
      </div>
      <div className="mt-4">
        <h3>ID: {state.id}</h3>
        <h3>Views: {state.views}</h3>
        <h3>Likes: {state.likes}</h3>
        <h3>Downloads: {state.downloads}</h3>
      </div>
      {!isFavorite ? (
        <Button color="primary" className="mt-2" onClick={() => setFavorite(state)}>
          Add to favorites
        </Button>
      ) : (
        <Button color="danger" className="mt-2" onClick={() => removeFavorite(state.id)}>
          Remove to favorites
        </Button>
      )}
    </div>
  );

  return (
    <div>
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
