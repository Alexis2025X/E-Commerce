import viteLogo from "/vite.svg";
import ProductoDescripcion from "../../componentes/ProductoDescripcion/ProductoDescripcion";
import PreciosComprar from "../../componentes/PreciosComprar/PreciosComprar";
import "../ProductoDetallado/ProductoDetallado.css";
import ReseñaProductDetalles from "../../componentes/ReseñaProductDetalles/ReseñaProductDetalles";
import { useEffect, useState } from "react";
import ZoomImage from "../ZoomImage/ZoomImage";
import ButtonEditar from "../ButtonEditar/ButtonEditar";
import StardCalificacion from "../StardCalificacion/StardCalificacion";

import ButtonActionProduc from "../ButtonActionProduc/ButtonActionProduc";

import { PostResena } from "../../API/ProductosAPI";
import { obtenerTokenUserLogin } from "../../API/UserAPI";
export function calcularPrecioDescuento(precio, descuento) {
  return (precio - (precio * descuento) / 100).toFixed(2);
}

//EN PROCESO
// function sinDescuento(prop) {
//     if (prop.descuento < 0) {
//         return <PreciosComprar precioDescuento={calcularPrecioDescuento(props.precio, props.descuento)} precio={props.precio} descuento={props.descuento} stock={props.stock} />
//     }
//     else if(prop.descuento > 0){
//         return <EstadoProducto estado="PocasUnidades" text="Pocas Unidades" />
//     }
// }
function ProductoDetallado(props) {
  const [statusImage, setStatusImage] = useState(false);

  const [createReseña, setCreateReseña] = useState(false);

  const [imagenSrcZoom, setimagensrc] = useState("");

  const [calidicacionReseña, setCalificacionReseña] = useState(0);

  const [data_envio, setDataEvio] = useState({})

  function handleCambioCal(event) {
    let nuevaCal = event.target.id;
    if (nuevaCal != "") {
      setCalificacionReseña(nuevaCal);
    }
  }



  function handleZoomImg(srcImage) {
    setimagensrc(srcImage);
    setStatusImage(!statusImage);
  }
  function handleCreateReseña() {
    setCreateReseña(!createReseña);
  }
  const cambioStadozoom = () => {
    setStatusImage(!statusImage);
  };

  function limpiezaData(){
     document.getElementById("tituloReseña").value = "";
     document.getElementById("DescripcionReseña").value ="";
     setCalificacionReseña(0)
  }

  async function handlClickreseñaEnvio() {
    try {
       const tituloReseña = document.getElementById("tituloReseña").value;
    const description = document.getElementById("DescripcionReseña").value;
    let user = ""
    let username =""
       await obtenerTokenUserLogin().then(res => res.json()).then((data) => {user = data.iduser
        username = data.nombre
       })


    const data = {
      userReseña: user,
      userNameReseña: username,
      titulo: tituloReseña,
      descripcion: description,
      valoracion: parseInt(calidicacionReseña),
    };

    if(data.userReseña == "" ||
      data.userNameReseña == ""){
        alert("Requiere iniciar sesion para hacer una reseña")
        return
    }
    if(
      data.userReseña == "" ||
      data.userNameReseña == "" ||
      data.titulo == "" ||
      data.descripcion == "" ||
      data.valoracion == "" 
    ){
        alert("Rellene todos los datos para seguir con la reseña")
        return
    }
   
      const idProduc = props.productID;
      
    const res =   await PostResena(idProduc, data);
      limpiezaData()
    console.log(res)
      alert("La reseña se envio correctamente");
     
    } catch(error) {
      alert("Error al enviar la reseña");
      console.error(error)
    }
  }
  return (
    <>
      {statusImage ? (
        <ZoomImage cambio={cambioStadozoom} img={imagenSrcZoom} />
      ) : null}
      <section className="contentDetallesSection">
        <main className="contentDetalles">
          <div className="infoProducto">
            <h2>{props.nombre}</h2>
            <p>{props.categoria}</p>
            <h2>Marca: {props.marca}</h2>
            <p>{props.modelo}</p>
          </div>
          <div className="imgProducto">
            <img
              onClick={() => {
                handleZoomImg(props.imagen);
              }}
              src={props.imagen}
              alt="Producto"
            />
          </div>
          <div className="contentImageSec">
            <img
              onClick={() => {
                handleZoomImg(props.imagen2);
              }}
              src={props.imagen2}
              alt="Producto"
            />
            <img
              onClick={() => {
                handleZoomImg(props.imagen3);
              }}
              src={props.imagen3}
              alt="Producto"
            />
          </div>
        </main>
        <main className="calificacionPrecio">
          <PreciosComprar
            StardCalificacion={props.StardCalificacion}
            producID={props.productID}
            precioDescuento={calcularPrecioDescuento(
              props.precio,
              props.descuento
            )}
            precio={props.precio}
            descuento={props.descuento}
            stock={props.stock}
          />
        </main>
      </section>
      {/*  */}
      <section className="contentDescripcionSection">
        <main className="contentDescripcion">
          <div>
            <ProductoDescripcion
              nombreCompleto={props.nombre}
              descripcion={props.descripcion}
            />
          </div>
        </main>
        <main className="contentEspecificaciones">
          <h2>Especificaciones</h2>
          <div className="especificaciones-mouse">{props.especificaciones}</div>
        </main>
        <main className="contentReseña">
          <section className="contentReseñaText">
            <h2>Reseñas</h2>
            <ButtonEditar
              event={handleCreateReseña}
              textEdit={createReseña ? "Cancelar reseña" : "Escribir reseña"}
            />
          </section>
          <div>
            <ReseñaProductDetalles
              titulo={"Buen producto"}
              nombre={"jimmy 🏳️‍🌈"}
              calificacion={15}
              reseña={
                "Holi solo quiero decirle a la gente que hizo este esta tienda que esemause esta muy precioso, gracias por pensar en nosotros los quiero, besitos 😚💅"
              }
            />
          </div>
        </main>
        {createReseña ? (
          <div className="createReseña">
            <div className="contentStartReseña">
              <StardCalificacion
                puntero={true}
                event={handleCambioCal}
                tamaño={25}
                count={calidicacionReseña}
              />
            </div>
            <div className="contentInput">
              <div>
                <label htmlFor="tituloReseña">Titulo</label>
                <input type="text" maxLength={20} id="tituloReseña" placeholder="Escribe algo" />
              </div>

              <div>
                <label htmlFor="DescripcionReseña">Descripción</label>
                <input type="text" id="DescripcionReseña"  placeholder="Escribe algo"/>
              </div>
            </div>
            <br />

            <ButtonActionProduc
              status={"ActionActivo"}
              text={"Enviar reseña"}
              Click={handlClickreseñaEnvio}
            />
          </div>
        ) : null}
      </section>
    </>
  );
}
export default ProductoDetallado;
