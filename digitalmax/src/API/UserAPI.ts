
const API = 'http://DROPLET_IP:3000'

interface datasUser{
        nombre: string;
        telefono: string;
        correo: string;
        contraseña:string;
        
}


export const crearUser = async (datos: datasUser) => 
    fetch(`${API}/user`, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers:{
            'Content-Type': 'application/json'
        }
    })

    interface datosLoginUser{
        correo: string;
        contraseña:string;
    }
    export const obtenertoken = async (datos: datosLoginUser) => 
    fetch(`${API}/user/login`,{
        method: 'POST',
        credentials: "include",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos),
        
    })

export const obtenerTokenUserLogin = async () =>{
   return fetch(`${API}/user/login/token`, {
     method: 'GET',
     credentials: 'include'
     });
   

}

export const obtenerUsers = async (datos: datosLoginUser) => 
    fetch(`${API}/user/${datos.correo}`, {
        method: 'GET'
})


export const obtenerUserID = async (id:string) => 
    fetch(`${API}/user/${id}`, {
        method: 'GET',
    })

    interface dataCarrito{
        idProducto: string,
        cantSelect: number
    }

    

export const agregarItemCarrito = async (idUser: string, dataProduct:dataCarrito) =>{
    fetch(`${API}/user/${idUser}/carrito/`,{
        method: 'POST',
        body: JSON.stringify(dataProduct),
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
export function obtenerItemCarrito(iduser:string){
    return `${API}/user/${iduser}/carrito`
}

interface dataActualizarCant{
    idProducto: string,
    cantSelect:number
}
export const modCantCarrito = async (idUser:string, idItem:string,dataCarrito:dataActualizarCant)=> {
   fetch(`${API}/user/${idUser}/carrito/${idItem}`, {
    method: "PUT",
    body: JSON.stringify(dataCarrito),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const eliminarItemCarritoUser = async (idUser:string, idItem:string)=> {
    fetch(`${API}/user/${idUser}/carrito/${idItem}`, {
        method: 'DELETE'
})}