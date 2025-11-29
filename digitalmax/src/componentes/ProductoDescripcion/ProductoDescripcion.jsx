
import './ProductoDescripcion.css'
import IconoStard from '../../assets/img/Icon Stard';
import ButtonDetallesProduct from '../ButtonCantProduct/ButtonCantProduct';
import ButtonActionProduc from '../ButtonActionProduc/ButtonActionProduc';
import StardCalificacion from '../StardCalificacion/StardCalificacion';
import EstadoProducto from '../EstadoProducto/EstadoProducto';
function ProductoDescripcion(prop) {
    return (

        <div className='productoDescripcion'>
            <h2>{prop.nombreCompleto}</h2>
            <p>{prop.descripcion}</p>
        </div>

    );

}

export default ProductoDescripcion;