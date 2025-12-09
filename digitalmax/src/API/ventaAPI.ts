const API = 'http://localhost:3000'

interface datasventa {
idUser: string,
nombre: string,
correo: string,
telefono: string,
dataventa: [],
dataPago: [],
totalVenta: number,
}

export const crearventa = async (datos: datasventa) =>
  fetch(`${API}/ventas`, {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
      "Content-Type": "application/json",
    },
  });

  
