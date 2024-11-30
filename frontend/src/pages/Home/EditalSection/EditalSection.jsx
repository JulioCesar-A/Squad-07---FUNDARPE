import React from 'react';
import styles from './EditalSection.module.css';

function EditalSection() {
  const editais = [
    { id: 1, title: 'Edital 2024', href: '/path-to-your-edital-2024.pdf', style: styles.edital2024 },
    { id: 2, title: 'Edital 2025', href: '/path-to-your-edital-2025.pdf', style: styles.edital2025 },
  ];

  return (
    <div className={styles.pageContainer}>
      <h2>
        CONFIRA OS EDITAIS DOS EVENTOS <br />
        QUE IRÃO ACONTECER
      </h2>

      <div className={styles.buttonContainer}>
        {editais.map((edital) => (
          <a 
            key={edital.id}
            href={edital.href}
            download
            className={`${styles.button} ${edital.style}`}
          >
            {edital.title}
            <span>Clique aqui</span>
          </a>
        ))}
      </div>

      <p className={styles.text}>
        Confira aqui todos os editais dos anos anteriores
      </p>
    </div>
  );
}

export default EditalSection;
