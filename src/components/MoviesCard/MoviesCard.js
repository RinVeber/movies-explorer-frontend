import React from 'react';
import { useRouteMatch } from 'react-router-dom';

function MoviesCard({ isLiked, image, name }) {
  const isLikedMoviesRoute = useRouteMatch({ path: '/saved-movies', exact: false });
  return (
    <>
      <article className="movies-card">
        <div className="movies-card__image-container">
          <img
            className="movies-card__image"
            src={image}
            alt="Тут должны быть картинки, но что то пошло не так"
          />
        </div>
        <div className="movies-card__info-container">
            <div className="moives-card__info-text">
          <h2 className="movies-card__title">{name}</h2>
          <p className="movies-card__duration">1ч 47м</p>
          </div>
          <button
          className={`button movies-card__btn ${isLiked ? 'movies-card__btn_type_like' : ''} ${
            isLikedMoviesRoute ? 'movies-card__btn_type_close' : ''
          }`}
          type="button">
        </button>

        </div>
      </article>
    </>
  );
}
export default MoviesCard;