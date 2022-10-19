import foto from "../../images/profile.jpg";

function AboutMe() {
  return (
    <section className="about">
          <div className="section-title-container">
          <h2 className="section-title">Студент</h2>
        <div className="line-title"></div>
      </div>

      <div className="about__info">
        <div className="about__info-description">
          <h3 className="about__info-title text_title">Кирилл</h3>
          <p className="about__info-subtitle">Студент, 24 года</p>
          <p className="about__info-description text">
          Живу в Саратове, закончил механико-математический факультет университета СГУ. Увлекаться программированием начал на 3 курсе учебы. Год назад устроился на курсы фронтенда на Яндекс.Пракутикуме. Хочу найти постоянную работу в IT.
          </p>
          <ul className="about__links text">
            <li>
              <a href="https://github.com/rinveber" className="link" target="_blank" rel="noreferrer">
                Github
              </a>
            </li>
          </ul>
        </div>
        <img className="about__info-image" src={foto} alt="Фотография студента" />
      </div>
    </section>
  );
};

export default AboutMe;