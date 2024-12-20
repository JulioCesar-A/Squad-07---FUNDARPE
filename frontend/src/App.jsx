import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Select from './pages/Forms/Select';
import AboutSection from './pages/Home/AboutSection/AboutSection';
import EditalSection from './pages/Home/EditalSection/EditalSection';
import Cadastro from './pages/Forms/Cadastro/Cadastro';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página inicial */}
        <Route path="/select" element={<Select />} />
        <Route path="/sobre" element={<AboutSection />} /> {/* Atualizado */}
        <Route path="/editais" element={<EditalSection />} /> {/* Atualizado */}
        <Route path="/cadastro/:tipo" element={<Cadastro />} /> {/* Atualizado */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
