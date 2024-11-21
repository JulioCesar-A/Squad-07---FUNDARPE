import React, { useState } from 'react';
import './HeroSection.css';
const images = [
  '/carnaval1.jpeg',
  '/carnaval2.jpeg','/carnaval3.jpg',
];

function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="hero-section">
      <div className="carousel">
        <button onClick={prevImage}>&lt;</button>
        <img src={images[currentImage]} alt="Carnaval" />
        <button onClick={nextImage}>&gt;</button>
      </div>
      <div className="hero-content">
        <h1>CONFIRA O EDITAL DAS PRÉVIAS DO CARNAVAL 2025!</h1>
        <br />
        <p>
          Acompanhe as primeiras prévias do Carnaval de Recife, que acontecerão a partir de novembro.
        </p>
        <p>
          <strong> Não fique de fora, participe!</strong>
        </p>
        <button>Clique aqui para ver o edital</button>
      </div>
    </section>
  );
}

export default HeroSection;