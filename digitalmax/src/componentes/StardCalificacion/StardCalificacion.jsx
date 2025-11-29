import { use } from "react";
import IconoStard from "../../assets/img/Icon Stard";
import '../StardCalificacion/StardCalificacion.css'
//import { useEffect } from "react";
function StardCalificacion(props) {

    const activo = "#0066ff"
    const inactivo = "#1d1d1d"


    return (
        <div className="StardContentView">
            <ul id='contentStard'>
                <li><IconoStard tamaño={props.tamaño} color={activo} /></li>
                <li><IconoStard tamaño={props.tamaño} color={activo} /></li>
                <li><IconoStard tamaño={props.tamaño} color={activo} /></li>
                <li><IconoStard tamaño={props.tamaño} color={activo} /></li>
                <li><IconoStard tamaño={props.tamaño} color={inactivo} /></li>
            </ul>
        </div>

    );
}

export default StardCalificacion;