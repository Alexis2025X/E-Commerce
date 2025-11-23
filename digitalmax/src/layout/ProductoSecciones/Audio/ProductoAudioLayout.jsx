import { useEffect, useState } from 'react'
import './ProductoAudioLayout.css'

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


function ProductoAudioLayout() {    

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleProducto = (id) =>{
        navigate(`/app/productos/producto/audio/${id}`)
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
    const categoriaSeccion = products.filter((filtro) => filtro.categoria === 'Audio' || filtro.categoria === 'audio' );
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


  return (
    
    <>
    <Header search={search} searcher={searcher}/>
    <HamburguerMenu />
    <main className='mainConteiner'>

      <h2 className='subtituloProductos'>¡Vive cada nota! <br /> Experimenta la calidad de sonido que mereces.</h2>
      <div>
      {Loading(loading)}
      {sinResultados()}
      </div>
      <div className="contentProduct">
      {resultados.map((product) => (
      <CardProduct key={product._id || product.id} click={ () => handleProducto(product._id || product.id)} src = {product.imagenUrl} description = {product.nombre} precio = {product.precio} />
      ))}

      </div>
    </main>
    </>
  )
}

export default ProductoAudioLayout
