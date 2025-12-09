
import './ButtonCantProduct.css'
import { useState } from 'react';
import { modCantCarrito } from '../../API/UserAPI';

function ButtonDetallesProduct(prop){
    const [countProduct, setCountProduct] = useState(prop.CantInicial == "" || prop.CantInicial == undefined ? 1 : prop.CantInicial );
   
   async function conteo (signo){
       const user = prop.User

        if(signo === "+"){
            if(countProduct < prop.stock){
            setCountProduct(countProduct + 1)
            try {
            let cantidadactual = countProduct + 1 
            let dataProductActual = {
                idProducto: prop.productoCar,
                cantSelect:cantidadactual
            }

                if(prop.productoDetalle == true){
                    const respuestaActualizacion = await modCantCarrito(user,prop.idProducto,dataProductActual)
                }
            } catch (error) {
                console.error(error)
            }
            
            
            }
        }else{
            if(countProduct <= 1){
                return
            }
            setCountProduct(countProduct - 1)
            try {
              let cantidadactual = countProduct - 1 
            let dataProductActual = {
                idProducto: prop.productoCar,
                cantSelect:cantidadactual
            }
            const respuestaActualizacion = await modCantCarrito(user,prop.idProducto,dataProductActual)
            } catch (error) {
                console.error(error)                
            }
        }
       

        if(prop.Event != null){
                prop.Event(countProduct,signo)
        }
    }

    return(
        <div className= {`contentButtonDetalles ${prop.carritoBtnCant}`}>
                <span onClick={() => {conteo("-")}}>-</span>
                <div id='productoCantidadSelect'>{countProduct}</div>
                <span onClick={() => {conteo("+")}}>+</span>
        </div>
    );
}

export default ButtonDetallesProduct;