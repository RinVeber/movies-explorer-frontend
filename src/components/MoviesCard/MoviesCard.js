import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { moviesApiUrl } from '../../utils/constants';
import { AppContext } from '../../context/AppContext';

function MoviesCard({ card, onSaveMovie, onDeleteMovie, onDeleteSavedMovie }) {
  const isLikeMoviesRoute = useRouteMatch({ path: '/saved-movies', exact: false });
  const isMoviesRoute = useRouteMatch({ path: '/movies', exact: false });
  const { savedMovies } = React.useContext(AppContext);

  const isSavedMovies = savedMovies.some((item) => item.movieId === card.id);

  const movieImage = isLikeMoviesRoute ? card.image : `${moviesApiUrl}${card.image.url}`;
  const movieTrailer = isLikeMoviesRoute ? card.trailer : card.trailerLink;

  function handleSaveMovie() {
    if (isSavedMovies) {
      onDeleteMovie(card);
    } else {
      onSaveMovie(card);
    }
  }

  function handleDeleteMovie() {
    onDeleteSavedMovie(card);
  }
  return (
    <>
      <article className="movies-card">
        <div className="movies-card__image-container">
          <a href={movieTrailer}
            rel="noreferrer">
            <img
              className="movies-card__image"
              src={movieImage}
              alt={card.nameRU}
            />
          </a>

        </div>
        <div className="movies-card__info-container">
          <div className="moives-card__info-text">
            <h2 className="movies-card__title">{`${card.nameRU}`}</h2>
            <p className="movies-card__duration">{`${card.duration} минут`}</p>
          </div>

          {isLikeMoviesRoute && (
            <button
              onClick={handleDeleteMovie}
              className="button movies-card__btn movies-card__btn_type_close"
              type="button"></button>
          )}
          {isMoviesRoute && (
            <button
              onClick={handleSaveMovie}
              className={`movies-card__btn button ${isSavedMovies ? 'movies-card__btn_type_like' : ''}`}
              type="button">
              {isSavedMovies}
            </button>
          )}
        </div>
      </article>
    </>
  );
}
export default MoviesCard;