import React from 'react';

function CheckBox() {
  return (
    <div className="short-film">
      <input className="short-film__checkbox" id="filter-checkbox" type="checkbox" />
      <label className="short-film__label" htmlFor="filter-checkbox">
        Короткометражки
      </label>
    </div>
  );
}

export default CheckBox;