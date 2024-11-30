import React from 'react';
import { Link } from 'react-router-dom'; // Import do Link
import './WelcomeSection.css';
import imageLeft from '../../../assets/images/Boas-vindas_esquerda.png';
import imageRight from '../../../assets/images/Boas-vindas_direita.png';

function WelcomeSection() {
  return (
    <section className="welcome-section">
      <img src={imageLeft} alt="Arte decorativa" className="welcome-image left" />
      <div className="welcome-content">
        <h2 className="welcome-title">Boas-vindas à área cadastral do Funcultura!</h2>
        <p className="welcome-subtitle">
          Faça seu cadastro de produtor cultural abaixo. É grátis!
        </p>
        <br />
        {/* Link substitui o botão */}
        <Link to="/select" className="welcome-button">Cadastre-se</Link>
      </div>
      <img src={imageRight} alt="Arte decorativa" className="welcome-image right" />
    </section>
  );
}

export default WelcomeSection;
