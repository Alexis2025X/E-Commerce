import '../CardCategoria/CardCategorias.css';

function CardCategoria(prop){
    return(
        <>
        
            <div onClick={prop.link} className="CardCatConteiner">
                <img src= {prop.src} alt= {prop.alt}/>
                <h3>{prop.alt}</h3>
            </div>
        
        </>
    );
}

export default CardCategoria;