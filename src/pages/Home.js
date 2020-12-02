import React from 'react';
import HomeComponent from '../components/HomeComponent';
import './Home.css';
import freelance from '../assets/images/Description.jpg';

const Home = () => {
  return (
    <>
      <div className="home">
        <HomeComponent />
        <div className="home__description row">
          <div className="description__text col-lg-6 ">
            <h1>Qui sommes-nous ?</h1>
            <p className="mt-4">
              <strong>Handelp</strong> est votre site web partenaire n°1 en
              Algérie lors de la recherche des professionnels du domaine de la
              communication, de la création et du marketing, du design et des
              arts graphique ainsi que de l’ingénierie informatique.
              <br />
              <br />
              Les entreprises et les particuliers rencontrent souvent des
              problèmes lors du développement des projets par manque d’effectif
              ou de professionnels d’un domaine précis, Handelp sera là pour
              vous aider à trouver la personne idéale qui saura mettre au point
              votre idée ou projet grâce à son large carnet d’adresses et de
              contacts.
              <br />
              <br />
              Vous n’aurez qu’à nous contacter via un message sur notre site web
              en joignant vos besoins et votre contact, nous prendrons le soin
              d’analyser vos besoins pour vous suggérer les professionnels qui
              conviennent à votre projet.
            </p>
          </div>

          <img
            src={freelance}
            alt="description"
            className="description__image col-lg-6"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
