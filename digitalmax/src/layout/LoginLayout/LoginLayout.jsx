import '../LoginLayout/LoginLayout.css'
import { InputForm } from '../../componentes/InputForm/InputForm';
import { SocialLoginButton } from '../../componentes/SocialLoginButton/SocialLoginButton';
import icon_Facebook from '../../assets/img/icon_Facebook.png'
import icon_Google from '../../assets/img/icon_Google.png'
import { Buttons } from '../../componentes/ButtonLogin/Buttons';

import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { crearUser, obtenerUsers } from '../../API/UserAPI';

import { userStats } from '../../API/ProductosAPI';

import Swal from 'sweetalert2';


function LoginLayout() {
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    const navigateReguistre = useNavigate();
    const handleAccessRegistroLogin = () => {
        navigateReguistre('/CrearCuenta')
    }

    const [dataLogin, setDataLogin] = useState({
        correo: '',
        contraseña: ''
    })


    const handleChangeLogin = (event) => {
        setDataLogin({ ...dataLogin, [event.target.name]: event.target.value });

    }
    const submitLogin = async () => {
        try {
            const res = await obtenerUsers(dataLogin).then(res => res.json()).then((data) => {
                if (data.contraseña == dataLogin.contraseña) {
                    //alert("BIENVENIDO A DIGITALMAX")
                    Swal.fire({
                        title: "Inicio de sesión exitoso",
                        text: "¡BIENVENIDO A DIGITALMAX!",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Aceptar"
                    });
                    localStorage.setItem('user', data._id)
                    if (data.status != "inactive") {
                        navigateReguistre(userStats)
                    } else {
                        navigateReguistre('/')
                    }

                } else {
                    //alert("Contraeña y/o usuario incorrectos, acceso denegado")
                    Swal.fire({
                        title: "Acceso denegado",
                        text: "Contraeña y/o usuario incorrectos",
                        icon: "error",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Aceptar"
                    });

                }

            })




        } catch (error) {
            //alert("Contraeña y/o usuario incorrectos")

            //console.error('Contraeña y/o usuario incorrectos', error)
            Swal.fire({
                title: "Acceso denegado",
                text: "Ocurrio un error: " + error,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            });
        }
    }


    return (
        <div className='contenedorPadreLogin'>
            <div className='LoginContent'>
                <h2>Bienvenido a DigitalMax</h2>
                <div className='contentInputLogin'>
                    <InputForm data={'correo'} event={handleChangeLogin} type='text' place={'Correo electronico'} label={"Correo"} name={'Correo'} />
                    <InputForm data={'contraseña'} event={handleChangeLogin} type='password' place={'Contraseña'} label={"Contraseña"} name={'contraseña'} />
                </div>
                <a>¿Olvidaste tu contraseña?</a>
                <div className='contentSocialLogin'>
                    <SocialLoginButton icon={icon_Facebook} alt={"FaceBook"} colorClass={"blue"} socialName={"Facebook"} />
                    <SocialLoginButton icon={icon_Google} alt={"Google"} colorClass={"white"} socialName={"Google"} />

                </div>
                <div className='contentAcciont'>
                    <a onClick={handleAccessRegistroLogin} className='LoginCreate_Clase'>¿No tienes una cuenta? Regístrate</a>
                    <Buttons Click={submitLogin} name="registrarse buttons" text='Acceder' />
                </div>
            </div>


        </div>
    )
}

export default LoginLayout;