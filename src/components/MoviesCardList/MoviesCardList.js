import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import useWindowSize from '../../hooks/useWindowSize';
import { AppContext } from '../../context/AppContext';
import { more, moviesCardShow, moviesPlanshetCardShow, moviesMobileCardShow, moreMoviesCardShow,
   moreMoviesPlanshetCardShow, moreMoviesMobileCardShow, bigShow, minShow } from '../../utils/constants';

function MoviesCardList({ onSaveMovie, onDeleteMovie, onDeleteSavedMovie }) {
  const isSavedMoviesRoute  = useRouteMatch({ path: '/saved-movies', exact: false });
  const isMoviesRoute = useRouteMatch({ path: '/movies', exact: false });
  const { moviesCards, isCardsLoading, errorMessageSavedMovies, savedMovies } = React.useContext(AppContext);
  const width = useWindowSize();

  const [cards, setCards] = React.useState(0);
  const [moreCards, setMoreCards] = React.useState(0);

  React.useEffect(() => {
    function getCards() {
      if (width > bigShow) {
        setCards(moviesCardShow);
        setMoreCards(moreMoviesCardShow);
      } else if (width <= bigShow && width > minShow) {
        setCards(moviesPlanshetCardShow);
        setMoreCards(moreMoviesPlanshetCardShow);
      } else if (width <= minShow) {
        setCards(moviesMobileCardShow);
        setMoreCards(moreMoviesMobileCardShow);
      }
    }
    getCards();
  }, [width]);

  function getMoreCards() {
    setCards(cards + moreCards);

    
  }
  return (
    <section className="movies-card-list">
      {isSavedMoviesRoute  && (
        <>
          <div className="movies-card-list__loader-container">
            {(savedMovies.length == 0) && (
              <p className="movies-card-list__error-message">{errorMessageSavedMovies}</p>
            )}
            {isCardsLoading && <Preloader />}
          </div>
          <div className="movies-card-list__container">
            {savedMovies.map((card) => (
              <MoviesCard
                key={card._id}
                card={card}
                onSaveMovie={onSaveMovie}
                onDeleteSavedMovie={onDeleteSavedMovie}
              />
            ))}
          </div>
        </>
      )}
      {isMoviesRoute && (
        <>
          <div className="movies-card-list__loader-container">
          {(moviesCards.length == 0) && (
              <p className="movies-card-list__error-message">{errorMessageSavedMovies}</p>
            )}
            {isCardsLoading && <Preloader />}
          </div>
          <div className="movies-card-list__container">
            
            {moviesCards.slice(0, cards).map((card) => (
              <MoviesCard
                key={card.id}
                card={card}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                
              />
             
            ))}
          
          </div>
          <div
            className={`more-movies-card ${
              moviesCards.length >= cards ? 'more-movies-card_type_active' : ''
            }`}>

            {(moviesCards[0] && (moviesCards.length - 1) >= cards) && <button className="more-movies-card__btn button" type="button" onClick={getMoreCards}>
              {more}
            </button>}


          </div>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;