/*
 * Apptypes
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * types here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

const CRUD = `boostML`;

export const FETCH_COLLECTION = `${CRUD}/FETCH_COLLECTION`;
export const FETCH_COLLECTION_SUCCESS = `${CRUD}/FETCH_COLLECTION_SUCCESS`;
export const FETCH_COLLECTION_ERROR = `${CRUD}/FETCH_COLLECTION_ERROR`;

export const FETCH_ONE = `${CRUD}/FETCH_ONE`;
export const FETCH_ONE_SUCCESS = `${CRUD}/FETCH_ONE_SUCCESS`;
export const FETCH_ONE_ERROR = `${CRUD}/FETCH_ONE_ERROR`;

export const ADD_TO_FAVORITE = `${CRUD}/ADD_TO_FAVORITE`;
export const ADD_TO_FAVORITE_SUCCESS = `${CRUD}/ADD_TO_FAVORITE_SUCCESS`;
export const ADD_TO_FAVORITE_ERROR = `${CRUD}/ADD_TO_FAVORITE_ERROR`;

export const REMOVE_FROM_FAVORITE = `${CRUD}/REMOVE_FROM_FAVORITE`;
export const REMOVE_FROM_FAVORITE_SUCCESS = `${CRUD}/REMOVE_FROM_FAVORITE_SUCCESS`;
export const REMOVE_FROM_FAVORITE_ERROR = `${CRUD}/REMOVE_FROM_FAVORITE_ERROR`;

export const CHECK_IN_FAVORITE = `${CRUD}/CHECK_IN_FAVORITE`;
export const CHECK_IN_FAVORITE_SUCCESS = `${CRUD}/CHECK_IN_FAVORITE_SUCCESS`;
export const CHECK_IN_FAVORITE_ERROR = `${CRUD}/CHECK_IN_FAVORITE_ERROR`;
