import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import image1 from '../../images/movies-card-1.png';
import image2 from '../../images/movies-card-2.png';
import image3 from '../../images/movies-card-3.jpg';
import image4 from '../../images/movies-card-4.jpg';

function MoviesCardList() {
    return (
      <section className="movies-card-list">
        <div className="movies-card-list__container">
          <MoviesCard isLiked={true} image={image1} />
          <MoviesCard isLiked={true} image={image2} />
          <MoviesCard isLiked={false} image={image3} />
          <MoviesCard isLiked={false} image={image4} />

          </div>
      <div className="more-movies-card">
        <button className="more-movies-card__btn button" type="button">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;