import React from 'react';
import CheckBox from '../CheckBox/CheckBox';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { searchError } from '../../utils/constants';

function SearchForm({ onSearchMovie, onFilterShortMovies }) {
    const { values, handleChange, isValid, resetForm } = useFormWithValidation();
    const { name } = values;
    const [searchErrorMessage, setSearchErrorMessage] = React.useState(null);

    React.useEffect(() => {
        return () => {
            setSearchErrorMessage(null)
            resetForm();
        };
    }, []);

    function handleSubmit(evt) {
        evt.preventDefault();
        if (isValid && name !== '') {
            onSearchMovie({
                movieName: name,
            });

                

            setSearchErrorMessage(null);
        } else {
            setSearchErrorMessage(searchError);
        }

    }

    function checkShort() {
        const element = document.querySelector('input[type=checkbox]');
        const isChecked = element.checked;
        onFilterShortMovies(isChecked);
    }

    return (
        <section className="search-form">
            <form className="search-form__form" onSubmit={handleSubmit} name="search-form">
                <div className="search-form__input-wrap">
                    <input
                        className="search-form__input"
                        value={name || ''}
                        onChange={handleChange}
                        type="text"
                        placeholder="Фильм"
                        name="name"
                        minLength="1"
                        maxLength="100"
                        required
                    />
                    <button className="search-form__btn button" type="submit">
                        <p className="search-form__btn-text">Найти</p>
                    </button>
                </div>
                <span className="search-form__search-error">
                    {searchErrorMessage ? `${searchErrorMessage}` : ''}
                </span>
            </form>
            <div className="search-form__line"></div>
            <CheckBox onFilterShortMovies={onFilterShortMovies} />
        </section>
    );
}

export default SearchForm;