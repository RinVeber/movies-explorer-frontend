import React from 'react';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import image1 from '../../images/movies-card-1.png';
import image2 from '../../images/movies-card-2.png';
import image3 from '../../images/movies-card-3.jpg';
import image5 from '../../images/movies-card-5.png';
import image6 from '../../images/movies-card-6.png';
import image7 from '../../images/movies-card-7.png';

function SavedMovies() {
  return (
    <section className="movies-card-list">
      <SearchForm />
       {/* <Preloader /> */}
      <div className="movies-card-list__container">
      <MoviesCard isLiked={true} name={'В погоне за Бенкси'} image={image1} />
          <MoviesCard isLiked={true} name={'Банксия'} image={image2} />
          <MoviesCard isLiked={false} name={'Джинкс'} image={image3} />
          <MoviesCard isLiked={true} name={'Пи-Джей Харви: A dog called money'} image={image5} />
          <MoviesCard isLiked={false} name={'Gimme Danger: История Игги и The Stooge...'} image={image6} />
          <MoviesCard isLiked={true} name={'Киноторговцы'} image={image7} />

      </div>
      <div className="more-movies-card"></div>
    </section>
  );
}

export default SavedMovies;