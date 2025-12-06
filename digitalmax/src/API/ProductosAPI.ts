const API = "http://localhost:3000";
import { useState } from "react";
interface datasProduct {
  nombre: string;
  categoria: string;
  marca: string;
  imagenUrl: string;
  imagenUr1: string;

  precio: number;
  descuento: number;
  stock: number;
  descripcion: string;
  especificaciones: string;
  detallesFisicos: string;
  paisOrigen: string;
  valoracion: number;
}

export const crearProduct = async (datos: datasProduct) =>
  fetch(`${API}/productos`, {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const modificarProduct = async (id: string, datos: datasProduct) => {
  try {
    const response = await fetch(`${API}/productos/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return true;
    }
    return await response.json();
  } catch (error) {
    return false; // Retorna false en caso de error
  }
}


// export const eliminarProducto = async (id: string) =>
//   fetch(`${API}/productos/${id}`, {
//     method: "DELETE",
//   }).then((response) => {
//     return response.json()});


export const eliminarProducto = async (id: string) => {
  try {
    const response = await fetch(`${API}/productos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    // Parseamos la respuesta como JSON
    // Algunas APIs retornan contenido, otras no
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return true;
    }
    return await response.json();
  } catch (error) {
    return false; // Retorna false en caso de error
  }
};

export const obtenerProductos = () =>
  fetch(`${API}/productos`, {
    method: "GET"
  }).then((response) => { if (response != undefined) return response.json() });


export const obtenerProducto = async (id: string) =>
  fetch(`${API}/productos/${id}`, {
    method: "GET"
  }).then((response) => {
    return response.json()
  });


export const userStats = "/app/admin"






interface dataReseñaNew {
  userReseña: string,
  userNameReseña: string,
  titulo: string,
  descripcion: string,
  valoracion: number
}
export const PostResena = async (idProduct: string, dataresena: dataReseñaNew) => {
  fetch(`${API}/productos/${idProduct}/resena/`, {
    method: "POST",
    body: JSON.stringify(dataresena),
    headers: {
      "Content-Type": "application/json",
    },
  });
}


