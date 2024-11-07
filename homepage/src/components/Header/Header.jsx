import './Header.css';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';


function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="main-header">
      <div className="logo">
        <img src="/funcultura_nova_logo_01.png" alt="Site Logo" />
      </div>
      <nav className="nav-links">
        <a href="#inicio">Início</a>
        <a href="#sobre">Sobre</a>
        <a href="#editais">Editais</a>
        <div className="login-section" onClick={toggleDropdown}>
          <FaUser style={{marginRight: '8px'}} /> {/* Adjust size as needed */}
          <p>Login ou <br />Cadastro</p>
          {isDropdownOpen && (
            <div className="dropdown-menu">
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
