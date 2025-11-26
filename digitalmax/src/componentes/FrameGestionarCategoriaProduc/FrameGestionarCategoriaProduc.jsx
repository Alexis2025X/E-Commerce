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
import FrameAgregarProducto from "../FrameAgregarProducto/FrameAgregarProducto";
import { useNavigate } from "react-router-dom";
import FrameGestionarProducto from "../FrameGestionarProducto/FrameGestionarProducto";

function FrameGestionarCategoriaProduc() {
    // const [menuProducto, setMenu] = useState(false)
    // const cambioMenu = () => {
    //     setMenu(!menuProducto)
    // }
    // function handleClickMenuProductos() {
    //     cambioMenu()
    // }
    const [Frame, SetFrame] = useState(<FrameGestionarCategoriaProduc />)
    function handleCambioFrame(event) {
        const seleccion = event.target.innerHTML
        switch (seleccion) {
            case "Dispositivos moviles":
                console.log("Dispositivos moviles seleccionado");
                SetFrame(<FrameGestionarProducto/>)
                break
            case "Computación":
                console.log("Computación seleccionado");
                SetFrame(<FrameGestionarCategoriaProduc />)
                break
            case "Audio":
                console.log("Audio seleccionado");
                SetFrame(<FrameGestionarCategoriaProduc />)
                break
            case "Cables":
                console.log("Cables seleccionado");
                SetFrame(<FrameGestionarCategoriaProduc />)
                break
            case "Seguridad":
                console.log("Seguridad seleccionado");
                SetFrame(<FrameGestionarCategoriaProduc />)
                break
            case "Casa y Oficina":
                console.log("Casa y Oficina seleccionado");
                SetFrame(<FrameGestionarCategoriaProduc />)
                break
            case "Redes":
                console.log("Redes seleccionado");
                SetFrame(<FrameGestionarCategoriaProduc />)
                break

            default:
                SetFrame(<FrameGestionarCategoriaProduc />)

        }
        //setMenu()

    }
    const categoriaTelefono = () => {
        //SetFrame( <FrameGestionarCategoriaProduc/>)
    }
    const categoriaComputadora = () => {
        navigate(`/computo-admin`)
    }
    const marca = () => {
        navigate(`/marcas-admin`)
    }
    const categoriaAudio = () => {
        navigate(`/audio-admin`)
    }
    const categoriaCables = () => {
        navigate(`/cables-admin`)
    }
    const categoriaSeguridad = () => {
        navigate(`/seguridad-admin`)
    }
    const categoriaCasa_oficina = () => {
        navigate(`/casa-oficina-admin`)
    }
    const categoriaRedes = () => {
        navigate(`/redes-admin`)
    }

    return (
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

                {/* {Frame}
                 */}
            </div>
        </main>
    );
}

export default FrameGestionarCategoriaProduc;
