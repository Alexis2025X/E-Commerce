
import ButtonActionProduc from '../../componentes/ButtonActionProduc/ButtonActionProduc'

import ButtonCantProduct from '../../componentes/ButtonCantProduct/ButtonCantProduct';

import { useState } from 'react';

import { calcularPrecioDescuento } from '../ProductoDetallado/ProductoDetallado';

import { eliminarItemCarritoUser } from '../../API/UserAPI';
import Swal from 'sweetalert2';
function CarritoItem(
    {
        title,descripcion,precio,stock,descuento,cantidadSelect,nameItem,productoCar,User,idProducto
    }
) {
    //  subtotalProp = {subTotal}
    //             event = {cambioSun}
    let precioDescuento = calcularPrecioDescuento(parseFloat(precio), parseFloat(descuento))

    let inicioTotal = precioDescuento * parseInt(cantidadSelect)
    const [total, setTotal] = useState(inicioTotal)

    const seteoTotal = (cantProduct, signo) => {
        if (signo == "+") {
            setTotal(precioDescuento * (cantProduct + 1))
            
        } else {
            setTotal(precioDescuento * (cantProduct - 1))
        }
        location.reload();     
    }
    function confirmacionEliminacion() {
        Swal.fire({
            title: "Alerta",
            text: "¿Esta seguro que desea eliminar el producto del carrito?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo"
        }).then((result) => {
            if (result.isConfirmed) {
                return eliminarItemCarrito();
            } else {
                Swal.fire({
                    title: "Cancelado",
                    text: "El producto no ha sido eliminado",
                    icon: "info",
                    confirmButtonColor: "#3085d6"
                });
            }
        });
    }
    function mensaje() {
        return Swal.fire({
            title: "Producto eliminado del carrito",
            text: "El producto ha sido eliminado correctamente",
            icon: "success"
        });
    }
    async function eliminarItemCarrito() {
        try {
          
            const respuestaActualizacion = await eliminarItemCarritoUser(User, nameItem)
            //alert("Eliminado")
            // Swal.fire({
            //     title: "Alerta",
            //     text: "¿Esta seguro que desea eliminar el producto del carrito?",
            //     icon: "warning",
            //     showCancelButton: true,
            //     confirmButtonColor: "#3085d6",
            //     cancelButtonColor: "#d33",
            //     confirmButtonText: "Yes, delete it!"
            // }).then((result) => {
            //     if (result.isConfirmed) {
            mensaje()

            //     }
            // });
            // Swal.fire({
            //     title: "Producto eliminado del carrito",
            //     text: "El producto ha sido eliminado correctamente",
            //     icon: "success",
            //     confirmButtonColor: "#3085d6",
            //     confirmButtonText: "Aceptar"
            // });
        } catch (error) {
            //console.error(error)
            Swal.fire({
                title: "Error al eliminar el producto del carrito",
                text: "Ocurrio un error, intentelo nuevamente: " + error,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            });
        }
        location.reload();
    }



    return (
        <tr key={nameItem}>
            <td>{title}</td>
            <td>{descripcion}</td>
            <td><span>${parseFloat(precioDescuento).toFixed(2)}</span><p>${parseFloat(precio).toFixed(2)}</p></td>
            <td className='cellBtn'><ButtonCantProduct productoDetalle = {true}  User ={User}  productoCar = {productoCar} idProducto = {nameItem} CantInicial = {cantidadSelect}  Event = {seteoTotal} carritoBtnCant= {"CarritoCantbtn"} stock = {parseInt(stock)}/></td>
            <td>${parseFloat(total)}</td>
            <td className='cellBtn'><ButtonActionProduc nameItem={nameItem} status={"CarritoCompraBTN"} text={"Eliminar"} Click={confirmacionEliminacion} /></td>
        </tr>
    );
}

export default CarritoItem;