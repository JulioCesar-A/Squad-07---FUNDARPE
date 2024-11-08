// AboutSection.js

import React from 'react';
import './AboutSection.css';

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">
        <h2 className="about-title">SOBRE NÓS</h2>
        <p className="about-description">
          <strong>Funcultura</strong> é a sigla para <strong>Fundo Pernambucano de Incentivo à Cultura</strong>, 
          um mecanismo de fomento e difusão da produção cultural no estado de Pernambuco.
        </p>
        <p className="about-description">
          Nós somos um fundo público que conta com um modelo de gestão compartilhada entre o governo e a sociedade civil.
          O objetivo é democratizar o acesso aos recursos públicos e beneficiar todos que produzem cultura no estado de Pernambuco.
        </p>
        <p className="about-description">
          O Funcultura disponibiliza recursos para a realização de projetos culturais em diversas áreas, como:
        </p>
        <ul className="about-areas-list">
          <li>Artesanato</li>
          <li>Artes Cênicas</li>
          <li>Artes Plásticas</li>
          <li>Audiovisual</li>
          <li>Cultura Popular</li>
          <br />
          <li>Fotografia</li>
          <li>Gastronomia</li>
          <li>Literatura</li>
          <li>Música</li>
          <li>Patrimônio</li>
        </ul>
        <p className="about-footer">
          Nós lançamos editais de seleção pública anualmente, permitindo que produtores e artistas recebam recursos diretamente do governo.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;