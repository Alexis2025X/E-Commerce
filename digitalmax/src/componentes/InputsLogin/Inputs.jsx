export function Inputs({type, name, placeholder, required, data,cambioEvent, texto}) {
    return(
        <>
            {/* <h3>{text}</h3> */}
            <input value={texto} type = {type} onChange={cambioEvent} name= {data} className={name} placeholder={placeholder} required={required} />
        </>
    )
}