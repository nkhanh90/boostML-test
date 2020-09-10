import React from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const ImageItem = ({ state, setFavorite, isFavorite, removeFavorite }) => (
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

export default withRouter(ImageItem);
