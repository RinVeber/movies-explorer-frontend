import arrow from "../../images/arrow.png";

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title text color_text">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__list-item portfolio__link_type_underline">
          <a
            className="portfolio__link link"
            href="https://rin_Veber.github.io/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text_medium">Статичный сайт</p>
            <img src={arrow} alt="ссылка" />
          </a>
        </li>
        <li className="portfolio__list-item portfolio__link_type_underline">
          <a
            className="portfolio__link link"
            href="https://rin_Veber.github.io/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text_medium">Адаптивный сайт</p>
            <img src={arrow} alt="ссылка" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link link"
            href="https://rin_Veber.github.io/mesto/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text_medium">Одностраничное приложение</p>
            <img src={arrow} alt="ссылка" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;