import "../LayoutCarritoCompra/LayoutCarritoCompra.css";

import CarritoItem from "../../componentes/CarritoItem/CarritoItem";
import { useState, useEffect, useRef } from "react";
import { obtenerProducto } from "../../API/ProductosAPI";
import { obtenerTokenUserLogin, obtenerItemCarrito } from "../../API/UserAPI";
import { data } from "react-router-dom";

function LayoutCarritoCompra() {
  const [products, setProducts] = useState([]);
  const [productsItems, setProductsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setreload] = useState(true);
  const llamadoInicial = useRef(false);
  const [userCarrito, setUserCarrito] = useState("");

  useEffect(() => {
    if (llamadoInicial.current === false) {
      llamadoInicial.current = true;
      async function fetchProducts() {
        try {
          let user = "";
          await obtenerTokenUserLogin()
            .then((res) => res.json())
            .then((data) => (user = data.iduser));
          setUserCarrito(user);
          setLoading(true);
          const llamado = obtenerItemCarrito(user);
          fetch(llamado)
            .then((response) => response.json())
            .then((data) => {
              setProducts(data[0].carrito);
              let dataUsoid = data[0].carrito;

              dataUsoid.map((product) => obtenerProductos(product.idProducto));
            })
            .catch();
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
      fetchProducts();
    }
  }, []);

  async function obtenerProductos(id) {
    let respuesta = await obtenerProducto(id);
    respuesta = new Array(respuesta);

    setProductsItems((data) => {
      return [...data, ...respuesta];
    });
  }
  const Loading = (loading) => {
    if (loading === true) {
      return (
        <tr>
          <td>cargando...</td>
          <td>Cargando...</td>
          <td>Cargando...</td>
          <td>Cargando...</td>
          <td>Cargando...</td>
          <td>Cargando...</td>
        </tr>
      );
    }
  };

  return (
    <div className="layoutCarritoCompra">
      <h2>MI CARRETILLA</h2>
      <div className="contenedorItemCarrito">
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
          <tbody className="bodyTableCarrito">
            {productsItems.map((product, index) => (
              <CarritoItem
                title={product.nombre}
                descripcion={product.descripcion}
                precio={product.precio}
                stock={product.stock}
                descuento={product.descuento}
                cantidadSelect={products[index].cantSelect}
                nameItem={products[index]._id}
                productoCar={product._id}
                User={userCarrito}
              />
            ))}
            {Loading(loading)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LayoutCarritoCompra;
