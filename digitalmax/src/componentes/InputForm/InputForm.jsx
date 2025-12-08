import { Inputs } from "../InputsLogin/Inputs"

import '../InputForm/InputForm.css'

export function InputForm({ label, place, name, type, event, data, texto }) {
    return (
        <div className="inputForm">
            <h3>{label}</h3>
            <Inputs texto={texto} data={data} cambioEvent={event} type={type} name={name} placeholder={place} required={true} />
        </div>
    );

}