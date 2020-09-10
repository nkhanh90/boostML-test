/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

export const selectGlobal = state => state.global;

export const selectRouter = state => state.router;

export const selectApp = state => state.app;

const selectCrud = state => (state && state['crud']) || false;

export const makeSelectCollection = model => createSelector(selectCrud, state => (state[model] ? state[model] : {}));

export const makeSelectRecord = model => createSelector(selectCrud, state => (state[model] ? state[model].record : {}));
