import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import icon from '../../images/icon_acc.svg';

function Navigation({ isMenuOpen }) {
  const isMovies = useRouteMatch({ path: '/movies', exact: false });
  const isSavedMovies = useRouteMatch({ path: '/saved-movies', exact: false });

  return (
    <nav className={`navigation ${isMenuOpen ? 'navigation_opened' : ''}`}>
      <div className="navigation__container">
        <div className="navigation__flex-block"></div>
        <div className="navigation__films-container">
          <Link className="navigation__movies-link link navigation_type-link_burger" to="/">
            Главная
          </Link>
          <Link
            className={`navigation__movies-link link ${isMovies ? 'link_active' : ''}`}
            to="/movies">
            Фильмы
          </Link>
          <Link
            className={`navigation__saved-movies-link link ${isSavedMovies ? 'link_active' : ''}`}
            to="/saved-movies">
            Сохранённые фильмы
          </Link>
        </div>
        <Link className="navigation__profile-link" to="/profile">
          <button className="navigation__profile-btn button" type="button">Аккаунт</button>
          <div className="navigation__profile-icon-container"> 
          <img src={icon} alt="иконка" className="navigation__profile-icon" />
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;