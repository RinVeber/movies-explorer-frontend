import React from 'react';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import image1 from '../../images/movies-card-1.png';
import image2 from '../../images/movies-card-2.png';
import image3 from '../../images/movies-card-3.jpg';

function SavedMovies() {
  return (
    <section className="movies-card-list">
      <SearchForm />
      {/* <Preloader /> */}
      <div className="movies-card-list__container">
        <MoviesCard isSaved={true} image={image1} />
        <MoviesCard isSaved={true} image={image2} />
        <MoviesCard isSaved={false} image={image3} />
      </div>
      <div className="more-movies-card"></div>
    </section>
  );
}

export default SavedMovies;