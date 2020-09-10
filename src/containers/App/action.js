import {
  FETCH_COLLECTION,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_ERROR,
  FETCH_ONE,
  FETCH_ONE_SUCCESS,
  FETCH_ONE_ERROR,
  ADD_TO_FAVORITE,
  ADD_TO_FAVORITE_SUCCESS,
  ADD_TO_FAVORITE_ERROR,
  CHECK_IN_FAVORITE,
  CHECK_IN_FAVORITE_SUCCESS,
  CHECK_IN_FAVORITE_ERROR,
  REMOVE_FROM_FAVORITE,
  REMOVE_FROM_FAVORITE_SUCCESS,
  REMOVE_FROM_FAVORITE_ERROR,
} from './types';

export const fetchCollection = (model, path, params) => {
  return {
    type: FETCH_COLLECTION,
    meta: {
      success: FETCH_COLLECTION_SUCCESS,
      failure: FETCH_COLLECTION_ERROR,
      params: params,
      model: model,
    },
    payload: {
      path: path,
      params: params,
    },
  };
};

export const fetchRecord = (model, id, path, params) => {
  return {
    type: FETCH_ONE,
    meta: {
      success: FETCH_ONE_SUCCESS,
      failure: FETCH_ONE_ERROR,
      model: model,
      id: id,
    },
    payload: {
      path: path,
      params: params,
    },
  };
};

export const addToFavorite = (model, path, data) => {
  return {
    type: ADD_TO_FAVORITE,
    meta: {
      success: ADD_TO_FAVORITE_SUCCESS,
      failure: ADD_TO_FAVORITE_ERROR,
      model: model,
    },
    payload: {
      path: path,
      data: data,
    },
  };
};

export const removeToFavorite = (model, path, data) => {
  return {
    type: REMOVE_FROM_FAVORITE,
    meta: {
      success: REMOVE_FROM_FAVORITE_SUCCESS,
      failure: REMOVE_FROM_FAVORITE_ERROR,
      model: model,
    },
    payload: {
      path: path,
      data: data,
    },
  };
};

export const checkInFavorite = (model, path, data) => {
  return {
    type: CHECK_IN_FAVORITE,
    meta: {
      success: CHECK_IN_FAVORITE_SUCCESS,
      failure: CHECK_IN_FAVORITE_ERROR,
      model: model,
    },
    payload: {
      path: path,
      data: data,
    },
  };
};
