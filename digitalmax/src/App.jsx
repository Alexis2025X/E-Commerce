import { use, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LayoutPadre from './layout/LayoutPadre.jsx'
import Productos from './layout/ProductosLayout/Productos'
import HamburguerMenu from './componentes/HamburguerMenu/HamburguerMenu'
import Header from './componentes/Header/Header'
import DetallesLayout from './layout/DetallesLayout/DetallesLayout'
import ButtonContactUser from './componentes/ButtonContactUser/ButtonContactUser'
import viteLogo from '/vite.svg'
import LayoutCrearCuenta from './layout/LayoutCrearCuenta/LayoutCrearCuenta.jsx'
import ProductosLayout from './layout/ProductosLayout/Productos.jsx'
import LayoutMenuHamburguesa from './layout/LayoutMenuHamburguesa.jsx'
import LoginLayout from './layout/LoginLayout/LoginLayout.jsx'
import AdminPanel from './layout/AdminPanel/AdminPanel.jsx'
import { obtenerProducto } from './API/ProductosAPI.js'
import layouCarritoCompra from './layout/LayoutCarritoCompra/LayoutCarritoCompra.jsx'
import LayoutCarritoCompra from './layout/LayoutCarritoCompra/LayoutCarritoCompra.jsx'
import ProductoDispositivosMovilesLayout from './layout/ProductoSecciones/DispositivosMoviles/ProductoDispositivosMovilesLayout.jsx'
import ProductoComputoLayout from './layout/ProductoSecciones/Computo/ProductoComputoLayout.jsx'
import ProductoCablesLayout from './layout/ProductoSecciones/Cables/ProductoCablesLayout.jsx'
import ProductoAudioLayout from './layout/ProductoSecciones/Audio/ProductoAudioLayout.jsx'
import ProductoSeguridadLayout from './layout/ProductoSecciones/Seguridad/ProductoSeguridadLayout.jsx'
import ProductoCasaOficinaLayout from './layout/ProductoSecciones/CasaOficina/ProductoCasaOficinaLayout.jsx'
import ProductoRedesLayout from './layout/ProductoSecciones/Redes/ProductoRedesLayout.jsx'

function App() {
  const [count, setCount] = useState(0)
  function cambioSegunUsuario(){
    
  }
  return (
    <>
    <Router>{/* Envolvemos la aplicación */}
      <Routes>{/* Para el contenedor de rutas */}
      <Route index element={<ProductosLayout/>}/>
      <Route path='/dispositivos-moviles' element={<ProductoDispositivosMovilesLayout/>}/>
      <Route path='/computo' element={<ProductoComputoLayout/>}/>
      <Route path='/audio' element={<ProductoAudioLayout/>}/>
      <Route path='/cables' element={<ProductoCablesLayout/>}/>
      <Route path='/seguridad' element={<ProductoSeguridadLayout/>}/>
      <Route path='/casa-oficina' element={<ProductoCasaOficinaLayout/>}/>
      <Route path='/redes' element={<ProductoRedesLayout/>}/>
      <Route path='/' element={ <LayoutPadre/>}>{/* Envuelvo las rutas en un LayoutPadre el cual lleva el MenuHeader */}
      
        <Route path='/crearCuenta' element={<LayoutCrearCuenta/>}/>{/* Definimos la ruta */}
        <Route path="/login" element={<LoginLayout/>}/> {/* acceso a la ruta de Login */}
              
        <Route path = '/Login' element = {<LoginLayout/>}></Route>      
        <Route path='/app' element={<LayoutMenuHamburguesa/>}>{/* Envuelvo con el MenuHamburguesa */}
        
        <Route path={'/app/productos/producto/:id'} element={<DetallesLayout/>}/> 
        <Route path={'/app/productos/producto/dispositivos-moviles/:id'} element={<DetallesLayout/>}/> 
        <Route path={'/app/productos/producto/computo/:id'} element={<DetallesLayout/>}/> 
        <Route path={'/app/productos/producto/audio/:id'} element={<DetallesLayout/>}/> 
        <Route path={'/app/productos/producto/cables/:id'} element={<DetallesLayout/>}/> 
        <Route path={'/app/productos/producto/seguridad/:id'} element={<DetallesLayout/>}/> 
        <Route path={'/app/productos/producto/casa-oficina/:id'} element={<DetallesLayout/>}/> 
        <Route path={'/app/productos/producto/redes/:id'} element={<DetallesLayout/>}/> 
        <Route path={'/app/carretilla'} element={<LayoutCarritoCompra/>}/> 
        {/* <Route path="/app/productos/producto/1" element={<DetallesLayout/>}/> Ruta de detalle de producto EL 1 ES TEMPORAL */}
        
        <Route path="*" element={ <div>Pagina no encontrada - 404</div> }/>       


        </Route>

      </Route>
      <Route path = '/app/admin' element = {<AdminPanel/>}></Route> 
      </Routes>
      
    </Router>
    {/* <HamburguerMenu/>
    <Header/>
    <DetallesLayout/> */}
    {/* <FormLogin/> */}


    {/* <div className='contentButton'>
          <ButtonContactUser src = {viteLogo} alt = "user"  />  
          <ButtonContactUser src = {viteLogo} alt = "user"/>
     </div> */}
    </>
  )
}

export default App