import AdminMenu from "../../componentes/AdminMenu/AdminMenu"
import './AdminPanel.css'
import logo_digitalmax  from '../../img/logo_transparente.png'
import FrameBienvenida from "../../componentes/FrameBienvenida/FrameBienvenida"
import FrameAgregarProducto from "../../componentes/FrameAgregarProducto/FrameAgregarProducto"
import FrameGestionarCategoriaProduc from "../../componentes/FrameGestionarCategoriaProduc/FrameGestionarCategoriaProduc"
import productosLogo from '../../assets/img/productosAdminIcon.png'
import pedidosLogo from '../../assets/img/pedidosAdminIcon.png'
import clientesLogo from '../../assets/img/clientesAdminIcon.png'
import HeaderAdmin from '../../componentes/HeaderAdmin/HeaderAdmin'
import FrameGestionarProducto from "../../componentes/FrameGestionarProducto/FrameGestionarProducto"

import { useState } from "react"
function AdminPanel(){

     const [menuProducto, setMenu] = useState (false)
  const cambioMenu = () =>{
    setMenu(!menuProducto)
  }
  function handleClickMenuProductos(){
        cambioMenu()
     
    }


    const [Frame, SetFrame] = useState (<FrameBienvenida subtitle={"Bienvenid@ "} subtitle2={"a la Administracion de"} title={"DigitalMax"}/>)
    
    function handleCambioFrame(event){
         const seleccion = event.target.innerHTML
         switch (seleccion){
            case  "Agregar Producto":
               
                SetFrame( <FrameAgregarProducto/>)
            break
            case  "Gestionar Producto":
               
                SetFrame( <FrameGestionarCategoriaProduc/>)
                //SetFrame( <FrameGestionarProducto/>)
            break
            
            
            default:
                SetFrame( <FrameBienvenida subtitle={"Bienvenid@ "} subtitle2={"a la Administracion de"} title={"DigitalMax"}/>)
                
         }
         setMenu()
        
    }
    
    return(
        <>
    <HeaderAdmin/>
    <div className="contentPanel">
        <div className="adminMenuPanel">
            <AdminMenu text = {"Productos >"} icon = {productosLogo} event={handleClickMenuProductos}/>
            <AdminMenu text = {"Pedidos"} icon = {pedidosLogo} />
            <AdminMenu text = {"clientes >"} icon = {clientesLogo} />
        </div>
        <div className="adminContentPanel">
            <img src= {logo_digitalmax} className="logoPanelContent" alt="" />
            <div className="Content_view_panel">
                {Frame}
            </div>
        </div>
        <div className= {`menuDespliegueProductos ${menuProducto ? "" : "noDisplegado"}`} >
            <ul>
                <li onClick={handleCambioFrame} name="AgrearProducto">Agregar Producto</li>
                <li onClick={handleCambioFrame}>Gestionar Producto</li>
            </ul>
        </div>
    </div>
    
        </>
        
       
    )    

}
export default AdminPanel