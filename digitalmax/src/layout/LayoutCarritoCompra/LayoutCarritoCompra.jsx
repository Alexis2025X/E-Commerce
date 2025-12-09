import "../LayoutCarritoCompra/LayoutCarritoCompra.css";

import CarritoItem from "../../componentes/CarritoItem/CarritoItem";
import { useState, useEffect, useRef } from "react";
import { obtenerProducto } from "../../API/ProductosAPI";
import { obtenerTokenUserLogin, obtenerItemCarrito } from "../../API/UserAPI";
import { useNavigate } from "react-router-dom";
import Arrow_1 from "../../assets/img/Arrow 1.png";
import ButtonActionProduc from "../../componentes/ButtonActionProduc/ButtonActionProduc";
import { calcularPrecioDescuento } from "../../componentes/ProductoDetallado/ProductoDetallado";

function LayoutCarritoCompra() {
  const [products, setProducts] = useState([]);
  const [productsItems, setProductsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const llamadoInicial = useRef(false);
  const [userCarrito, setUserCarrito] = useState("");
  const navigate = useNavigate();
  const subTotal = useRef(0);
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
              console.log(dataUsoid);
              dataUsoid.map((product) =>
                obtenerProductos(product.idProducto, product.cantSelect)
              );
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

  const obtenerProductos = async (id, cant) => {
    let respuesta = await obtenerProducto(id);
    respuesta = new Array(respuesta);
    let precioDescuento = calcularPrecioDescuento(
      parseFloat(respuesta[0].precio),
      parseFloat(respuesta[0].descuento)
    );
    const sub = precioDescuento * parseInt(cant);
    subTotal.current = subTotal.current + sub;
    subTotal.current = parseFloat(subTotal.current.toFixed(2));
    setProductsItems((data) => {
      return [...data, ...respuesta];
    });
    console.log(subTotal.current);
  };
  const cambioSun = (nuevoTotal) => {
    subTotal.current = nuevoTotal;
  };

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

  function pagarAhora() {
    navigate("/app/compra");
  }

        localStorage.setItem('tipoCompra', 'car')

 localStorage.setItem("compraJSON",[]);

  function agregarProductoALocalStorage(nuevoElemento) {
    
    const productosString = localStorage.getItem("compraJSON");
    let productosArray = productosString ? JSON.parse(productosString) : [];
    productosArray.push(nuevoElemento);
    localStorage.setItem("compraJSON", JSON.stringify(productosArray));
  }

  productsItems?.map((product, index) => (
              
       agregarProductoALocalStorage({
    idProducto:product._id,
    nombre: product.nombre,
    precio: product.precio,
    descuento: product.descuento,
    cantidadSelect: products[index].cantSelect,
    total: calcularPrecioDescuento(parseFloat(product.precio), parseFloat(product.descuento)) * parseInt( products[index].cantSelect),
  })
            ))
  

 

  return (
    <div className="layoutCarritoCompra">
      <h2>MI CARRETILLA</h2>
      <div className="contenedorItemCarrito">
        <table id="idTabla">
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
                subtotalProp={subTotal}
                event={cambioSun}
              />
            ))}
            <tr key={"adassdasdas"} className="TotalPago">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <h4 className="subTotal">SUB TOTAL:</h4>
                <br /> ${parseFloat(subTotal.current)}
              </td>
              <td></td>
            </tr>
            {Loading(loading)}
          </tbody>
        </table>
        <div className="contentPago">
          <ButtonActionProduc
            nameItem={"Pagarahora"}
            status={"pagoProduct"}
            text={"Pagar ahora"}
            Click={pagarAhora}
          />
        </div>
        <div className="SigueComprando" onClick={() => navigate("/")}>
          <img src={Arrow_1} /> Continuar Comprando
        </div>
      </div>
    </div>
  );
}

export default LayoutCarritoCompra;
