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

function App() {
  const [count, setCount] = useState(0)
  function cambioSegunUsuario(){
    
  }
  return (
    <>
    <Router>{/* Envolvemos la aplicación */}
      <Routes>{/* Para el contenedor de rutas */}
      
      <Route path='/' element={ <LayoutPadre/>}>{/* Envuelvo las rutas en un LayoutPadre el cual lleva el MenuHeader */}
      <Route index element={<ProductosLayout/>}/>
        <Route path='/crearCuenta' element={<LayoutCrearCuenta/>}/>{/* Definimos la ruta */}

              
        <Route path = '/Login' element = {<LoginLayout/>}></Route>      
        <Route path='/app' element={<LayoutMenuHamburguesa/>}>{/* Envuelvo con el MenuHamburguesa */}
        
        <Route path={'/app/productos/producto/:id'} element={<DetallesLayout/>}/> 
        <Route path={'/app/carretilla'} element={<LayoutCarritoCompra/>}/> 
        {/* <Route path="/app/productos/producto/1" element={<DetallesLayout/>}/> Ruta de detalle de producto EL 1 ES TEMPORAL */}
        <Route path="/app/login" element={<LoginLayout/>}/> {/* acceso a la ruta de Login */}
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