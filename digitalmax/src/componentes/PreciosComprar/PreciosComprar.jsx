
import './PreciosComprar.css'
import ButtonDetallesProduct from '../ButtonCantProduct/ButtonCantProduct';
import ButtonActionProduc from '../ButtonActionProduc/ButtonActionProduc';
import StardCalificacion from '../StardCalificacion/StardCalificacion';
import EstadoProducto from '../EstadoProducto/EstadoProducto';
import { useState } from 'react';
import { agregarItemCarrito,obtenerTokenUserLogin } from '../../API/UserAPI';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { calcularPrecioDescuento } from '../ProductoDetallado/ProductoDetallado';

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
    
   
       
            const productoCantidad = document.getElementById('productoCantidadSelect').innerText
        let user = ""
       const obtenCookie=  await obtenerTokenUserLogin().then(res => res.json()).then((data) => user = data.iduser)
    if(obtenCookie != undefined){

               
               
     let datosCarrito = {
            idProducto: prop.producID,
            cantSelect: parseInt(productoCantidad)
        }

            let res = await agregarItemCarrito(user, datosCarrito)

            Swal.fire({
                title: "Producto agregado al carrito",
                text: "El producto ha sido guardado en el carrito correctamente",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            });
            }else{
                Swal.fire({
                title: "Error al agregar el producto al carrito",
                text: "Ocurrio un error, Es necesario iniciar sesion para agregar productos: ",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            });
            }
       
       
    
     } catch (error) {
            Swal.fire({
                title: "Error al agregar el producto al carrito",
                text: "Ocurrio un error, intentelo nuevamente: " + error,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            });

        }

 }
    const navigateReguistre = useNavigate();

 const compraInmediata = () =>{
    const cantSelect = document.getElementById("productoCantidadSelect").innerText

        let precioDescuento = calcularPrecioDescuento(parseFloat(prop.CompraProducto.precio), parseFloat(prop.CompraProducto.descuento))
        let inicioTotal = precioDescuento * parseInt(cantSelect)
        
    localStorage.setItem('compraJSON',
        JSON.stringify([{
            idProducto: prop.producID,
            nombre: prop.CompraProducto.nombre,
            precio: prop.CompraProducto.precio,
            descuento: prop.CompraProducto.descuento,
            cantidadSelect: parseInt(cantSelect),
            total: inicioTotal 
        }])
    )

        localStorage.setItem('tipoCompra', 'unica')
    navigateReguistre('/app/compra')
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
                    <ButtonDetallesProduct stock={prop.stock} productoDetalle = {false} />
                    <p>{prop.descuento}% de Descuento</p>

                    <ProductoStock stock={prop.stock} />
                </div>
                <span>
                    <ButtonActionProduc Click={handleClickAgregarCarrito} status="ActionActivo" text="Agregar al carrito" />
                    <ButtonActionProduc status="ActionActivo" text="Comprar ahora" Click={compraInmediata}/>
                </span>

            </div>
        </div>

    );

}

export default ProductoDescripcion;