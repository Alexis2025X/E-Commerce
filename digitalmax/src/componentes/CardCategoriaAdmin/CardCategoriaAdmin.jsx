import '../CardCategoriaAdmin/CardCategoriaAdmin.css';

function CardCategoriaAdmin(prop){
    return(
        <>
        
            <div onClick={prop.link} className="CardCatConteinerAdmin">
                <img src= {prop.src} alt= {prop.alt}/>
                <h3>{prop.alt}</h3>
            </div>
        
        </>
    );
}

export default CardCategoriaAdmin;