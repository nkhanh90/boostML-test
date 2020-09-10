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
import { fetchCollection } from 'containers/App/action';
import { Loader } from 'components/Commons';
import * as yup from 'yup';
import { Search, ImageList } from 'components/BoostML';

const DashboardContainer = ({ collection, fetchCollection }) => {
  const sizePerPage = 20;
  const [page, setPage] = useState(1);
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [formState, setFormState] = useState({
    q: '',
  });

  useEffect(() => {
    fetchCollection('pixabay-images', '', {
      filter: formState,
      page,
      sizePerPage,
    });
  }, [fetchCollection, page, formState]);

  useEffect(() => {
    if (collection) {
      const { data } = collection;
      setLoading(collection.loading);
      if (collection.data) {
        setState(data);
      }
      if (collection.total) {
        setTotal(collection.total);
      }
    }
  }, [collection]);

  const handleOnClickPage = index => {
    setPage(index);
  };

  const validationSchema = yup.object().shape({
    q: yup.string().required('Please enter some string to search'),
  });

  const handleOnSubmit = values => {
    setFormState(values);
  };

  const render = (
    <div>
      <Link to="/favorite-images" className="btn btn-secondary">
        Favorite images
      </Link>
      <Search formState={formState} onSubmit={handleOnSubmit} validationSchema={validationSchema} />
      <ImageList
        data={state}
        total={total}
        sizePerPage={sizePerPage}
        handleOnClickPage={handleOnClickPage}
        page={page}
        setPage={setPage}
      />
    </div>
  );

  return (
    <div>
      <h1 className="text-center py-4">Images Library</h1>
      {loading ? <Loader /> : render}
    </div>
  );
};

const withReducer = injectReducer({ key: 'crud', reducer });
const withSaga = injectSaga({ key: 'crud', saga });

const mapStateToProps = createStructuredSelector({
  collection: makeSelectCollection('pixabay-images'),
});

const mapDispatchToProps = {
  fetchCollection,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRouter, withReducer, withSaga, withConnect)(DashboardContainer);
