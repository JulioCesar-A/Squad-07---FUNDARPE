import styles from './Header.module.css';
import logo from '../../assets/images/funcultura_nova_logo_01.png'
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={styles.mainHeader}>
      <div className={styles.logo}>
        <img src={logo} alt="Site Logo" />
      </div>
      <nav className={styles.navLinks}>
        <a href="#inicio">Início</a>
        <a href="#sobre">Sobre</a>
        <a href="#editais">Editais</a>
        <div className={styles.loginSection} onClick={toggleDropdown}>
          <FaUser style={{ marginRight: '8px' }} />
          <p>Login ou <br />Cadastro</p>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <a href="#login">Entrar</a>
              <a href="#register">Criar Conta</a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
