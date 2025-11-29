import { use } from "react";
import IconoStard from "../../assets/img/Icon Stard";
import '../StardCalificacion/StardCalificacion.css'
import { useState, useEffect, useRef } from "react";
function StardCalificacion(props){
 const llamadoInicial = useRef(0);
    
    const activo = "#0066ff"
    const inactivo = "#1d1d1d"
    const calificacion = props.count;
    llamadoInicial.current = props.count != undefined ? props.count : 0;

    let calvalue = [
        {
            strat: inactivo
        },
        {
            strat: inactivo
        },
        {
            strat: inactivo
        },
        {
            strat: inactivo
        },
        {
            strat: inactivo
        },
    ]
    for (let index = 0; index < llamadoInicial.current; index++) {
       calvalue[index].strat = activo
    }

    return(
        <div className="StardContentView">        
        <ul id='contentStard' className={props.puntero != undefined? "punteroTrue": ""}>
               <li><IconoStard ident = {1} event = {props.event} tamaño = {props.tamaño} color = {calvalue[0].strat}   /></li>
               <li><IconoStard ident = {2} event = {props.event} tamaño = {props.tamaño} color = {calvalue[1].strat}   /></li>
               <li><IconoStard ident = {3} event = {props.event} tamaño = {props.tamaño} color = {calvalue[2].strat}   /></li>
               <li><IconoStard ident = {4} event = {props.event} tamaño = {props.tamaño} color = {calvalue[3].strat}   /></li>
               <li><IconoStard ident = {5} event = {props.event} tamaño = {props.tamaño} color = {calvalue[4].strat} /></li>
            </ul> 
        </div>

    );
}

export default StardCalificacion;