import React from 'react';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies({
  setSavedMovies,
  onSearchMovie,
  onDeleteSavedMovie,
  onFilterShortMovies,
  setErrorMessageSavedMovies,
}) {
  React.useEffect(() => {
    return () => {
      setErrorMessageSavedMovies(null);
      const lastSavedMovies = JSON.parse(localStorage.getItem('lastSavedMovies'));
      setSavedMovies(lastSavedMovies);
    };
  }, []);
  return (
    <>
    <Header />
    
       {/* <Preloader /> */}
       <main className="content">
      <SearchForm onSearchMovie={onSearchMovie} onFilterShortMovies={onFilterShortMovies} />
      <MoviesCardList  onDeleteSavedMovie={onDeleteSavedMovie} />
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies;