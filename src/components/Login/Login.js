import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { AppContext } from '../../context/AppContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Login({ handleLogin, setAuthErrorMessage }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const { authErrorMessage, isDisabledForm } = React.useContext(AppContext);
  const { email, password } = values;

  React.useEffect(() => {
    return () => {
      setAuthErrorMessage(null);
    };
  }, [setAuthErrorMessage]);

  const handleSubmit = (e) => {

    e.preventDefault();
    if (!email || !password) {
      return;
    }
    isValid && handleLogin({ email, password });
    resetForm();
  };

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
              value={email || ''}
              onChange={handleChange}
              disabled={isDisabledForm}
              placeholder=""
              type="email"
              name="email"
              autoComplete="on"
              pattern= "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
            />
            <span className="registr__input-error registr__input_type_error">{errors.name}</span>
          </fieldset>
          <fieldset className="registr__form-container registr__form-container_type_login">
            <label className="registr__input-label" htmlFor="password">
              Пароль
            </label>
            <input
              className="registr__input"
              placeholder=""
              value={password || ''}
              onChange={handleChange}
              disabled={isDisabledForm}
              type="password"
              name="password"
              minLength="8"
              autoComplete="on"  
              required
            />
            <span className="registr__input-error"></span>
            <span className="register__auth-error">
              {authErrorMessage  ? `Что пошло не так... ${authErrorMessage}` : ''}
            </span>
          </fieldset>
          <button className="registr__btn button" type="submit">
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