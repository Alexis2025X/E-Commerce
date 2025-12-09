import "./LayoutCompraPedido.css";
import ButtonActionProduc from "../../componentes/ButtonActionProduc/ButtonActionProduc";
import DescriptionCompraProduct from "../../componentes/DescriptionCompraProduct/DescriptionCompraProduct";
import Swal from "sweetalert2";
import { useState } from "react";
import { obtenerTokenUserLogin } from "../../API/UserAPI";
import { crearventa } from "../../API/ventaAPI";
import { useNavigate } from "react-router-dom";
import { ActualizarStock } from "../../API/ProductosAPI";
import { eliminarCarrito } from "../../API/UserAPI";

function LayoutCompraPedido({}) {
  const [tipoCompra, setTipocompra] = useState(false);
  const navigate = useNavigate();

  const [dataCompra, setDatacompra] = useState({
    idUser: "",
    nombre: "",
    correo: "",
    telefono: "",
    dataventa: [
      {
        cantidadSelect: 0,
        descuento: 0,
        idProducto: "",
        nombre: "",
        precio: 0,
        total: 0,
      },
    ],
    dataPago: [
      {
        Ntarjeta: "",
        NombreTarjeta: "",
        fechaExpiracion: "",
        CVV_CVC: "",
      },
    ],
    totalVenta: 2,
  });

  async function recoleccionData() {
    try {
      let idUser = "";
      await obtenerTokenUserLogin()
        .then((res) => res.json())
        .then((data) => (idUser = data.iduser));

      const nombre = document.getElementById("compraInputNombre").value;
      const telefono = document.getElementById("compraInputtelefono").value;
      const correo = document.getElementById("compraInputCorreo").value;
      let Ntarjeta = "";
      let nombreT = "";
      let expira = "";
      let cvv_cvc = "";
      if (!tipoCompra) {
        Ntarjeta = document.getElementById("compraInputnumero").value;
        nombreT = document.getElementById("compraInputNombreT").value;
        expira = document.getElementById("CompraFechaex").value;
        cvv_cvc = document.getElementById("cvv_cvc").value;
      }
      if (
        (nombre === null || nombre.length === 0 || nombre.trim().length === 0,
        telefono === null ||
          telefono.length === 0 ||
          telefono.trim().length === 0,
        correo === null || correo.length === 0 || correo.trim().length === 0)
      ) {
        Swal.fire({
          title: "Complete la información",
          text: "¡Necesita rellenar todos los campos!",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
        return;
      } else {
        if (
          !tipoCompra &&
          (Ntarjeta === null ||
            Ntarjeta.length === 0 ||
            Ntarjeta.trim().length != 16,
          nombreT === null ||
            nombreT.length === 0 ||
            nombreT.trim().length === 0,
          expira === null || expira.length === 0 || expira.trim().length === 0,
          cvv_cvc === null ||
            cvv_cvc.length === 0 ||
            cvv_cvc.trim().length == 0)
        ) {
          Swal.fire({
            title: "Complete la información",
            text: "¡Necesita rellenar todos los campos!",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
          return;
        }
        if (cvv_cvc.trim().length != 3 && !tipoCompra) {
          Swal.fire({
            title: "Información incompatible",
            text: "¡CVV/CVC no cuenta con el formato correcto!",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
          return;
        }
        if (Ntarjeta.trim().length != 16 && !tipoCompra ) {
          Swal.fire({
            title: "Información incompatible",
            text: "¡El numero de tarjeta no cuenta con el formato correcto, asegurate de no colocar espacios!",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
          return;
        }
        const patron = /^\d{2}\/\d{2}$/;
        if (!patron.test(expira) && !tipoCompra) {
          Swal.fire({
            title: "Información incompatible",
            text: "¡La fecha de expiracion se encuentra en formato invalido (ejemplo: 01/26)!",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
          return;
        }

        const data_envio = {
          idUser: idUser,
          nombre: nombre,
          correo: correo,
          telefono: telefono,
          tipoVenta: tipoCompra ? "Efectivo" : "Tarjeta",
          dataventa: JSON.parse(localStorage.getItem("compraJSON")),
          dataPago: [
            {
              Ntarjeta: Ntarjeta,
              NombreTarjeta: nombreT,
              fechaExpiracion: expira,
              CVV_CVC: cvv_cvc,
            },
          ],
          totalVenta: parseFloat(totalcompra()) ,
        };
        const compraPorCarrito = localStorage.getItem('tipoCompra')
        if(compraPorCarrito === 'car'){
          await eliminarCarrito(idUser)
        }

        const errores =   actualizarStocks()
        alert(errores)
        
        if(compraPorCarrito != 'car' && errores > 0){
        Swal.fire({
        title: "Producto Agotado",
        text: "¡El producto ya ha agotado",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
          return
        }

        const respuesta = await crearventa(data_envio);
        if (respuesta.status == 201) {
          console.log(data_envio);
          handleClickCompra();
             
             return
        }
         Swal.fire({
        title: "Error al procesar la venta",
        text: "¡Necesita iniciar sesion para continuar!",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
     
      }
    } catch (error) {
      Swal.fire({
        title: "Inicie Sesion",
        text: "¡Necesita iniciar sesion para continuar! en el try ",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  }
 function actualizarStocks(){
     let contenido;

    productCompra?.map( async (produc) => {
     const respuesta = await ActualizarStock(produc.idProducto, produc.cantidadSelect)
     if(respuesta.status === 404){
      contenido += 1
     }
    });
    return contenido
        
  }

  function handleClickCompra() {
    Swal.fire({
      title: "Compra exitosa",
      text: "¡GRACIAS POR SU COMPRA EN DIGITALMAX!, le presentamos más de nuestro catalogo",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
    });
  }
  function cambioTipoCompra() {
    setTipocompra(!tipoCompra);
  }

  const productCompra = JSON.parse(localStorage.getItem("compraJSON"));
  const totalcompra = () => {
    let total = 0;
    productCompra?.map((produc) => {
      total += parseFloat(produc.total);
    });
    return total.toFixed(2);
  };

  function mostrarProductos(resultados) {
    try {
      return resultados?.map((product) => (
        <DescriptionCompraProduct
          descrption={product.nombre}
          precio={product.total}
        />
      ));
    } catch (error) {
      return <div>No se pudieron cargar los productos</div>;
    } finally {
    }
  }

  return (
    <div className="contentCompraPedidos">
      <div>
        <div>
          <h2>Información del cliente</h2>
          <form>
            <div>
              <input type="text" placeholder="Nombre" id="compraInputNombre" />
              <input
                type="email"
                placeholder="Correo Electrónico"
                id="compraInputCorreo"
              />
              <input
                type="text"
                placeholder="Teléfono"
                id="compraInputtelefono"
              />
              <div className="contentcheck">
                <input type="checkbox" id="checkFiscal" />

                <label>Desea Factura de Crédito Fiscal</label>
              </div>
            </div>
            <div>
              <h3>Metodo de pago</h3>
              <input
                type="radio"
                name="metodoPago"
                id="radioCredito"
                value="credito"
                checked={tipoCompra ? false : true}
                onClick={cambioTipoCompra}
              />
              <label for="radioCredito">Tarjeta de Crédito</label>
              <br />
              <input
                type="radio"
                name="metodoPago"
                id="efectivo"
                value="efectivo"
                checked={tipoCompra ? true : false}
                onClick={cambioTipoCompra}
              />
              <label for="efectivo">Efectivo</label>
            </div>
          </form>
        </div>
        <div>
          <h2>Resumen de la compra</h2>
          <table id="tablaCompra" className="tableCompra">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {mostrarProductos(productCompra)}

              <tr>
                <td>Subtotal</td>
                <td>${totalcompra()}</td>
              </tr>
              <tr>
                <td>total</td>
                <td>${totalcompra()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {tipoCompra ? (
          false
        ) : (
          <div>
            <h2>Datos para su compra</h2>
            <div className="contentInputTarjeta">
              <input
                type="number"
                maxLength={16}
                placeholder="000000000000000"
                id="compraInputnumero"
              />
              <input
                type="text"
                placeholder="Nombre de tarjeta"
                id="compraInputNombreT"
              />
              <input
                type="text"
                placeholder="Fecha de expiracion 01/26"
                id="CompraFechaex"
              />
              <input type="number" placeholder="CVV/CVC" id="cvv_cvc" />
            </div>
          </div>
        )}

        {tipoCompra ? false : <div></div>}

        <div>
          <ButtonActionProduc
            status={"pagoProduct"}
            text={"Finalizar Compra"}
            Click={recoleccionData}
          />
        </div>
      </div>
    </div>
  );
}
export default LayoutCompraPedido;
