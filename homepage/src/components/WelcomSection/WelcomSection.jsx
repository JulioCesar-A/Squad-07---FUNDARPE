// WelcomeSection.js
import React from 'react';
import './WelcomeSection.css'; 
import imageLeft from '../img/Boas-vindas_esquerda.png';  // Caminho da imagem à esquerda
import imageRight from '../img/Boas-vindas_direita.png'; // Caminho da imagem à direita

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
        <button className="welcome-button">Cadastre-se</button>
      </div>
      
      <img src={imageRight} alt="Arte decorativa" className="welcome-image right" />
    </section>
  );
}

export default WelcomeSection;
