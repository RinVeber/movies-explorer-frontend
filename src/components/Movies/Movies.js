import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies({
  onSearchMovie,
  onSaveMovie,
  onDeleteMovie,
  onFilterShortMovies,
  setErrorMessageMovies,
}) {
  React.useEffect(() => {
    return () => {
      setErrorMessageMovies(null);
    };
  }, [setErrorMessageMovies]);

  return (
    <>
      <Header />
      <main className="content">
        <SearchForm onSearchMovie={onSearchMovie}
          onFilterShortMovies={onFilterShortMovies} />
        <MoviesCardList onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;