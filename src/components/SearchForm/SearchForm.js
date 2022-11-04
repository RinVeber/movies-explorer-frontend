import React from 'react';
import CheckBox from '../CheckBox/CheckBox';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { searchError } from '../../utils/constants';
import { AppContext } from '../../context/AppContext';
import { useLocation } from 'react-router-dom'


function SearchForm({ onSearchMovie }) {
    const { values, setValues, handleChange, isValid, resetForm, setIsValid } = useFormWithValidation();
    var { name, isShort } = values;
    const [searchErrorMessage, setSearchErrorMessage] = React.useState(null);
    const { isDisabledForm } = React.useContext(AppContext);
    const location = useLocation();
    const locationMovies = location.pathname === '/movies';

    React.useEffect(() => {
        return () => {
            setSearchErrorMessage(null);
            resetForm();
        };
    }, []);

    React.useEffect(() => {
        if (
            (localStorage.getItem('query') || localStorage.getItem('checkbox'))
            && (locationMovies)
        ) {
            resetForm();
            const inputSearch = localStorage.getItem('query')
            const inputCheckbox = localStorage.getItem('checkbox');
            setValues({ ...values, "name": inputSearch, "isShort": inputCheckbox == "true" });
            setIsValid(true);
            handleSubmit();
            onSearchMovie({
                movieName: inputSearch,
                isShort: inputCheckbox,
            });
            setSearchErrorMessage(null);
        }
    }, [])

    React.useEffect(() => {

        if (name) {
            handleSubmit();
        }

    }, [isShort]);

    function handleSubmit(evt) {

        evt && evt.preventDefault();

        if (isValid && name !== '') {

            onSearchMovie({
                movieName: name,
                isShort: isShort,
            });

            setSearchErrorMessage(null);
        } else {
            setSearchErrorMessage(searchError);
        }
    }

    return (
        <section className="search-form">
            <form id='form' className="search-form__form" onSubmit={handleSubmit} name="search-form">
                <div className="search-form__input-wrap">
                    <input
                        className="search-form__input"
                        value={name || ''}
                        onChange={handleChange}
                        disabled={isDisabledForm}
                        type="text"
                        placeholder="Фильм"
                        name="name"
                        minLength="1"
                        maxLength="100"
                    />
                    <button className="search-form__btn button" type="submit">
                        <p className="search-form__btn-text">Найти</p>
                    </button>
                </div>
                <span className="search-form__search-error">
                    {searchErrorMessage ? `${searchErrorMessage}` : ''}
                </span>
                <div className="search-form__line"></div>
                <CheckBox isShort={isShort} handleChange={handleChange} disabled={isDisabledForm} />
            </form>

        </section>
    );
}

export default SearchForm;