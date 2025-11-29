import '../ZoomImage/ZoomImage.css';

function ZoomImage({img, cambio}){
    return(
        <div className= "imagenZoom"  onClick={cambio} >
            <img src= {img} alt="Imagen de producto" />
        </div>
    )
}

export default ZoomImage;