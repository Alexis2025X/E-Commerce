import './ButtonEditar.css'
import iconedit from '../../assets/img/editarIcon.png'
function ButtonEditar({textEdit, event}){
    return(
        <div className="botonEdit" onClick={event}>
            <img src= {iconedit}/>
            <p>{textEdit}</p>
        </div>
    )
}

export default ButtonEditar