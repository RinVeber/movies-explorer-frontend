import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function PageNotFound() {
  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <Link className="not-found__link link" onClick={useHistory().goBack}>
        Назад
      </Link>
    </section>
  );
}

export default PageNotFound;