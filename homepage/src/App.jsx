import './App.css';

import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection'
import WelcomeSection from './components/WelcomSection/WelcomSection';
import AboutSection from './components/AboutSection/AboutSection';
import EditalSection from './components/EditalSection/EditalSection';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
    {/* Adicionando o Header */}
    <Header />
    
    {/* Adicionando a HeroSection */}
    <HeroSection />

    {/* Adicionando o WelcomeSection*/}
    <WelcomeSection />

    {/* Adicionando o AboutSection */}
    < AboutSection />

    {/* Adicionando o EditalSection */}
    < EditalSection />

    {/* Adicionando o Footer */}
    < Footer />
  </div>
);
}

export default App;
