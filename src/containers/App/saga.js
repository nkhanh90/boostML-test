/**
 * API saga
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_COLLECTION, FETCH_ONE, ADD_TO_FAVORITE, CHECK_IN_FAVORITE, REMOVE_FROM_FAVORITE } from './types';
import { fetchData, fetchOneData, addToFavorite, checkInFavorite, removeFromFavorite } from 'utils/apiProvider';

export function* fetch(action) {
  const { success, failure, model } = action.meta;
  try {
    const resp = yield call(fetchData, action.payload, model);
    yield put({ meta: action.meta, type: success, payload: resp });
  } catch (error) {
    yield put({ meta: action.meta, type: failure, payload: error, error: true });
  }
}

export function* fetchOne(action) {
  const { success, failure } = action.meta;
  try {
    const resp = yield call(fetchOneData, action.payload, action.meta.id);
    yield put({ meta: action.meta, type: success, payload: resp });
  } catch (error) {
    yield put({ meta: action.meta, type: failure, payload: error, error: true });
  }
}

export function* addRecordToFavorite(action) {
  const { success, failure } = action.meta;
  try {
    const resp = yield call(addToFavorite, action.payload);
    yield put({ meta: action.meta, type: success, payload: resp });
  } catch (error) {
    yield put({ meta: action.meta, type: failure, payload: error, error: true });
  }
}

export function* removeFromMyFavorite(action) {
  const { success, failure } = action.meta;
  try {
    yield call(removeFromFavorite, action.payload);
    yield put({ meta: action.meta, type: success, payload: { [action.payload.data]: false } });
  } catch (error) {
    yield put({ meta: action.meta, type: failure, payload: error, error: true });
  }
}

export function* checkIfImageInFavorite(action) {
  const { success, failure } = action.meta;
  try {
    const resp = yield call(checkInFavorite, action.payload);
    yield put({ meta: action.meta, type: success, payload: resp });
  } catch (error) {
    yield put({ meta: action.meta, type: failure, payload: error, error: true });
  }
}

export default function* main() {
  yield takeEvery(FETCH_COLLECTION, fetch);
  yield takeEvery(FETCH_ONE, fetchOne);
  yield takeEvery(REMOVE_FROM_FAVORITE, removeFromMyFavorite);
  yield takeEvery(ADD_TO_FAVORITE, addRecordToFavorite);
  yield takeEvery(CHECK_IN_FAVORITE, checkIfImageInFavorite);
}
