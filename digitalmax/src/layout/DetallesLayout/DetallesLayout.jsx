import ProductoDescripcion from '../../componentes/ProductoDescripcion/ProductoDescripcion';
import PreciosComprar from '../../componentes/PreciosComprar/PreciosComprar';
import '../DetallesLayout/DetallesLayout.css'
import ReseñaProductDetalles from '../../componentes/ReseñaProductDetalles/ReseñaProductDetalles';
import { useEffect, useState } from 'react';
import ProductoDetallado from '../../componentes/ProductoDetallado/ProductoDetallado.jsx';
import { obtenerProducto } from '../../API/ProductosAPI.js';
import { useParams } from 'react-router-dom';

function DetallesLayout() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // Usamos fetchAllProduct para obtener un producto
                const fetchedProduct = await obtenerProducto(id);
                setProduct(fetchedProduct);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const Loading = (loading) => {
        if (loading === true) {
            return <div>Cargando producto...</div>;

        }
    }
    return (
        <>
            {Loading(loading)}
            <ProductoDetallado productoSelect = {product}  resenas = {product.resena}  productID={product._id} imagen={product.imagenUrl} imagen2={product.imagenUrl1} imagen3={product.imagenUrl2} nombre={product.nombre} categoria={product.categoria} marca={product.marca} modelo={product.modelo} precioDes={product.precio} precio={product.precio} descuento={product.descuento} stock={product.stock} descripcion={product.descripcion} especificaciones={product.especificaciones} />
        </>
    );
}
export default DetallesLayout;