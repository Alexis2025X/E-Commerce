import '../LayoutCarritoCompra/LayoutCarritoCompra.css'

import CarritoItem from '../../componentes/CarritoItem/CarritoItem';
import { useState, useEffect,useRef } from 'react';
import { obtenerProducto } from '../../API/ProductosAPI';
import { obtenerItemCarrito } from '../../API/UserAPI';




    
function LayoutCarritoCompra(){

 

    const [products, setProducts] = useState([]);
    const [productsItems, setProductsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setreload] = useState(true);
    const llamadoInicial = useRef(false);



useEffect(() => {
if (llamadoInicial.current === false) {
    llamadoInicial.current = true;
    async function fetchProducts ()  {
    try {
      setLoading(true);
      // Usamos fetchAllProducts para obtener todos los productos
      const user = localStorage.getItem('user')
      const llamado = obtenerItemCarrito(user)
      fetch(llamado)
      .then(response => response.json())
      .then(data => {
        setProducts(data[0].carrito);
        let dataUsoid = data[0].carrito
        dataUsoid.map((product) => (
          obtenerProductos(product.idProducto)  
        ))

      })
      .catch(error => {
        console.error("Error al obtener datos:", error);
      });
      
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}
}, [] ) ;

async function obtenerProductos(id) {
    let respuesta = await  obtenerProducto(id)
    respuesta = new Array(respuesta) 

    setProductsItems(data => {
        return [...data, ...respuesta]
    })
    

    
}
  const Loading = (loading) =>{
      if (loading === true){
        return <tr>
            <td>cargando...</td>
            <td>Cargando...</td>
            <td>Cargando...</td>
            <td>Cargando...</td>
            <td>Cargando...</td>
            <td>Cargando...</td>
        </tr>   
    }
  }

    

    return(
        <div className='layoutCarritoCompra'>
            <h2>MI CARRETILLA</h2>
            <div className='contenedorItemCarrito'>
               <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody className='bodyTableCarrito'>
                   
                   {productsItems.map((product, index) => (
                    <CarritoItem 
                   
                    title = {product.nombre}
                    descripcion= {product.descripcion}
                    precio= {product.precio}
                    stock= {product.stock}
                    descuento= {product.descuento}
                    cantidadSelect= {products[index].cantSelect}
                    nameItem = {products[index]._id}
                    productoCar = {product._id}
                    />
                    ))}
      {Loading(loading)}
                </tbody>
               </table>
            </div>
        </div>        
    )
}

export default LayoutCarritoCompra;