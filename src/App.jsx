import './App.css'
import Formulario from './components/Formulario'
import { useState } from 'react';

const historialInicial = JSON.parse(localStorage.getItem("historial")) || [];

function App() {

  const [historial, setHistorial] = useState(historialInicial) 
  
 
  return (
    <div className="root container">
      <h3 className="rootTitle text-center display-3">SEGUROS DEL HOGAR </h3>
     
      <Formulario historial={historial}/>

    </div>
  )
}

export default App
