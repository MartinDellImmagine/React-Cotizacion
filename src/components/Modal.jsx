import Swal from "sweetalert2"

const Modal = ({historial}) => {
    const limpiar=()=>{
        localStorage.removeItem("historial")

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Historial borrado',
            showConfirmButton: false,
            timer: 1500
          }).then(()=>location.reload())

        
    }
    return ( 
        <>
            
                <button type="button" className="btn btn-dark mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-clock-history"></i>
                </button>

                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Fecha cotizacion</th>
                                    <th scope="col">Propiedad</th>
                                    <th scope="col">Ubicacion</th>
                                    <th scope="col">Metros</th>
                                    <th scope="col">Poliza Mensual</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        historial.map((e, index)=>(
                                            <tr key={index}>
                                                <th scope="row">{e.fechaHoraFinal}</th>
                                                <td>{e.propiedad}</td>
                                                <td>{e.ubicacion}</td>
                                                <td>{e.metros}</td>
                                                <td>${e.precio}</td>
                                            </tr>
                                        ))
                                    }
                            </tbody>
                            </table>
                    </div>
                    <div className="modal-footer">
                        <button onClick={limpiar} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Limpiar el historial</button>
                    </div> 
                    </div>
                </div>
                </div>
        </>
     );
}
 
export default Modal;