import React, { useState, useEffect } from 'react';
import './HeroSection.css';

const images = [
    '/carnaval1.jpeg',
    '/carnaval2.jpeg',
    '/carnaval3.jpg',
];

function HeroSection() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000); // Troca de imagem a cada 3 segundos

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero-section">
            <div className="carousel">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={index === currentImage ? 'active' : ''}
                    />
                ))}
            </div>
            <div className="hero-content">
                <h1>CONFIRA O EDITAL DAS PRÉVIAS DO CARNAVAL 2025!</h1>
                <p>
                    Acompanhe as primeiras prévias do Carnaval de Recife, que acontecerão a partir de novembro.
                </p>
                <p>
                    <strong>Não fique de fora, participe!</strong>
                </p>
                <button>Clique aqui para ver o edital</button>
            </div>
        </section>
    );
}

export default HeroSection;