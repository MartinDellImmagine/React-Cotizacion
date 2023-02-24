import { useEffect, useState } from "react";
import Swal from "sweetalert2";



const GuardarHistorial = ({datos, historial, disabled}) => {
    const [todos, setTodos]= useState(historial)
    
    const arrayTodos = ()=>{
       setTodos([...todos, datos]),
       Swal.fire({
        position: 'Center',
        icon: 'success',
        title: 'Cotizacion guardada con exito',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>location.reload())
     
       
       
    }
    useEffect(() => {
        localStorage.setItem("historial", JSON.stringify(todos))
        
      },[todos]);
   


    return (
        <button disabled={disabled}  className="btn btn-dark" onClick={arrayTodos}>Guardar</button>
    );
}
 
export default GuardarHistorial;