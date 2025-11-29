import './EstadoProducto.css'
function EstadoProducto(prop){
    const estado = prop.estado
    return(
        <div className= {  `colorEstado ${estado}`} >
            <p>{prop.text}</p>
        </div>
    );
}
export default EstadoProducto;