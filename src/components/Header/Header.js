import React from 'react';
import { Route, Link, Switch, useRouteMatch, NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Navigation from '../Navigation/Navigation';

function Header({loggedIn}) {

  const [isMenuOpen, setMenuOpen] = React.useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  const isMain = useRouteMatch({ path: '/', exact: true });

  return (
    <header className={`header ${isMain ? 'header_color' : ''}`}>
      <Link to="/">
        <img src={logo} alt="логотип" className="logo" />
      </Link>

      <Switch>
        <Route exact path="/">
          {loggedIn && <Navigation isMenuOpen={isMenuOpen}/>}
          <div className={` ${loggedIn ? 'header__auth-hiden' : 'header__auth-container' }`}>
            <Link className="header__reg-link link" to="/signup">
              Регистрация
            </Link>
            <Link className="header__auth-link" to="/signin">
              <button className="header__auth-button button" type="button">Войти</button>
            </Link>
          </div>
        </Route>
        <Route path={['/movies', '/saved-movies', '/profile']}>
          <Navigation isMenuOpen={isMenuOpen}/>
          <BurgerMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        </Route>
      </Switch>
    </header>
  );
}

export default Header;