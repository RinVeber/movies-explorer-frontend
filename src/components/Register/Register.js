import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { AppContext } from '../../context/AppContext';

function Register({ handleRegister, setAuthErrorMessage }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const { name, email, password } = values;
  const { authErrorMessage, isDisabledForm } = React.useContext(AppContext);

  

  React.useEffect(() => {
    return () => {
      setAuthErrorMessage(null);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    isValid && handleRegister({ name, email, password });
    resetForm();
  };
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
                value={name || ''}
                onChange={handleChange}
                disabled={isDisabledForm}
                id="email-input"
                placeholder="Имя"
                type="text"
                name="name"
                minLength="2"
                maxLength="200"
                autoComplete="on"
                required
              />
               <span className="registr__input-error">{errors.name}</span>
            </fieldset>
            <fieldset className="registr__form-container">
              <label className="registr__input-label" htmlFor="email">
                E-mail
              </label>
              <input
                className="registr__input"
                value={email || ''} 
                onChange={handleChange}
                disabled={isDisabledForm}
                placeholder="Почта"
                type="email"
                name="email"
                minLength="2"
                maxLength="200"
                autoComplete="on"
                required
              />
              <span className="registr__input-error registr__input_type_error">{errors.email}</span>
            </fieldset>
            <fieldset className="registr__form-container">
              <label className="registr__input-label" htmlFor="password">
                Пароль
              </label>
              <input
                className="auth__input"
                value={password || ''}
                onChange={handleChange}
                disabled={isDisabledForm}
                placeholder="Пароль"
                type="password"
                name="password"
                minLength="2"
                maxLength="200"
                autoComplete="on"
                required
              />
              <span className="registr__input-error">{errors.password}</span>
              <span className="registr__auth-error">
              {authErrorMessage ? `Что-то пошло не так... ${authErrorMessage}` : ''}
            </span>
            </fieldset>
            <button className="registr__btn button" type="submit">
            Зарегистрироваться
          </button>
          </form>
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