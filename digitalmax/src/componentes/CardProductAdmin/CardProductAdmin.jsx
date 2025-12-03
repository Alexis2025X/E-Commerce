import '../CardProductAdmin/CardProductAdmin.css'
import '../CardProductAdmin/CardProductAdmin.css'

function CardProductAdmin(prop){

    return(
        
        //<div onClick={prop.click} className='AdminProductCard'>
        <div className='AdminProductCard'>
            <img src= {prop.src} alt= {prop.alt}/>
            <h2>{prop.description}</h2>
            <span>USD {prop.precio}</span>
            <div className='Buttons'>
            <button className='ModificarButton'>Modificar</button>
            {/* <button className='EliminarButton' onClick={prop.click}>Eliminar</button>                 */}
            <button className='EliminarButton' onClick={prop.click}>Eliminar</button>                
            </div>
        </div>
    );
}

export default CardProductAdmin;