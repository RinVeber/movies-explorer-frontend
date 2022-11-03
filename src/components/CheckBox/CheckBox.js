import React from 'react';

function CheckBox({ handleChange, isShort, isDisabledForm }) {

  return (
    <div className="short-film">
      <input
        className="short-film__checkbox"
        id="filter-checkbox"
        name='isShort'
        type="checkbox"
        value={isShort || 'false'}
        checked={isShort ? 'checked' : ''}
        onChange={handleChange}
        disabled={isDisabledForm}
      />

      <label className="short-film__label" htmlFor="filter-checkbox">
        Короткометражки
      </label>
    </div>
  );
}

export default CheckBox;