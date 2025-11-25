import './LayoutCrearCuenta.css'
import { Inputs } from '../../componentes/InputsLogin/Inputs'
import { Buttons } from '../../componentes/ButtonLogin/Buttons'
import { useNavigate } from 'react-router-dom'
import { SocialLoginButton } from '../../componentes/SocialLoginButton/SocialLoginButton'
import icon_Facebook from '../../assets/img/icon_Facebook.png'
import icon_Google from '../../assets/img/icon_Google.png'
import { useState } from 'react'
import { ChangeEvent } from 'react'
import { crearUser } from '../../API/UserAPI'
import Swal from 'sweetalert2';



function FormCrearCuenta() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/app/productos')
    }
    const [dataRegistro, setData] = useState({
        nombre: '',
        telefono: '',
        correo: '',
        password: '',
        passwordConfir: ''
    })
    const dataEnvio = {
        nombre: dataRegistro.nombre,
        telefono: dataRegistro.telefono,
        correo: dataRegistro.correo,
        contraseña: dataRegistro.password,
    }

    const handleChaneRegistro = (event) => {

        setData({ ...dataRegistro, [event.target.name]: event.target.value });


    }
    const validarContraseñas = () => {
        if (dataRegistro.password !== dataRegistro.passwordConfir) {
            //alert("Las contraseñas no coinciden");
            Swal.fire({
                title: "Las contraseñas no coinciden",
                text: "Por favor, verifique e intente nuevamente",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            });
            return false;
        }
        return true;
    }
    const handleSubmitRegistro = async (event) => {
        if (validarContraseñas()) {
            event.preventDefault();
            try {
                const res = await crearUser(dataEnvio);
                const data = res.json();
                if (res.status === 201) {
                    //alert("Usuario creado con éxito");
                    Swal.fire({
                        title: "Usuario creado con éxito",
                        text: "Su cuenta ha sido creada correctamente",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Aceptar"
                    });
                    navigate('/app/productos');
                }
            } catch (error) {
                console.error('Usuario no creado', error)
                //alert("Error al crear su usuario intentelo nuevamente")
                Swal.fire({
                    title: "Error al crear su usuario",
                    text: "Intentelo nuevamente",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Aceptar"
                });
            }


        }
    }
    return (
        <>
            <section className='CrearCuenta'>
                <h2 className="textSubTitle texth2">Bienvenido a DigitalMax</h2>
                <div className='inputAndText'>
                    <h3 className="textName texth3">Nombre</h3>
                    <Inputs cambioEvent={handleChaneRegistro} type="text" data={'nombre'} name="input_name input" placeholder="Nombre" required={true} />
                    <h3 className="textTelefono texth3">Teléfono</h3>
                    <Inputs cambioEvent={handleChaneRegistro} type="text" data={'telefono'} name="input_telefono input" placeholder="Teléfono" required={true} />
                    <h3 className="textEmail texth3">Correo</h3>
                    <Inputs cambioEvent={handleChaneRegistro} type="text" data={'correo'} name="input_correo input" placeholder="Correo eletrónico" required={true} />
                    <h3 className="textPassword texth3">Contraseña</h3>
                    <Inputs cambioEvent={handleChaneRegistro} type="password" data={'password'} name="input_password input" placeholder="Contraseña" required={true} />
                    <h3 className="textPasswordConfir texth3">Confirmación de contraseña</h3>
                    <Inputs cambioEvent={handleChaneRegistro} type="password" data={'passwordConfir'} name="input_password_confir input" placeholder="Confirme su contraseña" required={true} />
                </div>
                <aside>
                    <SocialLoginButton icon={icon_Facebook} alt={"FaceBook"} colorClass={"blue"} socialName={"Facebook"} />
                    <SocialLoginButton icon={icon_Google} alt={"Google"} colorClass={"white"} socialName={"Google"} />
                </aside>
                <a href="/Login" className='linkAcceder'>¿Ya tienes una cuenta? Inicia Sesión?</a>
                <aside>
                    <Buttons Click={handleSubmitRegistro} name="registrarse buttons" text='Registrarse' />
                    {/* <Buttons click={handleLogin} name = "acceder buttons" text='Acceder'/> */}
                </aside>
            </section>
        </>
    )
}
export default FormCrearCuenta