
import ButtonActionProduc from '../../componentes/ButtonActionProduc/ButtonActionProduc'

import ButtonCantProduct from '../../componentes/ButtonCantProduct/ButtonCantProduct';

import { useState } from 'react';

import { calcularPrecioDescuento } from '../ProductoDetallado/ProductoDetallado';

import { eliminarItemCarritoUser } from '../../API/UserAPI';
import Swal from 'sweetalert2';
function CarritoItem(
    {
        title, descripcion, precio, stock, descuento, cantidadSelect, nameItem, productoCar
    }
) {
    let precioDescuento = calcularPrecioDescuento(parseFloat(precio), parseFloat(descuento))

    let inicioTotal = precioDescuento * parseInt(cantidadSelect)
    const [total, setTotal] = useState(inicioTotal)

    const seteoTotal = (cantProduct, signo) => {
        if (signo == "+") {
            setTotal(precioDescuento * (cantProduct + 1))
        } else {
            setTotal(precioDescuento * (cantProduct - 1))
        }

    }
    async function eliminarItemCarrito() {
        try {
            let user = localStorage.getItem("user")
            const respuestaActualizacion = await eliminarItemCarritoUser(user, nameItem)
            //alert("Eliminado")
            Swal.fire({
                title: "Producto eliminado del carrito",
                text: "El producto ha sido eliminado correctamente",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            });
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
            <td className='cellBtn'><ButtonCantProduct productoCar={productoCar} idProducto={nameItem} CantInicial={cantidadSelect} Event={seteoTotal} carritoBtnCant={"CarritoCantbtn"} stock={parseInt(stock)} /></td>
            <td>${parseFloat(total)}</td>
            <td className='cellBtn'><ButtonActionProduc nameItem={nameItem} status={"CarritoCompraBTN"} text={"Eliminar"} Click={eliminarItemCarrito} /></td>
        </tr>
    );
}

export default CarritoItem;