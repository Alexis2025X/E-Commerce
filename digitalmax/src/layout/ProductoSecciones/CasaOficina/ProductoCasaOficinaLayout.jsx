import { useEffect, useState } from 'react'
import './ProductoCasaOficinaLayout.css'

import CardCategoria from '../../../componentes/CardCategoria/CardCategoria'

import CardProduct from '../../../componentes/CardProduct/CardProduct'
import { useNavigate } from 'react-router-dom'
import { obtenerProductos } from '../../../API/ProductosAPI'
import Header from '../../../componentes/Header/Header'

// import nuevo from '../../../assets/img/nuevo.png'
// import promo from '../../../assets/img/promo.png'
// import vendido from '../../../assets/img/vendido.png'
import HamburguerMenu from '../../../componentes/HamburguerMenu/HamburguerMenu'
// const [productos, setProductos] = useState([])


function ProductoCasaOficinaLayout() {    

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleProducto = (id) =>{
        navigate(`/app/productos/producto/casa-oficina/${id}`)
        //navigate(`/app/productos/producto/Telefonos/${id}`)
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
  function productoCategory(products) {
    const categoriaSeccion = products.filter((filtro) => filtro.categoria === 'Casa y Oficina' || filtro.categoria === 'casa y oficina' );
    if (!categoriaSeccion || categoriaSeccion.length === 0) {
      console.log("No hay productos disponibles para filtrar.");
      return <div>No hay productos disponibles para filtrar.</div>;

    }else{
      return categoriaSeccion;
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
}, [] ) ;
  const Loading = (loading) =>{
      if (loading === true){
        return <div>Cargando productos...</div>;
        
    }
  }
  function mostrarProductos(resultados){
    try{
    return resultados?.map((product) => (
      <CardProduct key={product._id || product.id} click={ () => handleProducto(product._id || product.id)} src = {product.imagenUrl} description = {product.nombre} precio = {product.precio} />
      ))
    }catch(error){
      //console.log("Error al mostrar los productos")
      return <div>No se pudieron cargar los productos</div>
    }finally{
      //console.log("Productos mostrados correctamente")
    }
  }


  return (
    
    <>
    <Header search={search} searcher={searcher}/>
    <HamburguerMenu />
    <main className='mainConteiner'>

      <h2 className='subtituloProductos'>¡Espacios inteligentes! <br /> Todo para hacer de tu hogar y oficina lugares más eficientes.</h2>
      <div>
      {Loading(loading)}
      {sinResultados()}
      </div>
      <div className="contentProduct">
          { mostrarProductos(resultados)}

      </div>
    </main>
    </>
  )
}

export default ProductoCasaOficinaLayout
