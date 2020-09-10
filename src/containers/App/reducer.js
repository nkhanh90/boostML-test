import {
  FETCH_COLLECTION,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_ERROR,
  FETCH_ONE,
  FETCH_ONE_SUCCESS,
  FETCH_ONE_ERROR,
  CHECK_IN_FAVORITE,
  CHECK_IN_FAVORITE_SUCCESS,
  CHECK_IN_FAVORITE_ERROR,
  ADD_TO_FAVORITE,
  ADD_TO_FAVORITE_ERROR,
  ADD_TO_FAVORITE_SUCCESS,
  REMOVE_FROM_FAVORITE,
  REMOVE_FROM_FAVORITE_SUCCESS,
  REMOVE_FROM_FAVORITE_ERROR,
} from './types';

const initialState = {};

const crudReducer = (state = initialState, action) => {
  const model = (action.meta && action.meta.model) || (action.payload && action.payload.model);
  switch (action.type) {
    case FETCH_COLLECTION:
    case ADD_TO_FAVORITE:
    case REMOVE_FROM_FAVORITE:
    case CHECK_IN_FAVORITE:
    case FETCH_ONE:
    case FETCH_COLLECTION_SUCCESS:
    case CHECK_IN_FAVORITE_SUCCESS:
    case ADD_TO_FAVORITE_SUCCESS:
    case REMOVE_FROM_FAVORITE_SUCCESS:
    case FETCH_ONE_SUCCESS:
      return Object.assign({}, state, {
        [model]: modelReducerImpl(state[model], action, {
          byIdReducerImpl,
        }),
      });

    default:
      return state;
  }
};

const modelReducerImpl = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COLLECTION:
    case FETCH_ONE:
    case CHECK_IN_FAVORITE:
      return Object.assign({}, state, {
        loading: true,
      });

    case FETCH_COLLECTION_ERROR:
    case FETCH_ONE_ERROR:
    case CHECK_IN_FAVORITE_ERROR:
    case REMOVE_FROM_FAVORITE_ERROR:
    case ADD_TO_FAVORITE_ERROR:
      return Object.assign({}, state, {
        error: true,
        loading: false,
      });

    case FETCH_ONE_SUCCESS:
      return Object.assign({}, state, {
        record: byIdReducerImpl(action),
        loading: false,
      });

    case CHECK_IN_FAVORITE_SUCCESS:
    case ADD_TO_FAVORITE_SUCCESS:
    case REMOVE_FROM_FAVORITE_SUCCESS:
      return Object.assign({}, state, {
        data: [byIdReducerImpl(action)],
        loading: false,
      });

    case FETCH_COLLECTION_SUCCESS:
      const { payload, total, ...rest } = byIdReducerImpl(action);
      return Object.assign({}, state, {
        data: payload,
        total: total,
        ...rest,
        actionStatus: {},
        loading: false,
      });

    default:
      return;
  }
};

const byIdReducerImpl = action => {
  switch (action.type) {
    case FETCH_COLLECTION_SUCCESS:
      const { payload } = action;
      const { hits, total, ...rest } = payload;
      return { payload: payload.hits, total: payload.total, ...rest };

    case FETCH_ONE_SUCCESS:
      return action.payload.hits[0];

    case CHECK_IN_FAVORITE_SUCCESS:
    case ADD_TO_FAVORITE_SUCCESS:
    case REMOVE_FROM_FAVORITE_SUCCESS:
      return action.payload;

    default:
      return {};
  }
};

export default crudReducer;
