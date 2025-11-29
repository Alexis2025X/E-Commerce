import { Inputs } from "../InputsLogin/Inputs"

import '../InputForm/InputForm.css'

export function InputForm({ label, place, name, type, event, data }) {
    return (
        <div className="inputForm">
            <h3>{label}</h3>
            <Inputs data={data} cambioEvent={event} type={type} name={name} placeholder={place} required={true} />
        </div>
    );

}