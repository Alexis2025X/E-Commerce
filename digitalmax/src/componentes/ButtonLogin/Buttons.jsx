export function Buttons({Click, name, text}){
    return(
        <>
        <button onClick={Click} className={name}>{text}</button>
        </>
    )
}
