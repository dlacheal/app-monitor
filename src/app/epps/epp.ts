import { Categoria } from "../categorias/categoria";

export class Epp {
    id: number;
    nombre: string;
    stockActual: string;
    talla: string;
    precio: number;
    //imagen: string;
    //rutaImagen: string;
    codigoCategoria: Categoria;
}