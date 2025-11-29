export function Inputs({type, name, placeholder, required, data,cambioEvent}) {
    return(
        <>
            {/* <h3>{text}</h3> */}
            <input type = {type} onChange={cambioEvent} name= {data} className={name} placeholder={placeholder} required={required} />
        </>
    )
}