import './ButtonActionProduc.css'

function ButtonActionProduc({status, text, Click,nameItem}){
    const estado = status
    return(
        <div id = {nameItem} onClick={Click} className= {  `contentButtonDetalles ${estado}`} >
            <p>{text}</p>
        </div>
    );
}

export default ButtonActionProduc