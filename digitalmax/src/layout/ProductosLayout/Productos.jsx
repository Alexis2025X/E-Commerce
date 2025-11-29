import { useEffect, useState } from 'react'
import './Productos.css'
import CardCategoria from '../../componentes/CardCategoria/CardCategoria'
import CardProduct from '../../componentes/CardProduct/CardProduct'
import { useNavigate } from 'react-router-dom'
import { obtenerProductos } from '../../API/ProductosAPI'
import Header from '../../componentes/Header/Header'

import computo from '../../assets/img/nuevo.png'
import telefono from '../../assets/img/dispositivos_moviles.png'
import audio from '../../assets/img/audio.png'
import cables from '../../assets/img/cables.png'
import seguridad from '../../assets/img/seguridad.png'
import casa_oficina from '../../assets/img/casa_oficina.png'
import redes from '../../assets/img/redes.png'
import ChatButtons from '../../componentes/ChatButtons/ChatButtons';
// const [productos, setProductos] = useState([])


function Productos() {    
    const categoriaTelefono = () =>{
        navigate(`/dispositivos-moviles`)
    }
    const categoriaComputadora = () =>{
        navigate(`/computo`)
    }
    const marca = () =>{
        navigate(`/marcas`)
    }
    const categoriaAudio = () =>{
        navigate(`/audio`)
    }
    const categoriaCables = () =>{
        navigate(`/cables`)
    }
    const categoriaSeguridad = () =>{
        navigate(`/seguridad`)
    }
    const categoriaCasa_oficina = () =>{
        navigate(`/casa-oficina`)
    }
    const categoriaRedes = () =>{
        navigate(`/redes`)
    }

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
  function mostrarProductos(resultados){
    try{
    return resultados.map((product) => (
      <CardProduct key={product._id || product.id} click={ () => handleProducto(product._id || product.id)} src = {product.imagenUrl} description = {product.nombre} precio = {product.precio} />
      ))
    }catch(error){
      console.log("Error al mostrar los productos")
      return <div>No se pudieron cargar los productos</div>
    }finally{
      console.log("Productos mostrados correctamente")
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
    {/* <HamburguerMenu /> */}
    <main className='mainConteiner'>
      
      
      <div className="contentCat">
      <CardCategoria link={categoriaTelefono} src = {telefono} alt = "Dispositivos moviles" />
      <CardCategoria link={categoriaComputadora} src = {computo} alt = "Computación" />
      <CardCategoria link={categoriaAudio} src = {audio} alt = 'Audio' />
      <CardCategoria link={categoriaCables} src = {cables} alt = 'Cables' />
      <CardCategoria link={categoriaSeguridad} src = {seguridad} alt = 'Seguridad' />
      <CardCategoria link={categoriaCasa_oficina} src = {casa_oficina} alt = 'Casa y Oficina' />
      <CardCategoria link={categoriaRedes} src = {redes} alt = 'Redes'/>
      {/* <CardCategoria src = {promo} alt = "Promociones" />
      <CardCategoria src = {nuevo} alt = "Lo nuevo" />
      <CardCategoria src = {vendido} alt = 'Lo más vendido' /> */}
      </div>

      <h2 className='subtituloProductos'>Productos</h2>
      <div>
      
      {Loading(loading)}
      {sinResultados()}        
      </div>
      <ChatButtons/>
      <div className="contentProduct">
      {products.map((product) => (
      <CardProduct  key={product._id || product.id} click={ () => handleProducto(product._id || product.id)} src = {product.imagenUrl} description = {product.nombre} precio = {product.precio} />
      ))}
      {Loading(loading)}
      </div>
    </main>
    </>
  )
}

export default Productos
