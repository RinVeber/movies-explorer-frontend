import React from 'react';
import Header from '../Header/Header';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { AppContext } from '../../context/AppContext';

function Profile({ onUpdateUser, onSignOut, setUpdateMessage, setUpdateErrorMessage }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormWithValidation();
  const [isButtonValid, setIsButtonValid] = React.useState(true);
  const currentUser = React.useContext(CurrentUserContext);
  const { name, email } = values;
  const { updateMessage, updateErrorMessage, isDisabledForm } = React.useContext(AppContext);

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    isValid &&
      onUpdateUser({ name, email }, () => {
        setValues({});
      });
  }

  React.useEffect(() => {
    if (isValid && (name !== currentUser.name || email !== currentUser.email)) {
      setIsButtonValid(true);
    } else {
      setIsButtonValid(false);
    }
  }, [values]);

  React.useEffect(() => {
    return () => {
      setUpdateMessage(null)
      setUpdateErrorMessage(null);
    };
  }, []);


console.log(email);
  
  return (
    <>
    <Header />
    <main className="content">
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit} name="profile-form">
          <fieldset className="profile__input-container">
            <label className="profile__input-label" htmlFor="name-user">
              Имя
            </label>
            <input
              className="profile__input"
              value={name || ''}
              onChange={handleChange}
              disabled={isDisabledForm}
              placeholder="Виталий"
              type="text"
              name="name"
              minLength="1"
              maxLength="100"
              required
            />
             <span className="profile__input-error">{errors.name}</span>
          </fieldset>
          <fieldset className="profile__input-container">
            <label className="profile__input-label" htmlFor="name-user">
              E-mail
            </label>
            <input
              className="profile__input"
   
              value={email || ''}
              onChange={handleChange}
              
              placeholder="E-mail"
              type="email"
              name="email"
              minLength="1"
              pattern= "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              disabled={isDisabledForm}
              maxLength="100"
              required
            />
              <span className="profile__input-error profile__input-error_type_email">
                {errors.email}
              </span>
              <span className={`profile__update-message ${updateErrorMessage ? 'profile__update-message_type_error' : ''}`}>
                {updateMessage ? `${updateMessage}` : '' || updateErrorMessage ? `Что пошло не так... ${updateErrorMessage}` : ''}
              </span>
          </fieldset>
          <button
              className={`profile__edit-btn button ${
                isButtonValid ? '' : 'profile__edit-btn_type_inactive'
              }`}
              type="submit">
              Редактировать
            </button>
        </form>

        <button className="profile__sign-out-btn button" type="button" onClick={onSignOut}>Выйти из аккаунта</button>
      </section>
    </main>
    </>
  );
  
}

export default Profile;