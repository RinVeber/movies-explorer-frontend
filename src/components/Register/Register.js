import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

const handleSubmit = (e) => {
    e.preventDefault();
  };

  function Register() {
    return (
      <section className="registr">
        <div className="registr__container">
          <div className="registr__title-wrap">
            <Link to="/">
              <img src={logo} alt="логотип" className="logo" />
            </Link>
            <h2 className="registr__title">Добро пожаловать!</h2>
          </div>
          <form onSubmit={handleSubmit} className="registr__form">
            <fieldset className="registr__form-container">
              <label className="registr__input-label" htmlFor="name">
                Имя
              </label>
              <input
                className="registr__input"
            
                value='Имя'
                id="email-input"
                placeholder=""
                type="text"
                name="name"
                minLength="2"
                maxLength="200"
                autoComplete="on"
                required
              />
              <span className="registr__input-error"></span>
            </fieldset>
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
                minLength="2"
                maxLength="200"
                autoComplete="on"
                required
              />
              <span className="registr__input-error registr__input_type_error"></span>
            </fieldset>
            <fieldset className="registr__form-container">
              <label className="registr__input-label" htmlFor="password">
                Пароль
              </label>
              <input
                className="auth__input"
                placeholder=""
                type="password"
                name="password"
                minLength="2"
                maxLength="200"
                autoComplete="on"
                required
              />
              <span className="registr__input-error">Что-то пошло не так...</span>
            </fieldset>
          </form>
          <button className="registr__btn btn" type="submit">
            Зарегистрироваться
          </button>
          <div className="registr__signin">
            <p className="registr__reg-question">Уже зарегистрированы?</p>
            <Link to="/signin" className="registr__login-link link">
              Войти
            </Link>
          </div>
        </div>
      </section>
    );
  }
  
  export default Register;