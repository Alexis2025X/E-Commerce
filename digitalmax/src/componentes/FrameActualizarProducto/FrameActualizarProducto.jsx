import "./FrameActualizarProducto.css";
import { InputForm } from "../InputForm/InputForm";
import ButtonActionProduc from "../ButtonActionProduc/ButtonActionProduc";
import { useState, useRef } from "react";
import { obtenerProducto, modificarProduct } from "../../API/ProductosAPI";
import imageCompression from 'browser-image-compression';
import Swal from 'sweetalert2';
import { useEffect } from 'react'
import flecha from '../../assets/img/flecha-izquierda.svg'
import FrameGestionarProducto from "../FrameGestionarProducto/FrameGestionarProducto";


function FrameActualizarProducto(prop) {
  const [product, setProduct] = useState({});
  const [regresar, setRegresar] = useState(true);
  const [loading, setLoading] = useState(true);
  const llamadoInicial = useRef(false);

  const id = prop.id
  useEffect(() => {
    if (llamadoInicial.current === false) {
      llamadoInicial.current = true;
      const fetchProduct = async () => {
        try {
          setLoading(true);
          // Usamos fetchAllProduct para obtener un producto
          const fetchedProduct = await obtenerProducto(id);
          setDataProduct({
            nombre: fetchedProduct.nombre || "",
            categoria: fetchedProduct.categoria || "",
            marca: fetchedProduct.marca || "",
            modelo: fetchedProduct.modelo || "",
            imagenUrl: fetchedProduct.imagenUrl || "",
            imagenUrl1: fetchedProduct.imagenUrl1 || "",
            imagenUrl2: fetchedProduct.imagenUrl2 || "",
            precio: fetchedProduct.precio || 0,
            descuento: fetchedProduct.descuento || 0,
            stock: fetchedProduct.stock || 0,
            descripcion: fetchedProduct.descripcion || "",
            especificaciones: fetchedProduct.especificaciones || "",
            detallesFisicos: fetchedProduct.detallesFisicos || "",
            paisOrigen: fetchedProduct.paisOrigen || "",
            valoracion: fetchedProduct.valoracion || 3,
          });
          setDataProductAnterior({
            nombre: fetchedProduct.nombre || "",
            categoria: fetchedProduct.categoria || "",
            marca: fetchedProduct.marca || "",
            modelo: fetchedProduct.modelo || "",
            imagenUrl: fetchedProduct.imagenUrl || "",
            imagenUrl1: fetchedProduct.imagenUrl1 || "",
            imagenUrl2: fetchedProduct.imagenUrl2 || "",
            precio: fetchedProduct.precio || 0,
            descuento: fetchedProduct.descuento || 0,
            stock: fetchedProduct.stock || 0,
            descripcion: fetchedProduct.descripcion || "",
            especificaciones: fetchedProduct.especificaciones || "",
            detallesFisicos: fetchedProduct.detallesFisicos || "",
            paisOrigen: fetchedProduct.paisOrigen || "",
            valoracion: fetchedProduct.valoracion || 3,
          });

        } catch (error) {
          console.log("Hubo un error")
        } finally {
          //console.log("Hubo un error")
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);
  //const nombre = product.nombre
  //console.log("Este es el nombre: ", product.nombre)
  //console.log(product)
  // const Loading = (loading) => {
  //   if (loading === true) {
  //     return <div>Cargando producto...</div>;

  //   }
  // }

  function handleCambioFrame(event) {
    const seleccion = event.target.dataset.action

    switch (seleccion) {
      case "regresar":
        //console.log("Regresando a gestionar categorias");
        setRegresar(false);
        break;
    }
  }
  const [dataProducAnterior, setDataProductAnterior] = useState({
    nombre: "",
    categoria: "",
    marca: "",
    modelo: "",
    imagenUrl: " ",
    imagenUrl1: " ",
    imagenUrl2: " ",
    precio: 0,
    descuento: 0,
    stock: 0,
    descripcion: "",
    especificaciones: "",
    detallesFisicos: "",
    paisOrigen: "",
    valoracion: 3,
  });
  //console.log("HOLA ", dataProducAnterior)
  const [dataProduc, setDataProduct] = useState({
    nombre: "",
    categoria: "",
    marca: "",
    modelo: "",
    imagenUrl: " ",
    imagenUrl1: " ",
    imagenUrl2: " ",
    precio: 0,
    descuento: 0,
    stock: 0,
    descripcion: "",
    especificaciones: "",
    detallesFisicos: "",
    paisOrigen: "",
    valoracion: 3,
  });
  //console.log(dataProduc)


  function resetStatusForm() {
    let imagenAntigua = document.getElementById("archivo_subir");
    imagenAntigua.value = "";
    imagenAntigua = document.getElementById("archivo_subir1");
    imagenAntigua.value = "";


    setDataProduct({
      nombre: "",
      categoria: "",
      marca: "",
      modelo: "",
      imagenUrl: " ",
      imagenUrl1: " ",
      imagenUrl2: " ",
      precio: 0,
      descuento: 0,
      stock: 0,
      descripcion: "",
      especificaciones: "",
      detallesFisicos: "",
      paisOrigen: "",
      valoracion: 3,
    });
    let inputsClen = document.querySelectorAll("input");

    inputsClen.forEach((element) => {
      element.value = "";
    });
  }

  function handleChaneValue(event) {
    if (
      event.target.name == "precio" ||
      event.target.name == "descuento" ||
      event.target.name == "stock"
    ) {
      setDataProduct({
        ...dataProduc,
        [event.target.name]: parseFloat(event.target.value),
      });
    } else {
      setDataProduct({
        ...dataProduc,
        [event.target.name]: event.target.value,
      });
    }
    //console.log(dataProduc);
  }

  function cancelar() {
      setDataProduct(dataProducAnterior);
  }

  const handleSubmitProducto = async (event) => {
    if (dataProduc.nombre === dataProducAnterior.nombre && dataProduc.categoria === dataProducAnterior.categoria && dataProduc.marca === dataProducAnterior.marca && dataProduc.modelo === dataProducAnterior.modelo && dataProduc.imagenUrl === dataProducAnterior.imagenUrl && dataProduc.imagenUrl1 === dataProducAnterior.imagenUrl1 && dataProduc.imagenUrl2 === dataProducAnterior.imagenUrl2 && dataProduc.precio === dataProducAnterior.precio && dataProduc.descuento === dataProducAnterior.descuento && dataProduc.stock === dataProducAnterior.stock && dataProduc.descripcion === dataProducAnterior.descripcion && dataProduc.especificaciones === dataProducAnterior.especificaciones && dataProduc.detallesFisicos === dataProducAnterior.detallesFisicos && dataProduc.paisOrigen === dataProducAnterior.paisOrigen && dataProduc.valoracion === dataProducAnterior.valoracion) {
      Swal.fire({
        title: "Advertencia",
        text: "¡No haz modificado el producto!",
        icon: "info",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar"
      });
    } else {
      event.preventDefault();
      try {
        const res = await modificarProduct(id, dataProduc);

        if (res) {
          //alert("Producto guardado con exito");
          Swal.fire({
            title: "Producto ha sido modificado",
            text: "¡El producto ha sido modificado correctamente!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar"
          });
          setDataProductAnterior(dataProduc)
        }
      } catch (error) {
        console.error("Producto no modificado", error);
        //alert("Error al crear el producto intentelo nuevamente");
        Swal.fire({
          title: "Error al crear el modificado",
          text: "Ocurrio un error, intentelo nuevamente: " + error,
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar"
        });
      }
      //resetStatusForm();
    }
  };

  async function handleImageText(event) {
    const options = {
      maxSizeMB: 0.01,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    let dataImageCompress = '';
    const image = await imageCompression(event.target.files[0], options).then((data) => { dataImageCompress = data })
    console.log(event.target.files[0])
    console.log(image)

    const lector = new FileReader();
    lector.onload = () => {
      setDataProduct({ ...dataProduc, [event.target.name]: lector.result });
    };
    lector.readAsDataURL(dataImageCompress);
  }
  //console.log("Si llegue patron", prop.id)


  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       setLoading(true);
  //       // Usamos fetchAllProduct para obtener un producto
  //       const fetchedProduct = await obtenerProducto(id);
  //       setProduct(fetchedProduct);
  //     } catch (error) {
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProduct();
  // }, [id]);

  function mostrar() {
    if (regresar === false) {
      const Titulo = prop.titulo
      const Categoria = prop.categoria
      return <FrameGestionarProducto titulo={Titulo} categoria={Categoria} />
    } else {
      return <>
        <div className="contenedorAdminProductos">
          <div className="regresar" onClick={handleCambioFrame} data-action="regresar"><img src={flecha} />Regresar</div>
          <h2 className="titleAgregar">Modificar Producto</h2>
          <h2>Información Principal</h2>
          <div className="contentPricipales">
            <div>
              <InputForm
                data={"nombre"}
                texto={dataProduc.nombre}
                event={handleChaneValue}
                name={"inputAgregarProducto"}
                label={"Nombre del producto"}
              />
              <InputForm
                data={"categoria"}
                texto={dataProduc.categoria}
                event={handleChaneValue}
                name={"inputAgregarProducto"}
                label={"Categoria"}
              />
            </div>
            <div>
              <InputForm
                data={"marca"}
                texto={dataProduc.marca}
                event={handleChaneValue}
                name={"inputAgregarDatos"}
                label={"Marca"}
              />
              <InputForm
                data={"modelo"}
                texto={dataProduc.modelo}
                event={handleChaneValue}
                name={"inputAgregarDatos2"}
                label={"Modelo"}
              />
            </div>
          </div>
          <h2>Visuales</h2>
          <div className="visibles">
            <h4 className="titulo_img">Imagenes del producto</h4>
            <div className="content_img">
              <img className="imagenProducto" src={dataProduc.imagenUrl} alt="Imagen 1" />
              <img className="imagenProducto" src={dataProduc.imagenUrl1} alt="Imagen 2" />
              <img className="imagenProducto" src={dataProduc.imagenUrl2} alt="Imagen 3" />
            </div>
            <div className="contentInputImage">
              <input
                type="file"
                texto={dataProduc.imagenUrl}
                onChange={handleImageText}
                id="archivo_subir"
                name="imagenUrl"
                className="subirImagenes"
              />
              <input
                type="file"
                texto={dataProduc.imagenUrl1}
                onChange={handleImageText}
                id="archivo_subir1"
                name="imagenUrl1"
                className="subirImagenes"
              />
              <input
                type="file"
                texto={dataProduc.imagenUrl2}
                onChange={handleImageText}
                id="archivo_subir2"
                name="imagenUrl2"
                className="subirImagenes"
              />

            </div>
          </div>
          <h2>Información Comercial</h2>
          <div className="contentComercial">
            <div>
              <InputForm
                data={"precio"}
                texto={dataProduc.precio}
                event={handleChaneValue}
                name={"inputAgregarDatos"}
                label={"Precio(USD)"}
                type={"number"}
              />
              <InputForm
                data={"descuento"}
                texto={dataProduc.descuento}
                event={handleChaneValue}
                name={"inputAgregarDatos"}
                label={"Descuento(%)"}
              />
              <InputForm
                data={"stock"}
                texto={dataProduc.stock}
                event={handleChaneValue}
                name={"inputAgregarDatos"}
                label={"Categoria(Stock / disponible)"}
              />
            </div>
          </div>
          <h2>Descripción Comercial</h2>
          <div className="contentPricipales">
            <div>
              <InputForm
                data={"descripcion"}
                texto={dataProduc.descripcion}
                event={handleChaneValue}
                name={"inputAgregarProducto"}
                label={"Descripción breve"}
              />
              <InputForm
                data={"especificaciones"}
                texto={dataProduc.especificaciones}
                event={handleChaneValue}
                name={"inputAgregarProducto"}
                label={"Descripción completa / Especificaciones"}
              />
            </div>
            <div>
              <InputForm
                data={"detallesFisicos"}
                texto={dataProduc.detallesFisicos}
                event={handleChaneValue}
                name={"inputAgregarDatos"}
                label={"Peso / dimensiones"}
              />
              <InputForm
                data={"paisOrigen"}
                texto={dataProduc.paisOrigen}
                event={handleChaneValue}
                name={"inputAgregarDatos2"}
                label={"País de origen"}
              />
            </div>
          </div>
          <div className="contentButonAdmin">
            <ButtonActionProduc Click={cancelar} text={"Cancelar"} />
            <ButtonActionProduc
              Click={handleSubmitProducto}
              text={"Guardar"}
              status={"ActionActivo"}
            />
          </div>
        </div>
      </>
    }
  }

  return (
    <>
      {mostrar()}
    </>
  );
}

export default FrameActualizarProducto;
