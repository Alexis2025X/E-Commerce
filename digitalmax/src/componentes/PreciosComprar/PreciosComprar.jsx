import iconStard from '../../assets/img/icon stard.svg'
import './PreciosComprar.css'
import IconoStard from '../../assets/img/Icon Stard';
import ButtonDetallesProduct from '../ButtonCantProduct/ButtonCantProduct';
import ButtonActionProduc from '../ButtonActionProduc/ButtonActionProduc';
import StardCalificacion from '../StardCalificacion/StardCalificacion';
import EstadoProducto from '../EstadoProducto/EstadoProducto';
import { useState } from 'react';
import { agregarItemCarrito,obtenerTokenUserLogin } from '../../API/UserAPI';
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
 async  function handleClickAgregarCarrito(){
    try {
    
    async function handleClickAgregarCarrito() {
        try {
             const productoCantidad = document.getElementById('productoCantidadSelect').innerText
        let user = ""
               await obtenerTokenUserLogin().then(res => res.json()).then((data) => user = data.iduser)
     let datosCarrito = {
            idProducto: prop.producID,
            cantSelect: parseInt(productoCantidad)
            let res = await agregarItemCarrito(user, datosCarrito)
            Swal.fire({
                title: "Producto agregado al carrito",
                text: "El producto ha sido guardado en el carrito correctamente",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            });
        } catch (error) {
            Swal.fire({
                title: "Error al agregar el producto al carrito",
                text: "Ocurrio un error, intentelo nuevamente: "+ error,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            });

        }
    }


    return (

        <div className='productDesContent'>
            <StardCalificacion tamaño={20} count = {prop.StardCalificacion} />
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