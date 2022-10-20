import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import image1 from '../../images/movies-card-1.png';
import image2 from '../../images/movies-card-2.png';
import image3 from '../../images/movies-card-3.jpg';
import image4 from '../../images/movies-card-4.jpg';
import image5 from '../../images/movies-card-5.png';
import image6 from '../../images/movies-card-6.png';
import image7 from '../../images/movies-card-7.png';

function MoviesCardList() {
    return (
      <section className="movies-card-list">
        <div className="movies-card-list__container">
          <MoviesCard isLiked={true} name={'В погоне за Бенкси'} image={image1} />
          <MoviesCard isLiked={true} name={'Банксия'} image={image2} />
          <MoviesCard isLiked={false} name={'Джинкс'} image={image3} />
          <MoviesCard isLiked={false} name={'Сакура'} image={image4} />
          <MoviesCard isLiked={true} name={'Пи-Джей Харви: A dog called money'} image={image5} />
          <MoviesCard isLiked={false} name={'Gimme Danger: История Игги и The Stooge...'} image={image6} />
          <MoviesCard isLiked={true} name={'Киноторговцы'} image={image7} />

          </div>
      <div className="more-movies-card">
        <button className="more-movies-card__btn button" type="button">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;