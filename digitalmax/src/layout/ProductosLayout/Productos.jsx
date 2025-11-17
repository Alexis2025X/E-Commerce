import { useEffect, useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './Productos.css'

import CardCategoria from '../../componentes/CardCategoria/CardCategoria'

import CardProduct from '../../componentes/CardProduct/CardProduct'
import ButtonContactUser from '../../componentes/ButtonContactUser/ButtonContactUser'
import { useNavigate } from 'react-router-dom'
import { obtenerProductos } from '../../API/ProductosAPI'

import nuevo from '../../assets/img/nuevo.png'
import promo from '../../assets/img/promo.png'
import vendido from '../../assets/img/vendido.png'
import DetallesLayout from '../DetallesLayout/DetallesLayout'
function Productos() {    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleProducto = (id) =>{
        navigate(`/app/productos/producto/${id}`)
    }


useEffect(() => {

    const fetchProducts = async () => {
    try {
      setLoading(true);
      // Usamos fetchAllProducts para obtener todos los productos
      const fetchedProducts = await obtenerProductos();
      //console.log("Fetched products:", fetchedProducts);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
     // console.log("Se cargaron los productos correctamente.");
    }
  };
  fetchProducts();
}, [] ) ;
  const Loading = (loading) =>{
      if (loading === true){
        return <div>Cargando productos...</div>;
        
    }
  }
  

  return (
    
    <>
    <main className='mainConteiner'>
      
      
      <div className="contentCat">
      <CardCategoria src = {promo} alt = "Promociones" />
      <CardCategoria src = {nuevo} alt = "Lo nuevo" />
      <CardCategoria src = {vendido} alt = 'Lo más vendido' />
      </div>

      <h2 className='subtituloProductos'>Productos</h2>
      <div className="contentProduct">
      {products.map((product) => (
      <CardProduct key={product._id || product.id} click={ () => handleProducto(product._id || product.id)} src = {product.imagenUrl} description = {product.nombre} precio = {product.precio} />
      ))}
      {Loading(loading)}
      </div>
    </main>
    </>
  )
}

export default Productos
