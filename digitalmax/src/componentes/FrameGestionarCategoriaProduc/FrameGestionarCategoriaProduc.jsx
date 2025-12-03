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
        setTitulo("");
        setCategoria("");
        setseccionProducto(false);

        // Pequeño delay para evitar problemas de renderizado
        setTimeout(() => {
            let nuevoTitulo = "";
            let nuevaCategoria = "";
            let mostrarProductos = false;
            switch (seleccion) {
                case "Dispositivos moviles":
                    nuevoTitulo = "Dispositivos Moviles";
                    nuevaCategoria = "Dispositivos Moviles";
                    mostrarProductos= true;
                    break;
                //SetFrame(<FrameGestionarProducto/>)
                //break
                case "Computación":
                    nuevoTitulo = "Computo";
                    nuevaCategoria = "Computo";
                    mostrarProductos= true;
                    break;
                //break
                case "Audio":
                    nuevoTitulo = "Audio";
                    nuevaCategoria = "Audio";
                    mostrarProductos=true;
                    break;
                //break
                case "Cables":
                    nuevoTitulo = "Cables";
                    nuevaCategoria = "Cables";
                    mostrarProductos=true;
                    break;
                //break
                case "Seguridad":
                    nuevoTitulo = "Seguridad";
                    nuevaCategoria = "Seguridad";
                    mostrarProductos=true;
                    break;
                //break
                case "Casa y Oficina":
                    nuevoTitulo = "Casa y Oficina";
                    nuevaCategoria = "Casa y Oficina";
                    mostrarProductos=true;
                    break;
                //break
                case "Redes":
                    nuevoTitulo = "Redes";
                    nuevaCategoria = "Redes";
                    mostrarProductos = true;
                    break;
                //break

                default:
                    mostrarProductos= false;
                    nuevoTitulo = ("");
                    nuevaCategoria = "";
            }
            setTitulo(nuevoTitulo);
            setCategoria(nuevaCategoria);
            setseccionProducto(mostrarProductos);
        }, 5);
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
