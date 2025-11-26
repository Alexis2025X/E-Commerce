import "./FrameAgregarProducto.css";
import { InputForm } from "../../componentes/InputForm/InputForm";
import ButtonActionProduc from "../ButtonActionProduc/ButtonActionProduc";
import { useState } from "react";
import { crearProduct } from "../../API/ProductosAPI";
import imageCompression from 'browser-image-compression';
import Swal from 'sweetalert2';

function FrameAgregarProducto() {
  const [textImg, setTextImage] = useState("");

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
    console.log(dataProduc);
  }

  const handleSubmitProducto = async (event) => {
    event.preventDefault();
    try {
      const res = await crearProduct(dataProduc);
      const data = res.json();
      if (res.status === 201) {
        //alert("Producto guardado con exito");
        Swal.fire({
          title: "Producto creado con exito",
          text: "¡El producto ha sido creado correctamente!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar"
        });
      }
    } catch (error) {
      console.error("Producto no creado", error);
      //alert("Error al crear el producto intentelo nuevamente");
      Swal.fire({
        title: "Error al crear el producto",
        text: "Ocurrio un error, intentelo nuevamente: " + error,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar"
      });
    }
    resetStatusForm();
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

  return (
    <div className="contenedorAdminProductos">
      <h2 className="titleAgregar">Agregar Producto</h2>
      <h2>Información Principal</h2>
      <div className="contentPricipales">
        <div>
          <InputForm
            data={"nombre"}
            event={handleChaneValue}
            name={"inputAgregarProducto"}
            label={"Nombre del producto"}
          />
          <InputForm
            data={"categoria"}
            event={handleChaneValue}
            name={"inputAgregarProducto"}
            label={"Categoria"}
          />
        </div>
        <div>
          <InputForm
            data={"marca"}
            event={handleChaneValue}
            name={"inputAgregarDatos"}
            label={"Marca"}
          />
          <InputForm
            data={"modelo"}
            event={handleChaneValue}
            name={"inputAgregarDatos2"}
            label={"Modelo"}
          />
        </div>
      </div>
      <h2>Visuales</h2>
      <div className="visibles">
        <h4>Imagenes del producto</h4>
        <div className="contentInputImage">
          <input
            type="file"
            onChange={handleImageText}
            id="archivo_subir"
            name="imagenUrl"
            className="subirImagenes"
          />
          <input
            type="file"
            onChange={handleImageText}
            id="archivo_subir1"
            name="imagenUrl1"
            className="subirImagenes"
          />
          <input
            type="file"
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
            event={handleChaneValue}
            name={"inputAgregarDatos"}
            label={"Precio(USD)"}
            type={"number"}
          />
          <InputForm
            data={"descuento"}
            event={handleChaneValue}
            name={"inputAgregarDatos"}
            label={"Descuento(%)"}
          />
          <InputForm
            data={"stock"}
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
            event={handleChaneValue}
            name={"inputAgregarProducto"}
            label={"Descripción breve"}
          />
          <InputForm
            data={"especificaciones"}
            event={handleChaneValue}
            name={"inputAgregarProducto"}
            label={"Descripción completa / Especificaciones"}
          />
        </div>
        <div>
          <InputForm
            data={"detallesFisicos"}
            event={handleChaneValue}
            name={"inputAgregarDatos"}
            label={"Peso / dimenciones"}
          />
          <InputForm
            data={"paisOrigen"}
            event={handleChaneValue}
            name={"inputAgregarDatos2"}
            label={"País de origen"}
          />
        </div>
      </div>
      <div className="contentButonAdmin">
        <ButtonActionProduc Click={resetStatusForm} text={"Cancelar"} />
        <ButtonActionProduc
          Click={handleSubmitProducto}
          text={"Guardar"}
          status={"ActionActivo"}
        />
      </div>
    </div>
  );
}

export default FrameAgregarProducto;
