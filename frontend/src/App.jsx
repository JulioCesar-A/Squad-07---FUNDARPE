
import './App.css'

import Footer from "./components/Footer/Footer"
import Etapa1 from './components/Forms/Etapa1'
import Etapa2 from './components/Forms/Etapa2'
import Etapa3 from './components/Forms/Etapa3'

import { useForm } from './Hooks/useForm'
function App() {

  const formComponents =[<Etapa1 key="first"/>,<Etapa2 key="second"/>,<Etapa3 key="third"/>,]

  const {currentStep, currentComponent, changeStep, isLastStep} = useForm(formComponents)
  return (
    <div>
       <div className="form-container"></div>
      
      <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
        <div className="inpunts-container">{currentComponent}</div>
        <div className="action"></div>
        <button type="button" onClick={() => changeStep(currentStep -1)}>Voltar</button>
        {!isLastStep ? (
          <button type="submit">Avançar</button>
        ) : (
          <button type="button">Comcluir</button>
        )}
      </form>

      <Footer />


    </div>
   
    
    
  )
}

export default App
