
import './PreciosComprar.css'
import ButtonDetallesProduct from '../ButtonCantProduct/ButtonCantProduct';
import ButtonActionProduc from '../ButtonActionProduc/ButtonActionProduc';
import StardCalificacion from '../StardCalificacion/StardCalificacion';
import EstadoProducto from '../EstadoProducto/EstadoProducto';


import { agregarItemCarrito } from '../../API/UserAPI';
import Swal from 'sweetalert2';

function ProductoStock(prop) {
    if (prop.stock > 10) {
        return <EstadoProducto estado="Disponible" text="En Stock" />
    }
    else if (prop.stock < 10 && prop.stock > 0) {
        return <EstadoProducto estado="PocasUnidades" text="Pocas Unidades" />
    }
    else if (prop.stock === 0) {
        return <EstadoProducto estado="Agotado" text="Agotado" />
    }
}


function ProductoDescripcion(prop) {

    async function handleClickAgregarCarrito() {
        try {
            const productoCantidad = document.getElementById('productoCantidadSelect').innerText
            const user = localStorage.getItem("user")
            let datosCarrito = {
                idProducto: prop.producID,
                cantSelect: parseInt(productoCantidad)
            }
            let res = await agregarItemCarrito(user, datosCarrito)
            //alert("Producto guardado en el carrito")
            Swal.fire({
                title: "Producto agregado al carrito",
                text: "El producto ha sido guardado en el carrito correctamente",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            });
        } catch (error) {
            //alert("Error al guardar el producto" + error)
            Swal.fire({
                title: "Error al agregar el producto al carrito",
                text: "Ocurrio un error, intentelo nuevamente: " + error,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            });

        }
    }

    return (

        <div className='productDesContent'>
            <StardCalificacion tamaño={20} />
            <h2>
                $ {prop.precioDescuento}
            </h2>
            <h3>
                <s>$ {prop.precio}</s>
            </h3>
            <div className='contentButonAction'>
                <div>
                    <ButtonDetallesProduct stock={prop.stock} />
                    <p>{prop.descuento}% de Descuento</p>

                    <ProductoStock stock={prop.stock} />
                </div>
                <span>
                    <ButtonActionProduc Click={handleClickAgregarCarrito} status="ActionActivo" text="Agregar al carrito" />
                    <ButtonActionProduc status="ActionActivo" text="Comprar ahora" />
                </span>

            </div>
        </div>

    );

}

export default ProductoDescripcion;