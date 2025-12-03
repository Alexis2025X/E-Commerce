import "./FrameGestionarProducto.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, use } from "react";
import { obtenerProductos } from "../../API/ProductosAPI";
import { eliminarProducto } from "../../API/ProductosAPI";
import CardProductAdmin from "../CardProductAdmin/CardProductAdmin";
import FrameGestionarCategoriaProduc from "../FrameGestionarCategoriaProduc/FrameGestionarCategoriaProduc";
import flecha from '../../assets/img/flecha-izquierda.svg'
import Swal from 'sweetalert2';

function FrameGestionarProducto(prop) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seccionProducto, setseccionProducto] = useState(true);
    const navigate = useNavigate();
    //const [confirmacion, setConfirmacion] = useState(false)
    const handleProducto = (id) => {
        //console.log(id)
        //setConfirmacion(true)
        eliminar(id)

        return
        //navigate(`/app/productos/producto/dispositivos-moviles/${id}`)
        //navigate(`/app/productos/producto/Telefonos/${id}`)
    }

    async function eliminar(id) {
        const result = await Swal.fire({
            title: "Alerta",
            text: "¿Esta seguro que desea eliminar el producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo"

        });
        if (result.isConfirmed) {
            const respuesta = await eliminarProducto(id)
            //console.log(eliminarProducto(id))
            if (respuesta) {
                Swal.fire({
                    title: "Eliminado",
                    text: "El producto ha sido eliminado",
                    icon: "success",
                    confirmButtonColor: "#3085d6"
                });
                const fetchedProducts = await obtenerProductos();
                setProducts(productoCategory(fetchedProducts));
                return
            } else {
                Swal.fire({
                    title: "Cancelado",
                    text: "El producto no ha sido eliminado",
                    icon: "info",
                    confirmButtonColor: "#3085d6"
                });
            }
        };
    }

    function handleCambioFrame(event) {
        const seleccion = event.target.dataset.action

        switch (seleccion) {
            case "regresar":
                //console.log("Regresando a gestionar categorias");
                setseccionProducto(false);
                break;
        }
    }

    function mostrar() {
        if (seccionProducto === false) {
            return <FrameGestionarCategoriaProduc />
        } else {
            return <>
                <main className='mainConteinerAdmin'>
                    <div className="regresar" onClick={handleCambioFrame} data-action="regresar"><img src={flecha} />Regresar</div>
                    <h2 className='subtituloProductosAdmin'>{prop.titulo}</h2>
                    <div>
                        {Loading(loading)}
                        {/* {sinResultados()} */}
                    </div>
                    <div className="contentProductAdmin">
                        {
                            mostrarProductos(products)
                        }
                    </div>
                </main>
            </>
        }
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

    function productoCategory(products) {
        const categoria = prop.categoria;
        //console.log("Categoria en productoCategory:", categoria);

        const categoriaSeccion = products.filter((filtro) => filtro.categoria === categoria || filtro.categoria == categoria);
        if (!categoriaSeccion || categoriaSeccion.length === 0) {
            console.log("No hay productos disponibles para filtrar.");
            return <div>No hay productos disponibles para filtrar.</div>;

        } else {
            //console.log(categoriaSeccion)

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
                //const data = await response.json();
                setProducts(productoCategory(fetchedProducts));
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
                // console.log("Se cargaron los productos correctamente.");
            }
        };
        fetchProducts();
        //}, [productoCategory]);
        //DEJE ESTE CÓDIGO COMENTADO POR SI ACASO
    }, []);
    const Loading = (loading) => {
        if (loading === true) {
            return <div>Cargando productos...</div>;

        }
    }


    return (<>
        {mostrar()}
    </>
    );
}

export default FrameGestionarProducto;
