import styles from './Header.module.css';
import logo from '../../assets/images/funcultura_nova_logo_01.png';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={styles.mainHeader}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="Site Logo" />
        </Link>
      </div>
      <nav className={styles.navLinks}>
        <Link to="/">Início</Link>
        <Link to="/sobre">Sobre Nós</Link>
        <Link to="/editais">Editais</Link>
        <div className={styles.loginSection} onClick={toggleDropdown}>
          <FaUser style={{ marginRight: '8px' }} />
          <p>Login ou <br />Cadastro</p>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/login">Entrar</Link>
              <Link to="/select">Criar Conta</Link> {/* Atualizado */}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
