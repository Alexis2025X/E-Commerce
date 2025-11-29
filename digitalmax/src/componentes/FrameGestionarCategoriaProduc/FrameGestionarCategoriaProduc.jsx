import "./FrameGestionarCategoriaProduc.css";
import computo from '../../assets/img/nuevo.png'
import telefono from '../../assets/img/dispositivos_moviles.png'
import audio from '../../assets/img/audio.png'
import cables from '../../assets/img/cables.png'
import seguridad from '../../assets/img/seguridad.png'
import casa_oficina from '../../assets/img/casa_oficina.png'
import redes from '../../assets/img/redes.png'
import CardCatConteinerAdmin from "../CardCategoriaAdmin/CardCategoriaAdmin";
import { useState } from "react";
import FrameGestionarProducto from "../FrameGestionarProducto/FrameGestionarProducto";

function FrameGestionarCategoriaProduc(prop) {
    //console.log("Estado recibido en FrameGestionarCategoriaProduc:", prop.estado);
    const [seccionProducto, setseccionProducto] = useState(false);
    const [titulo, setTitulo] = useState("")
    const [categoria, setCategoria] = useState("")


    //setseccionProducto(prop.estado);
    function handleCambioFrame(event) {
        const seleccion = event.target.innerHTML
        switch (seleccion) {
            case "Gestionar Producto":
                console.log("Regresando a gestionar productos");
                setseccionProducto(false);
                setTitulo("");
                setCategoria("");
                break;
            case "Dispositivos moviles":
                setTitulo("Dispositivos Moviles");
                setCategoria("Dispositivos Moviles");
                setseccionProducto(true);
                break;
            //SetFrame(<FrameGestionarProducto/>)
            //break
            case "Computación":
                setTitulo("Computo");
                setCategoria("Computo");
                setseccionProducto(true);
                <div>Cargando...</div>
                break;
            //break
            case "Audio":
                setTitulo("Audio");
                setCategoria("Audio");
                setseccionProducto(true);
                break;
            //break
            case "Cables":
                setTitulo("Cables");
                setCategoria("Cables");
                setseccionProducto(true);
                <div>Cargando...</div>
                break;
            //break
            case "Seguridad":
                setTitulo("Seguridad");
                setCategoria("Seguridad");
                setseccionProducto(true);
                break;
            //break
            case "Casa y Oficina":
                setTitulo("Casa y Oficina");
                setCategoria("Casa y Oficina");
                setseccionProducto(true);
                break;
            //break
            case "Redes":
                setTitulo("Redes");
                setCategoria("Redes");
                setseccionProducto(true);
                <div>Cargando...</div>
                break;
            //break

            default:
                setseccionProducto(prop.atras);
                setTitulo("");
                setCategoria("");

        }
    }

    function mostrarFrame(Titulo, Categoria) {
        if (seccionProducto === true) {
            <div>Cargando productos....</div>
            return <FrameGestionarProducto titulo={Titulo} categoria={Categoria} regresar={prop.atras} />
        } else {
            //console.log(seccionProducto);
            return <>
                <main className='mainConteiner-admin'>
                    <h2 className="titleGestionar">Gestionar productos</h2>
                    <div className="contentCat-admin">
                        <CardCatConteinerAdmin link={handleCambioFrame} src={telefono} alt="Dispositivos moviles" />
                        <CardCatConteinerAdmin link={handleCambioFrame} src={computo} alt="Computación" />
                        <CardCatConteinerAdmin link={handleCambioFrame} src={audio} alt='Audio' />
                        <CardCatConteinerAdmin link={handleCambioFrame} src={cables} alt='Cables' />
                        <CardCatConteinerAdmin link={handleCambioFrame} src={seguridad} alt='Seguridad' />
                        <CardCatConteinerAdmin link={handleCambioFrame} src={casa_oficina} alt='Casa y Oficina' />
                        <CardCatConteinerAdmin link={handleCambioFrame} src={redes} alt='Redes' />
                    </div>
                </main>
            </>
        }
    }
    return (
        <>
            {mostrarFrame(titulo, categoria)}
        </>
    );
}

export default FrameGestionarCategoriaProduc;
