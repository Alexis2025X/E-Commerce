import '../CardProduct/CardProduct.css'
import '../CardProduct/CardProduct.css'

function CardProduct(prop){
    return(
        
        <div onClick={prop.click} className='cardProduct'>
            <img src= {prop.src} alt= {prop.alt}/>
            <h2>{prop.description}</h2>
            <span>USD {prop.precio}</span>
        </div>
    );
}

export default CardProduct;