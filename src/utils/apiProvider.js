import request from 'utils/request';
import { stringify } from 'qs';

const key = 'boostML';

export const fetchOneData = (payload, id) => {
  const query = stringify({
    id: id,
  });
  return request(payload.path + query);
};

export const fetchData = ({ path, params }, model) => {
  if (model === 'pixabay-favorite-images') {
    const myFavorites = localStorage.getItem(`${key}.favorites`);
    return {
      hits: JSON.parse(myFavorites),
    };
  } else {
    const requestURL = path;
    const { sort = null, filter = null, page, sizePerPage } = params;
    const query = stringify({
      ...sort,
      ...filter,
      page: page,
      per_page: sizePerPage,
    });
    return request(requestURL + query);
  }
};

export const addToFavorite = payload => {
  const favoriteKey = `${key}.${payload.path}`;
  const data = localStorage.getItem(favoriteKey);

  const addItem = {
    id: payload.data.id,
    previewURL: payload.data.previewURL,
  };
  if (data) {
    const postData = [...JSON.parse(data), addItem];
    localStorage.setItem(favoriteKey, JSON.stringify(postData));
  } else {
    localStorage.setItem(`${key}.${payload.path}`, JSON.stringify([addItem]));
  }

  return { ...addItem, isFavorite: true };
};

export const removeFromFavorite = payload => {
  const favoriteKey = `${key}.${payload.path}`;
  const data = localStorage.getItem(favoriteKey);
  if (data) {
    const postData = JSON.parse(data).filter(function(item) {
      return item.id !== payload.data;
    });
    localStorage.setItem(favoriteKey, JSON.stringify(postData));
  }
};

export const checkInFavorite = payload => {
  const favoriteKey = `${key}.${payload.path}`;
  const data = localStorage.getItem(favoriteKey);
  if (data) {
    const existed = JSON.parse(data).filter(item => item.id === +payload.data);

    return {
      id: payload.data,
      isFavorite: existed.length === 0 ? false : true,
    };
  }
  return {
    id: payload.data,
    isFavorite: false,
  };
};
