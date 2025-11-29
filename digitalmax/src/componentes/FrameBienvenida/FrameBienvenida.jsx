import './FrameBienvenida.css'

function FrameBienvenida({title, subtitle, subtitle2}){
    return(
        <div className="contentFrameBienvenida">
            <h3>{subtitle} <br/> {subtitle2}</h3>
            <h2>{title}</h2>
        </div>
    )
}

export default FrameBienvenida;