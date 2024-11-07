import React from 'react';
import './EditalSection.css'; // Vamos criar o arquivo de estilo separado para uma organização melhor

function EditalSection() {
  return (
    <div className="page-container">
      <h2>CONFIRA OS EDITAIS DOS EVENTOS <br />QUE IRÃO ACONTECER</h2>
      
      <div className="button-container">
        <a href="/path-to-your-edital-2024.pdf" download className="button edital-2024">
          Edital 2024
          <span>Clique aqui</span>
        </a>

        <a href="/path-to-your-edital-2025.pdf" download className="button edital-2025">
          Edital 2025
          <span>Clique aqui</span>
        </a>
      </div>

      <p className='text'>Confira aqui todos os editais dos anos anteriores</p>
    </div>
  );
}

export default EditalSection;
