import { useEffect, useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './Productos.css'

import CardCategoria from '../../componentes/CardCategoria/CardCategoria'

import CardProduct from '../../componentes/CardProduct/CardProduct'
import ButtonContactUser from '../../componentes/ButtonContactUser/ButtonContactUser'
import { useNavigate } from 'react-router-dom'
import { obtenerProductos } from '../../API/ProductosAPI'
import Header from '../../componentes/Header/Header'

import nuevo from '../../assets/img/nuevo.png'
import promo from '../../assets/img/promo.png'
import vendido from '../../assets/img/vendido.png'
import DetallesLayout from '../DetallesLayout/DetallesLayout'
import HamburguerMenu from '../../componentes/HamburguerMenu/HamburguerMenu'
// const [productos, setProductos] = useState([])


function Productos() {    

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleProducto = (id) =>{
        navigate(`/app/productos/producto/${id}`)
    }
  const [search, setSearch] = useState("")
  
  const searcher = (e) =>{
  setSearch(e.target.value)
  }
  let resultados = []
  try {
  if(!search){
    resultados = products
  }else{
      resultados = products.filter((dato) =>
      dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()) ||
      dato.categoria.toLowerCase().includes(search.toLocaleLowerCase()) ||
      dato.marca.toLowerCase().includes(search.toLocaleLowerCase())
      )
  }

  }catch(error){
    console.log("Error al realizar la busqueda")
  }
  const sinResultados = () =>{
  if (resultados.length === 0) {
      return <div className='resuls'>No hay resultados para su busqueda</div>;
    }
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
    <Header search={search} searcher={searcher}/>
    <HamburguerMenu />
    <main className='mainConteiner'>
      
      
      <div className="contentCat">
      <CardCategoria src = {promo} alt = "Promociones" />
      <CardCategoria src = {nuevo} alt = "Lo nuevo" />
      <CardCategoria src = {vendido} alt = 'Lo más vendido' />
      </div>

      <h2 className='subtituloProductos'>Productos</h2>
      <div className="contentProduct">
      {resultados.map((product) => (
      <CardProduct key={product._id || product.id} click={ () => handleProducto(product._id || product.id)} src = {product.imagenUrl} description = {product.nombre} precio = {product.precio} />
      ))}
      {Loading(loading)}
      {sinResultados()}
      </div>
    </main>
    </>
  )
}

export default Productos
