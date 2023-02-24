import { useState } from "react";
import { useFetch } from "../tools/hooks/useFetch";
import Swal from "sweetalert2";
import Cotizador from "../tools/class.cotizador.js";
import Modal from "./Modal";
import GuardarHistorial from "./GuardarHistorial";


const costoM2 = 35.86



const Formulario = ({historial}) => {

    const [disabled, setDisabled] = useState(true) 
    //Consumiendo mockAPI


    //datos por defecto
    const [datos, setDatos] = useState({
        propiedad: "...",
        ubicacion:"...",
        metros: 20,
        fechaHoraFinal:"1/1/2023,00:00:00",
        precio: 0.00,

    })

    const {propiedad,ubicacion, data, loading, error}= useFetch('https://6334c678ea0de5318a08cea5.mockapi.io/cotizacion')
    


    //funcion que se ejecuta al clickear el boton submit
    const handleSubmit = (e)=>{
        e.preventDefault()
        
        
       // validacion de campos completos
        if(datos.propiedad.trim() === "..." || !datos.ubicacion.trim() === "..."){
            return Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Rellena los campos obligatorios',
              })
        }

        //fecha y hora
        const currentTime = new Date()
        const fecha = `${currentTime.getDate()}/${currentTime.getMonth()+1}/${currentTime.getFullYear()},${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}` 
        
        

        
        let propiedadFinal = propiedad.find((val)=>val.tipo == datos.propiedad)
        let ubicacionFinal = ubicacion.find((val)=>val.tipo == datos.ubicacion)

     
        //Cotizacion y actualizacion de precio
        
        const cotizacion = new Cotizador(costoM2, propiedadFinal.factor, ubicacionFinal.factor, datos.metros)

        //activar boton guardar
        setDisabled(false)

        //armado del objeto
        setDatos(
            {
                ...datos, 
                propiedad: propiedadFinal.tipo, 
                ubicacion: ubicacionFinal.tipo,
                fechaHoraFinal: fecha,
                precio: parseFloat(cotizacion.cotizarPoliza()),
                
            })
        
    }

    //funcion que se ejecuta cuando cambia algun input
    const handleChange = (e) =>{
        

        setDatos({
            ...datos, [e.target.name]: e.target.value
        })

    }


    if (loading) return 
    if(error) return


    return (
        <div className="formRoot container">
            <div className="d-flex justify-content-between">
            <h3 className="text-center mb-3">Completa los datos solicitados</h3>
            <Modal historial={historial} />
            </div>
            
          
            <form onSubmit={handleSubmit}>
                <div>
                    <p className="text-center">Selecciona el tipo de propiedad</p>
                    <select className="form-select mt-3" name='propiedad' value={datos.propiedad} onChange={handleChange}>
                        <option disabled value='...'>...</option>
                        {
                            propiedad.map((elemento, index)=>(
                                <option key={index} value={elemento.tipo}>{elemento.tipo}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <p className="text-center">Selecciona su ubicacion</p>
                    <select className="form-select mt-3" name="ubicacion" value={datos.ubicacion} onChange={handleChange}>
                        <option disabled value='...'>...</option>
           
                        {
                            ubicacion.map((elemento, index)=>(
                                <option key={index} value={elemento.tipo}>{elemento.tipo}</option>
                            ))
                        }
                    
                    </select>
                </div>
                <p className="text-center">Ingresa los metros cuadrados:</p>
                <input className="form-control mt-3" min={5} max={1000} type="number" name="metros" placeholder='seleccione la cantidad de metros cuadrados' value={datos.metros} onChange={handleChange} />
                <div className="d-grid gap-2 col-6 mx-auto">
                        <button className="btn btn-outline-info mt-5" type="submit">Cotizar</button>
                </div>

                <h3 className="precio text-center mt-3">Precio estimado ${datos.precio}</h3>

            
            </form>
            <div className="d-grid gap-2 col-1 mx-auto">
                <GuardarHistorial datos={datos} historial={historial} disabled={disabled}/>
            </div>
           
        </div>
    );
}
 
export default Formulario;