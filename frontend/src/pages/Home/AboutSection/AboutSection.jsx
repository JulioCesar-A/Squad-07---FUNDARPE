import React from 'react';
import './AboutSection.css';

function AboutSection() {
  const descriptions = [
    `<strong>Funcultura</strong> é a sigla para <strong>Fundo Pernambucano de Incentivo à Cultura</strong>, 
    um mecanismo de fomento e difusão da produção cultural no estado de Pernambuco.`,
    `Nós somos um fundo público que conta com um modelo de gestão compartilhada entre o governo e a sociedade civil. 
    O objetivo é democratizar o acesso aos recursos públicos e beneficiar todos que produzem cultura no estado de Pernambuco.`,
    `O Funcultura disponibiliza recursos para a realização de projetos culturais em diversas áreas, como:`
  ];

  const areas = [
    'Artesanato', 'Artes Cênicas', 'Artes Plásticas', 'Audiovisual', 
    'Cultura Popular', 'Fotografia', 'Gastronomia', 'Literatura', 
    'Música', 'Patrimônio'
  ];

  const footerText = `Nós lançamos editais de seleção pública anualmente, permitindo que produtores e artistas recebam recursos diretamente do governo.`;

  return (
    <section className="about-section">
      <div className="about-container">
        <h2 className="about-title">SOBRE NÓS</h2>

        {/* Descriptions */}
        {descriptions.map((desc, index) => (
          <p 
            key={index} 
            className="about-description" 
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        ))}

        {/* Areas List */}
        <ul className="about-areas-list">
          {areas.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>

        {/* Footer */}
        <p className="about-footer">{footerText}</p>
      </div>
    </section>
  );
}

export default AboutSection;
