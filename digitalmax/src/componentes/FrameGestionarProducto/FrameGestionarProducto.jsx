import "./FrameGestionarProducto.css";
import computo from '../../assets/img/nuevo.png'
import telefono from '../../assets/img/dispositivos_moviles.png'
import audio from '../../assets/img/audio.png'
import cables from '../../assets/img/cables.png'
import seguridad from '../../assets/img/seguridad.png'
import casa_oficina from '../../assets/img/casa_oficina.png'
import redes from '../../assets/img/redes.png'
import CardCatConteinerAdmin from "../CardCategoriaAdmin/CardCategoriaAdmin";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { obtenerProductos } from "../../API/ProductosAPI";
import CardProductAdmin from "../CardProductAdmin/CardProductAdmin";


function FrameGestionarProducto() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleProducto = (id) => {
        navigate(`/app/productos/producto/dispositivos-moviles/${id}`)
        //navigate(`/app/productos/producto/Telefonos/${id}`)
    }
    // const [search, setSearch] = useState("")

    // const searcher = (e) => {
    //     setSearch(e.target.value)
    // }
    // let resultados = []
    // try {
    //     if (!search) {
    //         resultados = products
    //     } else {
    //         resultados = products.filter((dato) =>
    //             dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()) ||
    //             dato.categoria.toLowerCase().includes(search.toLocaleLowerCase()) ||
    //             dato.marca.toLowerCase().includes(search.toLocaleLowerCase())
    //         )
    //     }

    // } catch (error) {
    //     console.log("Error al realizar la busqueda")
    // }
    // const sinResultados = () => {
    //     if (products.length === 0) {
    //         return <div className='resuls'>No hay resultados para su busqueda</div>;
    //     }
    // }
    const seleccion = 0;
    switch (seleccion) {
        case "Dispositivos moviles":
            console.log("Dispositivos moviles seleccionado");
            categoriaSeccion = products.filter((filtro) => filtro.categoria === 'Dispositivos Moviles' || filtro.categoria === 'dispositivos moviles');
            break
        case "Computación":
            console.log("Computación seleccionado");
            categoriaSeccion = products.filter((filtro) => filtro.categoria === 'Computo' || filtro.categoria === 'computo');
            break
        case "Audio":
            console.log("Audio seleccionado");
            categoriaSeccion = products.filter((filtro) => filtro.categoria === 'Audio' || filtro.categoria === 'audio');
            break
        case "Cables":
            console.log("Cables seleccionado");
            categoriaSeccion = products.filter((filtro) => filtro.categoria === 'Cables' || filtro.categoria === 'cables');
            break
        case "Seguridad":
            console.log("Seguridad seleccionado");
            categoriaSeccion = products.filter((filtro) => filtro.categoria === 'Seguridad' || filtro.categoria === 'seguridad');
            break
        case "Casa y Oficina":
            console.log("Casa y Oficina seleccionado");
            categoriaSeccion = products.filter((filtro) => filtro.categoria === 'Casa y oficina' || filtro.categoria === 'casa y oficina');
            break
        case "Redes":
            console.log("Redes seleccionado");
            categoriaSeccion = products.filter((filtro) => filtro.categoria === 'Redes' || filtro.categoria === 'redes');
            break
        default:
    }



    function productoCategory(products) {

        const categoriaSeccion = products.filter((filtro) => filtro.categoria === 'Dispositivos Moviles' || filtro.categoria === 'dispositivos moviles');
        if (!categoriaSeccion || categoriaSeccion.length === 0) {
            console.log("No hay productos disponibles para filtrar.");
            return <div>No hay productos disponibles para filtrar.</div>;

        } else {
            return categoriaSeccion;
        }
    }

    function mostrarProductos(resultados) {
        try {
            return resultados.map((product) => (
                <CardProductAdmin key={product._id || product.id} click={() => handleProducto(product._id || product.id)} src={product.imagenUrl} description={product.nombre} precio={product.precio} />
            ))
        } catch (error) {
            //console.log("Error al mostrar los productos")
            return <div>No se pudieron cargar los productos</div>
        } finally {
            //console.log("Productos mostrados correctamente")
        }
    }

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Usamos fetchAllProducts para obtener todos los productos
                const fetchedProducts = await obtenerProductos();
                setProducts(productoCategory(fetchedProducts));
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
                // console.log("Se cargaron los productos correctamente.");
            }
        };
        fetchProducts();
    }, []);
    const Loading = (loading) => {
        if (loading === true) {
            return <div>Cargando productos...</div>;

        }
    }


    return (
        <>
            <main className='mainConteinerAdmin'>

                <h2 className='subtituloProductosAdmin'>Holaa /Nombre/</h2>
                <div>
                    {Loading(loading)}
                    {/* {sinResultados()} */}
                </div>
                <div className="contentProductAdmin">
                    {
                        // resultados.map((product) => (
                        // <CardProduct key={product._id || product.id} click={ () => handleProducto(product._id || product.id)} src = {product.imagenUrl} description = {product.nombre} precio = {product.precio} />
                        // ))
                        mostrarProductos(products)
                    }
                </div>
            </main>
        </>
    );
}

export default FrameGestionarProducto;
