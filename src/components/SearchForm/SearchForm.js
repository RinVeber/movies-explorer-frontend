import React from 'react';
import CheckBox from '../CheckBox/CheckBox';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { searchError } from '../../utils/constants';
import { AppContext } from '../../context/AppContext';

function SearchForm({ onSearchMovie }) {
    const { values, handleChange, isValid, resetForm } = useFormWithValidation();
    const { name, isShort } = values;
    const [searchErrorMessage, setSearchErrorMessage] = React.useState(null);
    const { isDisabledForm } = React.useContext(AppContext);

    React.useEffect(() => {
        return () => {
            setSearchErrorMessage(null)
            resetForm();
        };
    }, []);

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
            <form className="search-form__form" onSubmit={handleSubmit} name="search-form">
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
                        required
                    />
                    <button className="search-form__btn button" type="submit">
                        <p className="search-form__btn-text">Найти</p>
                    </button>
                </div>
                <span className="search-form__search-error">
                    {searchErrorMessage ? `${searchErrorMessage}` : ''}
                </span>
                <div className="search-form__line"></div>
                <CheckBox isShort={isShort} handleChange={handleChange} disabled={isDisabledForm}/>
            </form>

        </section>
    );
}

export default SearchForm;