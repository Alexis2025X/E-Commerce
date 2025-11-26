import '../LoginLayout/LoginLayout.css'
import digitalMax from '../../assets/img/Logo_digitalmax.png' 
import { InputForm } from '../../componentes/InputForm/InputForm';
import { SocialLoginButton } from '../../componentes/SocialLoginButton/SocialLoginButton';
import icon_Facebook from '../../assets/img/icon_Facebook.png'
import icon_Google from '../../assets/img/icon_Google.png'
import { Buttons } from '../../componentes/ButtonLogin/Buttons';

import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { obtenertoken } from '../../API/UserAPI';

import { userStats } from '../../API/ProductosAPI';


function LoginLayout(){

    const navigateReguistre = useNavigate();
        const handleAccessRegistroLogin = () =>{
            navigateReguistre('/')
        }
         
        const[dataLogin, setDataLogin] = useState({
            correo: '',
            contraseña: ''
        })

        
        const handleChangeLogin = (event) => {
            setDataLogin({...dataLogin, [event.target.name] : event.target.value});
          
        }
        const submitLogin = async () =>{
            try {
            const obtenCookie = await obtenertoken(dataLogin)

            if(obtenCookie.status == 201){
                navigateReguistre('/')
            }else{
                 alert("Usuario y/o contraseña incorrectos")
            }

            } catch (error) {
                alert("Contraeña y/o usuario incorrectos")
                console.error('Contraeña y/o usuario incorrectos', error)
            }
        }
        

    return (
        <div className='contenedorPadreLogin'>
            <div className='LoginContent'>
             <h2>Bienvenido a DigitalMax</h2>
             <div className='contentInputLogin'>
                <InputForm data={'correo'} event={handleChangeLogin} type='text' place={'Correo electronico'} label={"Correo"} name = {'Correo'} />  
                <InputForm data={'contraseña'} event={handleChangeLogin} type='password' place={'Contraseña'} label={"Contraseña"} name = {'contraseña'} />  
            </div>
            <a>¿Olvidaste tu contraseña?</a>
            <div className='contentSocialLogin'>
            <SocialLoginButton icon = {icon_Facebook} alt={"FaceBook"} colorClass={"blue"} socialName={"Facebook"}/>
            <SocialLoginButton icon = {icon_Google} alt={"Google"} colorClass={"white"} socialName={"Google"}/>
           
            </div>
            <div className='contentAcciont'>
                <a onClick={handleAccessRegistroLogin}  className='LoginCreate_Clase'>¿No tienes una cuenta? Regístrate</a>
                <Buttons Click = {submitLogin} name = "registrarse buttons" text='Acceder'/>
            </div>
        </div>
        
               
    </div>
    )
}

export default LoginLayout;