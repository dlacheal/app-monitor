import { Persona } from "../personas/persona";
import { Puesto } from "../puestos/puesto";

export class Empleado {
    id: number;
    //foto: string;
    //rutaFoto: string
    licencia: string;
    tipoSangre: string;
    codigoPuesto: Puesto;
    codigoPersona: Persona;
}
