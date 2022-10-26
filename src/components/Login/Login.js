import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

const handleSubmit = (e) => {
  e.preventDefault();
};

function Login() {
  return (
    <section className="registr">
      <div className="registr__container">
        <div className="registr__title-wrap">
          <Link to="/">
            <img src={logo} alt="логотип" className="logo" />
          </Link>
          <h2 className="registr__title">Рады видеть!</h2>
        </div>
        <form onSubmit={handleSubmit} className="registr__form">
          <fieldset className="registr__form-container">
            <label className="registr__input-label" htmlFor="email">
              E-mail
            </label>
            <input
              className="registr__input"
              value='pochta@yandex.ru'
              placeholder=""
              type="email"
              name="email"
              autoComplete="on"
              required
            />
            <span className="registr__input-error registr__input_type_error"></span>
          </fieldset>
          <fieldset className="registr__form-container registr__form-container_type_login">
            <label className="registr__input-label" htmlFor="password">
              Пароль
            </label>
            <input
              className="registr__input"
              placeholder=""
              type="password"
              name="password"
              minLength="8"
              autoComplete="on"  
              required
            />
            <span className="registr__input-error"></span>
          </fieldset>
          <button className="registr__btn btn" type="submit">
          Войти
        </button>
        </form>
        <div className="registr__signin">
          <p className="registr__reg-question">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="registr__login-link link">
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;