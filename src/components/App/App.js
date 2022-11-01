import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';
import { moviesApi } from '../../utils/MoviesApi';
import { notFoundError, serverError, shortMovie, successUpdateMessage } from '../../utils/constants';
import * as mainApi from '../../utils/MainApi';
import * as auth from '../../utils/Auth';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [moviesCards, setMoviesCards] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isCardsLoading, setIsCardsLoading] = React.useState(false);

  const [errorMessageMovies, setErrorMessageMovies] = React.useState(null);
  const [errorMessageSavedMovies, setErrorMessageSavedMovies] = React.useState(null);
  const [authErrorMessage, setAuthErrorMessage] = React.useState(null);
  const [updateMessage, setUpdateMessage] = React.useState(null);
  const [updateErrorMessage, setUpdateErrorMessage] = React.useState(null);
  const [isDisabledForm, setIsDisabledForm] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {


    if (loggedIn) {
      if (localStorage.getItem('lastSearchMovies')) {
        return;
      }

      setIsCardsLoading(true);
      moviesApi
        .getInicialMoviesCards()
        .then((movies) => {
          localStorage.setItem('lastSearchMovies', JSON.stringify(movies));
        })
        .catch((error) => {
          setErrorMessageMovies(serverError);
          console.log(error);
        })
        .finally(() => setIsCardsLoading(false));
    }
  }, [loggedIn]);

  function commonHandleSearchMovie(isSaved, movie) {
    setErrorMessageSavedMovies(null);
    setIsCardsLoading(true);

    const lastMovies = JSON.parse(localStorage.getItem(isSaved ? 'lastSavedMovies' : 'lastSearchMovies'));
    let filterMovies = lastMovies.filter((item) => {
      const nameEN = item.nameEN ? item.nameEN : item.nameRU;
      const movieNameEN = nameEN.toLowerCase();
      const movieNameRU = item.nameRU?.toLowerCase();
      const searchMovieName = movie.movieName?.toLowerCase();
      const filterMovies =
        movieNameRU.includes(searchMovieName) ||
        movieNameEN.includes(searchMovieName);
      return filterMovies;
    });

    if (movie.isShort) {
      filterMovies = filterMovies.filter((item) => item.duration <= shortMovie);
    } 

    if (filterMovies[0]) {
      isSaved 
        ? setSavedMovies(filterMovies)
        : setMoviesCards(filterMovies);
    } else {
      setErrorMessageSavedMovies(notFoundError);
      isSaved 
        ? setSavedMovies([])
        : setMoviesCards([]);
    }

    setIsCardsLoading(false);
  }

  function handleSearchSavedMovie(movie) {
    commonHandleSearchMovie(true, movie)
  }

  function handleSearchMovie(movie) {
    commonHandleSearchMovie(false, movie)
  }

  function handleFilterShortMovies(isChecked) {

    if(isChecked){
      if (moviesCards[0]) {
        const shortMoviesCards = moviesCards.filter((item) => item.duration <= shortMovie);
        setMoviesCards(shortMoviesCards);
      }
      if (!isChecked && moviesCards[0]) {
        const lastSearchMovies = JSON.parse(localStorage.getItem('lastSearchMovies'));
        setMoviesCards(lastSearchMovies);
      }
      if (!moviesCards[0]) {
        setErrorMessageMovies(notFoundError);
      }
    }

    
  }

  function handleFilterShortSavedMovies(isChecked) {
    if (isChecked) {
      const shortMoviesCards = savedMovies.filter((item) => item.duration <= shortMovie);
      setSavedMovies(shortMoviesCards);
    } else {
      const lastSavedMovies = JSON.parse(localStorage.getItem('lastSavedMovies'));
      setSavedMovies(lastSavedMovies);
    }
  }

  function handleMovieForDelete(data) {
    const movieForDelete = savedMovies.filter((item) => item.movieId === data.id);
    handleDeleteMovie(movieForDelete[0]);
  }

  function handleDeleteMovie(movieForDelete) {
    mainApi
      .removeMovie(movieForDelete._id)
      .then(() => {
        const lastSavedMovies = JSON.parse(localStorage.getItem('lastSavedMovies'));
        const newSavedMovies = lastSavedMovies.filter(
          (item) => item.movieId !== movieForDelete.movieId,
        );
        setSavedMovies(newSavedMovies);
        localStorage.setItem('lastSavedMovies', JSON.stringify(newSavedMovies));
      })
      .catch((error) => {
        setErrorMessageMovies(`Не удалось удалить фильм: ${error}`);
        console.log(error);
      });
  }

  React.useEffect(() => {
    checkToken();
    if (loggedIn) {
      history.push('/movies');
      Promise.all([mainApi.getUser(), mainApi.getMovies()])
        .then(([user, data]) => {
          setCurrentUser(user);
          setSavedMovies(data);
          localStorage.setItem('lastSavedMovies', JSON.stringify(data));
        })
        .catch((error) => {
          handleLogout();
          console.log(error);
        });
    }
  }, [loggedIn]);

  function handleCreateMovie(movie) {
    mainApi
      .createMovie(movie)
      .then((data) => {
        const newSavedMovies = [data, ...savedMovies];
        setSavedMovies(newSavedMovies);
        localStorage.setItem('lastSavedMovies', JSON.stringify(newSavedMovies));
      })
      .catch((error) => {
        setErrorMessageMovies(`Не удалось сохранить фильм: ${error}`);
        console.log(error);
      });
  }

  function handleUpdateUser(data) {
    setIsDisabledForm(true);
    mainApi
      .updateUser(data)
      .then((data) => {
        setCurrentUser(data);
        setUpdateMessage(successUpdateMessage);
      })
      .catch((error) => {
        setUpdateErrorMessage(error);
        console.log(error);
      })
      .finally(() => setIsDisabledForm(false));
  }

  function handleRegister({ name, email, password }) {
    setIsDisabledForm(true);
    auth
      .register(name, email, password)
      .then((user) => {
        handleLogin({ email, password });
      })
      .catch((error) => {
        setAuthErrorMessage(error);
        console.log(error);
      })
      .finally(() => setIsDisabledForm(false));
  }

  function handleLogin({ email, password }) {
    setIsDisabledForm(true);
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        checkToken();
      })
      .catch((error) => {
        setAuthErrorMessage(error);
        console.log(error);
      })
      .finally(() => setIsDisabledForm(false));
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setLoggedIn(true);
    }
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('lastSearchMovies');
    localStorage.removeItem('lastSavedMovies');
    setMoviesCards([]);
    setSavedMovies([]);
    setCurrentUser({});
    history.push('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider
        value={{
          moviesCards: moviesCards,
          savedMovies: savedMovies,
          isCardsLoading: isCardsLoading,
          errorMessageMovies: errorMessageMovies,
          errorMessageSavedMovies: errorMessageSavedMovies,
          authErrorMessage: authErrorMessage,
          updateMessage: updateMessage,
          updateErrorMessage: updateErrorMessage,
          isDisabledForm: isDisabledForm,
        }}>
        <div className="body">
          <div className="page">
            <Switch>
              <Route exact path="/" loggedIn={loggedIn}>

                <Main />
                <Footer />
              </Route>
              <ProtectedRoute
                path="/movies"
                component={Movies}
                loggedIn={loggedIn}
                onFilterShortMovies={handleFilterShortMovies}
                onSearchMovie={handleSearchMovie}
                onSaveMovie={handleCreateMovie}
                onDeleteMovie={handleMovieForDelete}
                setErrorMessageMovies={setErrorMessageMovies}></ProtectedRoute>
              <ProtectedRoute
                path="/saved-movies"
                component={SavedMovies}
                loggedIn={loggedIn}
                setSavedMovies={setSavedMovies}
                onSearchMovie={handleSearchSavedMovie}
                onDeleteSavedMovie={handleDeleteMovie}
                onFilterShortMovies={handleFilterShortSavedMovies}
                setErrorMessageSavedMovies={setErrorMessageSavedMovies}></ProtectedRoute>
              <ProtectedRoute
                path="/profile"
                component={Profile}
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
                onSignOut={handleLogout}
                setUpdateMessage={setUpdateMessage}
                setUpdateErrorMessage={setUpdateErrorMessage}></ProtectedRoute>
              <Route path="/signin">
                <Login handleLogin={handleLogin} setAuthErrorMessage={setAuthErrorMessage} />
                {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
              </Route>
              <Route path="/signup">
                <Register
                  handleRegister={handleRegister}
                  setAuthErrorMessage={setAuthErrorMessage}
                />
              </Route>
              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}
export default App;